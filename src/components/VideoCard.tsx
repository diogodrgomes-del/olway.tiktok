import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import type { VideoRef } from "../data/videos";
import { OlwayPillar } from "./brand/Logo";

/** Capa gráfica tipográfica (não é thumbnail real do vídeo). */
export function VideoCover({ video, large = false }: { video: VideoRef; large?: boolean }) {
  const num = String(video.number).padStart(2, "0");
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-graphite via-coal to-ink">
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      <OlwayPillar className="absolute -bottom-6 -left-8 w-[85%] opacity-[0.07]" title="" />
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
        <span className="self-start rounded-full border border-gold/40 bg-ink/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-soft sm:text-[10px]">
          {video.category}
        </span>
        <span
          className={`font-display font-bold leading-none text-gold-gradient ${large ? "text-[8rem]" : "text-5xl sm:text-6xl"}`}
          aria-hidden
        >
          {num}
        </span>
        <span className="pr-12 text-[9px] uppercase leading-tight tracking-[0.14em] text-bone/40 sm:text-[10px]">Capa gráfica</span>
      </div>
      <span
        aria-hidden
        className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 bg-ink/50 text-bone backdrop-blur transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink sm:h-12 sm:w-12"
      >
        <Play className="ml-0.5 h-5 w-5" />
      </span>
    </div>
  );
}

export function VideoCard({ video, onOpen }: { video: VideoRef; onOpen: () => void }) {
  return (
    <motion.li
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
        aria-label={`Abrir visualizador: ${video.title}`}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-bone/10 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/50"
      >
        <VideoCover video={video} />
      </button>
      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] font-display text-sm font-semibold uppercase leading-tight sm:text-[15px]">
        {video.title}
      </h3>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-bone/[0.06] px-2 text-[10.5px] font-bold uppercase tracking-[0.04em] min-[400px]:text-[11px] sm:tracking-[0.1em] text-gold-soft transition-colors hover:bg-gold hover:text-ink sm:text-xs"
      >
        Assistir referência
        <ArrowUpRight className="hidden h-3.5 w-3.5 min-[400px]:block" aria-hidden />
        <span className="sr-only">(abre o TikTok em nova aba)</span>
      </a>
    </motion.li>
  );
}
