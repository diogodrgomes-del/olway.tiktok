import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { videoCategories, videos, type VideoCategory, type VideoRef } from "../data/videos";
import { VideoCard, VideoCover } from "./VideoCard";
import { ease, NextSection, Reveal, SectionHeading } from "./ui";

type Filter = "Todas" | VideoCategory;

function VideoViewer({
  list,
  index,
  onClose,
  onIndex,
}: {
  list: VideoRef[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const video = list[index];
  const prev = useCallback(() => onIndex((index - 1 + list.length) % list.length), [index, list.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % list.length), [index, list.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Referência: ${video.title}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex max-h-full w-full max-w-3xl flex-col gap-5 overflow-y-auto rounded-3xl border border-bone/10 bg-coal p-4 sm:flex-row sm:p-6"
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Fechar visualizador"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 bg-ink/70"
        >
          <X className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="mx-auto aspect-[9/16] w-[min(100%,190px)] min-[400px]:w-[220px] shrink-0 overflow-hidden rounded-2xl border border-bone/10 sm:w-[280px]"
          >
            {video.embedId ? (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${video.embedId}`}
                title={video.title}
                loading="lazy"
                allow="encrypted-media; fullscreen"
                className="h-full w-full"
              />
            ) : (
              <VideoCover video={video} large />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-1 flex-col">
          <p className="font-display text-xs font-semibold tracking-[0.22em] text-gold">
            REFERÊNCIA {index + 1} DE {list.length}
          </p>
          <h3 className="mt-2 pr-12 font-display text-2xl font-bold uppercase leading-tight sm:text-3xl">{video.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            {video.embedId
              ? "Vídeo exibido pelo player oficial do TikTok."
              : "Este link é encurtado e não permite incorporação direta. Ele abre no app ou no site do TikTok, em nova aba — seu progresso aqui fica salvo."}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-bone/80">
            {["Ritmo e duração dos cortes", "Enquadramento e postura", "Naturalidade da fala", "Como o produto aparece"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
                Observe: {t.toLowerCase()}
              </li>
            ))}
          </ul>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-6 w-full"
          >
            Assistir referência
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(abre o TikTok em nova aba)</span>
          </a>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={prev} className="btn-ghost min-h-[48px] px-3">
              <ChevronLeft className="h-4 w-4" aria-hidden /> Anterior
            </button>
            <button type="button" onClick={next} className="btn-ghost min-h-[48px] px-3">
              Próxima <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VideoLibrary() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [viewer, setViewer] = useState<number | null>(null);

  const list = useMemo(() => (filter === "Todas" ? videos : videos.filter((v) => v.category === filter)), [filter]);
  const filters: Filter[] = ["Todas", ...videoCategories];
  const count = (f: Filter) => (f === "Todas" ? videos.length : videos.filter((v) => v.category === f).length);

  return (
    <section id="referencias" aria-labelledby="referencias-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-3xl rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-page relative">
        <SectionHeading id="referencias-title" index="05" label="Biblioteca de vídeos Enedino" title="ASSISTA. ANALISE. CRIE SUA VERSÃO.">
          <p>
            Essas são referências selecionadas para orientar sua produção. Observe o ritmo, os enquadramentos, a postura, a
            naturalidade e a apresentação dos produtos.
          </p>
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
                    active ? "border-gold text-ink" : "border-bone/15 text-bone/80 hover:border-bone/35"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gold"
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

        <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {list.map((v, i) => (
              <VideoCard key={v.id} video={v} onOpen={() => setViewer(i)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-14">
          <p className="mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-gold/[0.06] px-6 py-6 text-center font-display text-xl font-bold uppercase leading-tight text-bone sm:text-3xl">
            Não copie. <span className="text-gold-gradient">Entenda a estratégia</span> e adapte ao seu estilo.
          </p>
        </Reveal>

        <NextSection current="referencias" />
      </div>

      <AnimatePresence>
        {viewer !== null && list[viewer] && (
          <VideoViewer list={list} index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
