/**
 * BIBLIOTECA DE REFERÊNCIAS — VÍDEOS ENEDINO
 *
 * Como os vídeos são reproduzidos dentro do site:
 * 1. Se o item tiver `embedId` (ID numérico do vídeo), o player oficial do TikTok
 *    (tiktok.com/player/v1/<ID>) é usado diretamente.
 * 2. Senão, o navegador do visitante consulta a API oEmbed oficial do TikTok com
 *    `canonicalUrl` (ou o link curto) para obter o ID e a miniatura real.
 * 3. Se nada disso funcionar, o card mostra "Pré-visualização indisponível" e o
 *    link para abrir no TikTok — nenhuma miniatura é inventada.
 *
 * Para fixar IDs e URLs completas, rode `npm run resolve:videos` (gera
 * src/data/videos.resolved.json) ou preencha `canonicalUrl` / `embedId` à mão.
 */
import resolved from "./videos.resolved.json";

export type VideoCategory = "Regata Golden" | "Compressão" | "Demonstração" | "Conteúdo TikTok";

export interface VideoRef {
  id: string;
  number: number;
  title: string;
  category: VideoCategory;
  /** Link original (pode ser encurtado). */
  url: string;
  /** URL completa: https://www.tiktok.com/@perfil/video/<ID> */
  canonicalUrl?: string;
  /** ID numérico do vídeo no TikTok. */
  embedId?: string;
}

type Resolved = Record<string, { canonicalUrl?: string; embedId?: string }>;

export const videoCategories: VideoCategory[] = [
  "Regata Golden",
  "Compressão",
  "Demonstração",
  "Conteúdo TikTok",
];

const baseVideos: VideoRef[] = [
  { id: "ref-01", number: 1, title: "Regata Golden Vinho", category: "Regata Golden", url: "https://www.tt.site/t/ZSbpV4MJv/" },
  { id: "ref-02", number: 2, title: "Compressão — Referência 01", category: "Compressão", url: "https://www.tt.site/t/ZSbpVHTme/" },
  { id: "ref-03", number: 3, title: "Compressão — Referência 02", category: "Compressão", url: "https://www.tt.site/t/ZSbpVXKY9/" },
  { id: "ref-04", number: 4, title: "Demonstração — Referência 04", category: "Demonstração", url: "https://www.tt.site/t/ZSbpVeufy/" },
  { id: "ref-05", number: 5, title: "Demonstração — Referência 05", category: "Demonstração", url: "https://www.tt.site/t/ZSbpVdeKk/" },
  { id: "ref-06", number: 6, title: "Demonstração — Referência 06", category: "Demonstração", url: "https://www.tt.site/t/ZSbp4E6D8/" },
  { id: "ref-07", number: 7, title: "Demonstração — Referência 07", category: "Demonstração", url: "https://www.tt.site/t/ZSbpVNPFd/" },
  { id: "ref-08", number: 8, title: "Demonstração — Referência 08", category: "Demonstração", url: "https://www.tt.site/t/ZSbp43BRx/" },
  { id: "ref-09", number: 9, title: "Demonstração — Referência 09", category: "Demonstração", url: "https://www.tt.site/t/ZSbp4phKG/" },
  { id: "ref-10", number: 10, title: "Conteúdo TikTok — Referência 10", category: "Conteúdo TikTok", url: "https://vt.tiktok.com/ZSbgxdKKx/" },
  { id: "ref-11", number: 11, title: "Conteúdo TikTok — Referência 11", category: "Conteúdo TikTok", url: "https://vt.tiktok.com/ZSbgx8gVo/" },
];

// Valores preenchidos à mão em baseVideos têm prioridade sobre o arquivo gerado.
export const videos: VideoRef[] = baseVideos.map((v) => ({
  ...pickDefined((resolved as Resolved)[v.id]),
  ...(pickDefined(v) as VideoRef),
}));

function pickDefined<T extends object>(o: T | undefined): Partial<T> {
  if (!o) return {};
  return Object.fromEntries(Object.entries(o).filter(([, val]) => val)) as Partial<T>;
}
