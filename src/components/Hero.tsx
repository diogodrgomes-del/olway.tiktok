import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import { useRef } from "react";
import { hero } from "../data/content";
import { OlwayWordmark, SpinningPillar } from "./brand/Logo";
import { ease, scrollToId } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[calc(var(--header-h)+24px)] lg:items-center lg:pb-20"
    >
      {/* Foto oficial das embalagens — fundo no celular, painel à direita no desktop */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 -z-20 lg:left-auto lg:right-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:top-[calc(var(--header-h)+32px)] lg:bottom-auto lg:z-0 lg:h-[min(680px,80vh)] lg:w-[min(440px,34vw)]"
      >
        <div className="relative h-full w-full overflow-hidden lg:rounded-3xl lg:border lg:border-bone/15 lg:shadow-[0_30px_80px_-30px_rgba(255,255,255,0.18)]">
          <motion.picture
            className="block h-full w-full"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 9, ease: "easeOut" }}
          >
            <source media="(max-width: 640px)" srcSet="/brand/hero-packaging-600.webp" type="image/webp" />
            <img
              src="/brand/hero-packaging.webp"
              alt={hero.imageAlt}
              width={794}
              height={1232}
              fetchPriority="high"
              className="h-full w-full object-cover object-center contrast-[1.1] grayscale"
            />
          </motion.picture>
          {/* reflexo de vidro que passa sobre a foto */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.18)_50%,transparent_65%)] bg-[length:250%_100%] [animation:chrome-sweep_7s_linear_infinite] lg:block"
          />
        </div>
      </motion.div>
      {/* overlays para legibilidade + vinheta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/30 lg:hidden"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent lg:hidden" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay" />

      <div className="container-page">
        <div className="max-w-2xl">
          {/* Logo animada */}
          <div className="flex items-center gap-4">
            <SpinningPillar className="h-14 w-[70px] sm:h-16 sm:w-[80px]" />
            <OlwayWordmark intro shine tone="bone" delay={0.4} className="h-8 w-auto sm:h-10" />
          </div>

          <h1 id="hero-title" className="mt-8 font-display text-[2.6rem] font-bold uppercase leading-[0.92] min-[390px]:text-[2.9rem] sm:text-7xl lg:text-[5.4rem]">
            {hero.headline.map((line, i) => (
              <span key={line} className="-mt-[0.12em] block overflow-hidden pb-1 pt-[0.12em]">
                <motion.span
                  className={`block ${i === 1 ? "text-chrome-gradient" : ""}`}
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
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.05 }}
            className="mt-5 border-l-2 border-bone pl-4 font-display text-lg font-bold uppercase tracking-[0.04em] text-bone sm:text-2xl"
          >
            {hero.slogan}
          </motion.p>

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
              className="btn-chrome w-full sm:w-auto"
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
            className="mt-2 h-2 w-1 rounded-full bg-chrome"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
