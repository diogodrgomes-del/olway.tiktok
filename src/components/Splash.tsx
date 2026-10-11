import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { splash } from "../data/content";
import { OlwayPillar } from "./brand/Logo";
import { TikTokLogo } from "./brand/TikTokLogo";
import { ease } from "./ui";

/** Frase com entrada palavra por palavra. O efeito cromado vai em cada palavra (não no bloco). */
function WordReveal({ lines, chromeLine, startDelay }: { lines: string[]; chromeLine: number; startDelay: number }) {
  let w = 0;
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word) => {
            const i = w++;
            return (
              <motion.span
                key={word + i}
                className={`mr-[0.28em] inline-block pb-1 last:mr-0 ${li === chromeLine ? "text-chrome-gradient" : "text-bone"}`}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease, delay: startDelay + i * 0.1 }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/**
 * Tela de abertura (6 s, duas cenas):
 * 1. Escudo Olway monta e gira + "Excelência em cada fio, propósito em cada estampa".
 * 2. Olway × TikTok: logo do TikTok entra com efeito glitch + "Manual OLWAY TikTok Shop".
 */
export function Splash({ duration, onSkip }: { duration: number; onSkip: () => void }) {
  const [stage, setStage] = useState<1 | 2>(1);

  useEffect(() => {
    const t = window.setTimeout(() => setStage(2), splash.stageMs);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.div
      role="status"
      aria-label={`${splash.lines.join(" ")} — ${splash.tiktokLines.join(" ")}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.6, ease }}
    >
      {/* textura da embalagem oficial ao fundo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] grayscale"
        style={{ backgroundImage: "url(/brand/packaging.webp)" }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: duration / 1000 + 0.6, ease: "linear" }}
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(var(--c-ink))_70%)]" />
      <div aria-hidden className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />

      <div className="relative flex min-h-[340px] w-full flex-col items-center justify-center sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          {stage === 1 ? (
            <motion.div
              key="olway"
              className="flex flex-col items-center"
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.3, ease }}
            >
              {/* escudo: monta, gira e brilha */}
              <div className="relative [perspective:900px]">
                <motion.div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-white/20 blur-[60px]"
                  animate={{ opacity: [0, 0.8, 0.4], scale: [0.6, 1.3, 1] }}
                  transition={{ duration: 2.2, ease }}
                />
                <motion.div
                  initial={{ rotateY: 0, scale: 0.85 }}
                  animate={{ rotateY: [0, 0, 360], scale: [0.85, 1, 1] }}
                  transition={{ duration: 2.2, times: [0, 0.45, 1], ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <OlwayPillar intro shine className="h-28 w-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.35)] sm:h-36" title="Escudo Olway" />
                </motion.div>
              </div>

              <p className="mt-10 text-center font-display text-xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-3xl">
                <WordReveal lines={splash.lines} chromeLine={1} startDelay={0.8} />
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="tiktok"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <motion.div
                  className="[perspective:600px]"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}>
                    <OlwayPillar shine className="h-20 w-auto drop-shadow-[0_0_24px_rgba(255,255,255,0.3)] sm:h-24" title="Olway" />
                  </motion.div>
                </motion.div>

                <motion.span
                  aria-hidden
                  className="font-display text-3xl font-bold text-mute sm:text-4xl"
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                >
                  ×
                </motion.span>

                <div className="relative">
                  <motion.div
                    aria-hidden
                    className="absolute inset-2 -z-10 rounded-full blur-[38px]"
                    style={{ background: "radial-gradient(circle, rgba(37,244,238,0.55), rgba(254,44,85,0.45) 60%, transparent 75%)" }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0, 0.9, 0.5], scale: [0.6, 1.25, 1] }}
                    transition={{ duration: 1.6, delay: 0.4 }}
                  />
                  <TikTokLogo className="h-24 w-24 sm:h-28 sm:w-28" delay={0.05} />
                </div>
              </div>

              <p className="mt-10 text-center font-display text-2xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-4xl">
                <WordReveal lines={splash.tiktokLines} chromeLine={1} startDelay={0.55} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* barra de carregamento (duração total da abertura) */}
      <div aria-hidden className="relative mt-6 h-px w-40 overflow-hidden bg-bone/15">
        <motion.div
          className="h-full origin-left bg-bone"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-6 right-6 min-h-[44px] rounded-full border border-bone/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-mute transition-colors hover:text-bone"
      >
        Pular
      </button>
    </motion.div>
  );
}
