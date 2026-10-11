/**
 * BIBLIOTECA DE REFERÊNCIAS — VÍDEOS ENEDINO
 * Cada vídeo abre no TikTok (nova aba). Para trocar um link, edite `url`.
 */

export type VideoCategory = "Regata Golden" | "Compressão" | "Demonstração" | "Conteúdo TikTok";

export interface VideoRef {
  id: string;
  number: number;
  category: VideoCategory;
  url: string;
}

export const videoCategories: VideoCategory[] = ["Regata Golden", "Compressão", "Demonstração", "Conteúdo TikTok"];

export const videos: VideoRef[] = [
  { id: "ref-01", number: 1, category: "Regata Golden", url: "https://www.tt.site/t/ZSbpV4MJv/" },
  { id: "ref-02", number: 2, category: "Compressão", url: "https://www.tt.site/t/ZSbpVHTme/" },
  { id: "ref-03", number: 3, category: "Compressão", url: "https://www.tt.site/t/ZSbpVXKY9/" },
  { id: "ref-04", number: 4, category: "Demonstração", url: "https://www.tt.site/t/ZSbpVeufy/" },
  { id: "ref-05", number: 5, category: "Demonstração", url: "https://www.tt.site/t/ZSbpVdeKk/" },
  { id: "ref-06", number: 6, category: "Demonstração", url: "https://www.tt.site/t/ZSbp4E6D8/" },
  { id: "ref-07", number: 7, category: "Demonstração", url: "https://www.tt.site/t/ZSbpVNPFd/" },
  { id: "ref-08", number: 8, category: "Demonstração", url: "https://www.tt.site/t/ZSbp43BRx/" },
  { id: "ref-09", number: 9, category: "Demonstração", url: "https://www.tt.site/t/ZSbp4phKG/" },
  { id: "ref-10", number: 10, category: "Conteúdo TikTok", url: "https://vt.tiktok.com/ZSbgxdKKx/" },
  { id: "ref-11", number: 11, category: "Conteúdo TikTok", url: "https://vt.tiktok.com/ZSbgx8gVo/" },
];
