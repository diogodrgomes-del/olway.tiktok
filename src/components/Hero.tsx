import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import { useRef } from "react";
import { hero } from "../data/content";
import { OlwayPillar, OlwayWordmark } from "./brand/Logo";
import { ease, scrollToId } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[calc(var(--header-h)+24px)] lg:items-center lg:pb-20"
    >
      {/* Fundo: luz dourada + grão */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div className="absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-gold/20 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold-deep/20 blur-[120px]" />
      </motion.div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      {/* Foto — fundo no mobile, coluna à direita no desktop */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 -z-10 lg:left-auto lg:right-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:top-[calc(var(--header-h)+40px)] lg:bottom-auto lg:h-[min(640px,76vh)] lg:w-[min(460px,36vw)]"
      >
        <div className="relative h-full w-full overflow-hidden lg:rounded-t-[999px] lg:rounded-b-3xl lg:border lg:border-gold/30">
          <picture>
            <source srcSet="/brand/creator-hero.webp" type="image/webp" />
            <img
              src="/brand/creator-hero.jpg"
              alt={hero.imageAlt}
              width={480}
              height={587}
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </picture>
          {/* overlay para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30 lg:from-ink/70 lg:via-transparent lg:to-transparent" />
        </div>
        {/* pilar gigante atrás da foto (desktop) */}
        <div aria-hidden className="absolute -bottom-10 -left-24 hidden w-48 opacity-90 lg:block">
          <OlwayPillar intro shine className="w-full drop-shadow-[0_10px_40px_rgba(201,162,75,0.35)]" />
        </div>
      </motion.div>

      <div className="container-page">
        <div className="max-w-2xl">
          {/* Logo animada */}
          <div className="flex items-center gap-4">
            <OlwayPillar intro shine className="h-14 w-auto sm:h-16 lg:hidden" />
            <div className="flex flex-col gap-2">
              <OlwayWordmark intro shine tone="bone" delay={0.4} className="h-8 w-auto sm:h-10" />
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{ opacity: 1, letterSpacing: "0.38em" }}
                transition={{ duration: 1.2, delay: 1.8, ease }}
                className="font-display text-[11px] font-semibold uppercase text-gold sm:text-xs"
              >
                {hero.tag}
              </motion.span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-sm font-medium text-mute sm:text-base"
          >
            {hero.subtitle}
          </motion.p>

          <h1 id="hero-title" className="mt-3 font-display text-[2.6rem] font-bold uppercase leading-[0.92] min-[390px]:text-[2.9rem] sm:text-7xl lg:text-[5.4rem]">
            {hero.headline.map((line, i) => (
              <span key={line} className="-mt-[0.12em] block overflow-hidden pb-1 pt-[0.12em]">
                <motion.span
                  className={`block ${i === 1 ? "text-gold-gradient" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.7 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg"
          >
            {hero.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId("time")}
              className="btn-gold w-full sm:w-auto"
            >
              {hero.primaryCta}
              <ChevronDown className="h-4 w-4" aria-hidden />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId("referencias")}
              className="btn-ghost w-full sm:w-auto"
            >
              <PlayCircle className="h-4 w-4" aria-hidden />
              {hero.secondaryCta}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* indicador de rolagem */}
      <motion.button
        type="button"
        onClick={() => scrollToId("time")}
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute sm:flex"
      >
        Role
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-bone/25">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-gold"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
