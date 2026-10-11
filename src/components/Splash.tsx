import { motion } from "framer-motion";
import { splash } from "../data/content";
import { OlwayPillar } from "./brand/Logo";
import { ease } from "./ui";

/** Tela de abertura: escudo Olway + assinatura da marca (exibida por ~3 segundos). */
export function Splash({ duration, onSkip }: { duration: number; onSkip: () => void }) {
  const words = splash.lines.map((l) => l.split(" "));
  let w = 0;

  return (
    <motion.div
      role="status"
      aria-label={splash.lines.join(" ")}
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

      <p className="relative mt-10 text-center font-display text-xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-3xl">
        {words.map((line, li) => (
          <span key={li} className={`block ${li === 1 ? "text-chrome-gradient" : "text-bone"}`}>
            {line.map((word) => {
              const i = w++;
              return (
                <motion.span
                  key={word + i}
                  className="mr-[0.28em] inline-block last:mr-0"
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease, delay: 0.9 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        ))}
      </p>

      {/* barra de carregamento de 3s */}
      <div aria-hidden className="relative mt-10 h-px w-40 overflow-hidden bg-bone/15">
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
        className="absolute bottom-6 right-6 rounded-full border border-bone/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-mute transition-colors hover:text-bone"
      >
        Pular
      </button>
    </motion.div>
  );
}
