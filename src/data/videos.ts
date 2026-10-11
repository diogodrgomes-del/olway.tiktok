/**
 * BIBLIOTECA DE REFERÊNCIAS — VÍDEOS ENEDINO
 *
 * Os links abaixo são encurtados (tt.site / vt.tiktok.com) e NÃO permitem
 * incorporação direta. Por isso cada referência abre no TikTok em nova aba.
 *
 * Para incorporar um vídeo pelo player oficial do TikTok, abra o link,
 * copie o ID numérico da URL final (tiktok.com/@perfil/video/<ID>) e
 * preencha o campo `embedId`. O player oficial (tiktok.com/embed/v2/<ID>)
 * passa a ser exibido automaticamente no visualizador.
 */

export type VideoCategory = "Regata Golden" | "Compressão" | "Demonstração" | "Conteúdo TikTok";

export interface VideoRef {
  id: string;
  number: number;
  title: string;
  category: VideoCategory;
  url: string;
  embedId?: string;
}

export const videoCategories: VideoCategory[] = [
  "Regata Golden",
  "Compressão",
  "Demonstração",
  "Conteúdo TikTok",
];

export const videos: VideoRef[] = [
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
