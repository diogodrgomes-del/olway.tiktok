/**
 * Integração oficial com o TikTok:
 * - API oEmbed (https://www.tiktok.com/oembed) para obter ID, título e miniatura real.
 * - Player oficial (https://www.tiktok.com/player/v1/<ID>) para reproduzir dentro da página.
 *
 * O player é um iframe, então o script embed.js do TikTok não é carregado.
 * As consultas ao oEmbed são feitas uma única vez por vídeo (cache em memória + sessionStorage).
 */
import { useEffect, useState } from "react";
import type { VideoRef } from "../data/videos";

export interface TikTokInfo {
  videoId?: string;
  thumbnail?: string;
  title?: string;
  author?: string;
}

export type TikTokState =
  | { status: "loading" }
  | { status: "ready"; info: TikTokInfo }
  | { status: "error"; reason: string };

const OEMBED = "https://www.tiktok.com/oembed?url=";
const CACHE_KEY = "olway-creator-hub:tiktok-oembed:v1";

export function extractVideoId(url?: string): string | undefined {
  if (!url) return;
  return url.match(/\/(?:video|v|embed\/v2|player\/v1)\/(\d{8,})/)?.[1];
}

export function playerUrl(videoId: string, autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    music_info: "1",
    description: "1",
    rel: "0",
    native_context_menu: "0",
    closed_caption: "1",
  });
  return `https://www.tiktok.com/player/v1/${videoId}?${params}`;
}

function readCache(): Record<string, TikTokInfo> {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
function writeCache(key: string, info: TikTokInfo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...readCache(), [key]: info }));
  } catch {
    /* armazenamento indisponível */
  }
}

const inflight = new Map<string, Promise<TikTokInfo>>();

async function fetchOEmbed(url: string): Promise<TikTokInfo> {
  const res = await fetch(OEMBED + encodeURIComponent(url));
  if (!res.ok) throw new Error(`oEmbed respondeu ${res.status}`);
  const data = (await res.json()) as {
    thumbnail_url?: string;
    title?: string;
    author_name?: string;
    html?: string;
    embed_product_id?: string;
    status_msg?: string;
  };
  const videoId =
    data.embed_product_id ??
    data.html?.match(/data-video-id="(\d+)"/)?.[1] ??
    extractVideoId(data.html?.match(/cite="([^"]+)"/)?.[1]);
  if (!videoId && !data.thumbnail_url) throw new Error(data.status_msg || "vídeo não encontrado");
  return { videoId, thumbnail: data.thumbnail_url, title: data.title, author: data.author_name };
}

export function resolveVideo(video: VideoRef): Promise<TikTokInfo> {
  const key = video.id;
  const cached = readCache()[key];
  if (cached) return Promise.resolve(cached);
  if (!inflight.has(key)) {
    const target = video.canonicalUrl ?? video.url;
    const p = fetchOEmbed(target)
      .then((info) => {
        const merged = { ...info, videoId: video.embedId ?? info.videoId ?? extractVideoId(video.canonicalUrl) };
        writeCache(key, merged);
        return merged;
      })
      .catch((err) => {
        inflight.delete(key); // permite nova tentativa
        // mesmo sem oEmbed, um ID conhecido já basta para tocar o vídeo
        const knownId = video.embedId ?? extractVideoId(video.canonicalUrl);
        if (knownId) return { videoId: knownId } as TikTokInfo;
        throw err;
      });
    inflight.set(key, p);
  }
  return inflight.get(key)!;
}

export function useTikTokVideo(video: VideoRef, enabled = true): TikTokState {
  const [state, setState] = useState<TikTokState>({ status: "loading" });

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    setState({ status: "loading" });
    resolveVideo(video).then(
      (info) => alive && setState({ status: "ready", info }),
      (err: Error) => {
        if (!alive) return;
        setState({ status: "error", reason: err.message || "falha de rede" });
        console.warn(`[TikTok] ${video.title}: precisa de correção manual →`, video.url, err);
      },
    );
    return () => {
      alive = false;
    };
  }, [video, enabled]);

  return state;
}
