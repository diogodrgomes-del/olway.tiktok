import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import type { VideoRef } from "../data/videos";

/** Card simples: "Vídeo N" com link direto para o TikTok. */
export function VideoCard({ video }: { video: VideoRef }) {
  const label = `Vídeo ${video.number}`;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.97 }}
        className="card group flex h-full flex-col p-4 transition-colors hover:border-bone/40 sm:p-5"
      >
        <span className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-bone text-ink shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
          </span>
          <ArrowUpRight className="h-4 w-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" aria-hidden />
        </span>
        <span className="mt-6 font-display text-2xl font-bold uppercase leading-none sm:text-3xl">{label}</span>
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-mute">{video.category}</span>
        <span className="mt-5 inline-flex min-h-[40px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-bone/20 px-2 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-bone transition-colors group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
          Assistir<span className="hidden min-[420px]:inline"> no TikTok</span>
        </span>
        <span className="sr-only">({label}, abre o TikTok em nova aba)</span>
      </motion.a>
    </motion.li>
  );
}
