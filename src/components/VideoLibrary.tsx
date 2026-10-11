import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy } from "lucide-react";
import { videoCategories, videos, type VideoCategory } from "../data/videos";
import { VideoCard } from "./VideoCard";
import { NextSection, Reveal, SectionHeading } from "./ui";

type Filter = "Todas" | VideoCategory;

export function VideoLibrary() {
  const [filter, setFilter] = useState<Filter>("Todas");

  const list = useMemo(() => (filter === "Todas" ? videos : videos.filter((v) => v.category === filter)), [filter]);
  const filters: Filter[] = ["Todas", ...videoCategories];
  const count = (f: Filter) => (f === "Todas" ? videos.length : videos.filter((v) => v.category === f).length);

  return (
    <section id="referencias" aria-labelledby="referencias-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-3xl rounded-full bg-white/[0.05] blur-[120px]" />
      <div className="container-page relative">
        <SectionHeading id="referencias-title" index="06" label="Biblioteca de vídeos Enedino" title="ASSISTA. ANALISE. CRIE SUA VERSÃO.">
          <p>
            Essas são referências selecionadas para orientar sua produção. Observe o ritmo, os enquadramentos, a postura, a
            naturalidade e a apresentação dos produtos.
          </p>
          <p className="mt-3 text-bone">Toque em um vídeo para assistir no TikTok.</p>
        </SectionHeading>

        <Reveal className="mt-10">
          <div
            role="group"
            aria-label="Filtrar referências por categoria"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`relative inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    active ? "border-bone text-ink" : "border-bone/15 text-bone/80 hover:border-bone/35"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                  <span className={`relative text-xs ${active ? "text-ink/70" : "text-mute"}`}>{count(f)}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {list.length} referências exibidas
        </p>

        <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-14">
          <p className="mx-auto max-w-3xl rounded-2xl border border-bone/20 bg-bone/[0.04] px-6 py-6 text-center font-display text-xl font-bold uppercase leading-tight text-bone sm:text-3xl">
            <Copy className="mx-auto mb-3 h-6 w-6" aria-hidden />
            Fique à vontade para <span className="text-chrome-gradient">copiar</span> esses conteúdos.
          </p>
        </Reveal>

        <NextSection current="referencias" />
      </div>

    </section>
  );
}
