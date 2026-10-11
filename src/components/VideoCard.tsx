import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Loader2, Play } from "lucide-react";
import type { VideoRef } from "../data/videos";
import { useTikTokVideo, type TikTokState } from "../lib/tiktok";

/** Área 9:16 da prévia: miniatura real, carregando ou indisponível. Nunca uma capa inventada. */
export function VideoPreview({ video, state }: { video: VideoRef; state: TikTokState }) {
  const num = String(video.number).padStart(2, "0");
  const thumb = state.status === "ready" ? state.info.thumbnail : undefined;
  const playable = state.status === "ready" && !!state.info.videoId;

  return (
    <div className="relative h-full w-full overflow-hidden bg-coal">
      {state.status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-graphite to-coal">
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[11px] uppercase tracking-[0.14em] text-mute">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Carregando prévia
          </span>
        </div>
      )}

      {thumb && (
        <img
          src={thumb}
          alt={`Miniatura do vídeo: ${video.title}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      )}

      {(state.status === "error" || (state.status === "ready" && !thumb)) && (
        <div className="gloss absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-bone/15 bg-graphite/40 p-3 text-center">
          <AlertTriangle className="h-5 w-5 text-mute" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/80">Prévia indisponível</span>
          <span className="text-[10px] leading-snug text-mute">
            {playable ? "O vídeo pode ser assistido aqui." : "Este link precisa de ajuste. Abra no TikTok."}
          </span>
        </div>
      )}

      {/* camadas de leitura */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/80 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/90 to-transparent" />

      <span className="absolute left-2.5 top-2.5 rounded-full border border-bone/30 bg-ink/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-bone backdrop-blur sm:text-[10px]">
        {video.category}
      </span>
      <span className="absolute right-2.5 top-2.5 font-display text-xs font-bold text-bone/80">#{num}</span>

      {state.status === "ready" && state.info.author && (
        <span className="absolute bottom-3 left-3 right-14 truncate text-[11px] font-medium text-bone/85">@{state.info.author}</span>
      )}

      {playable && (
        <span
          aria-hidden
          className="absolute bottom-2.5 right-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bone text-ink shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-transform group-hover:scale-110 sm:h-11 sm:w-11"
        >
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      )}
    </div>
  );
}

export function VideoCard({ video, onOpen }: { video: VideoRef; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // só consulta o TikTok quando o card se aproxima da tela
  const inView = useInView(ref, { once: true, margin: "300px 0px" });
  const state = useTikTokVideo(video, inView);

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Assistir aqui: ${video.title}`}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-bone/10 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-bone/50 hover:shadow-[0_20px_50px_-20px_rgba(255,255,255,0.25)]"
      >
        <VideoPreview video={video} state={state} />
      </button>
      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] font-display text-sm font-semibold uppercase leading-tight sm:text-[15px]">
        {video.title}
      </h3>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-bone px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink transition-transform active:scale-95 sm:text-xs"
      >
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
        Assistir aqui
      </button>
      <a
        href={video.canonicalUrl ?? video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex min-h-[36px] items-center justify-center gap-1 text-[11px] font-medium text-mute transition-colors hover:text-bone"
      >
        Abrir no TikTok
        <ArrowUpRight className="h-3 w-3" aria-hidden />
        <span className="sr-only">(nova aba)</span>
      </a>
    </motion.li>
  );
}
