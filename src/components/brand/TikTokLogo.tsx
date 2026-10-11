import { motion } from "framer-motion";

// Nota musical do TikTok (Simple Icons, CC0), em caixa 24×24.
const NOTE =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

const CYAN = "#25F4EE";
const RED = "#FE2C55";

/**
 * Logo do TikTok animado: as camadas ciano e vermelha entram de lados opostos,
 * se encaixam atrás da nota branca e seguem com um leve efeito "glitch".
 */
export function TikTokLogo({ className, delay = 0 }: { className?: string; delay?: number }) {
  const intro = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay };
  const glitch = { duration: 0.35, delay: delay + 1.3, repeat: Infinity, repeatDelay: 1.1 };

  return (
    <svg viewBox="-3 -3 30 30" className={className} role="img" aria-label="TikTok">
      {/* ciano: vem do canto superior esquerdo */}
      <motion.g initial={{ x: -14, y: -10, opacity: 0 }} animate={{ x: -0.85, y: -0.85, opacity: 1 }} transition={intro}>
        <motion.path d={NOTE} fill={CYAN} animate={{ x: [0, -1.2, 0.5, 0], y: [0, 0.4, -0.3, 0] }} transition={glitch} />
      </motion.g>
      {/* vermelho: vem do canto inferior direito */}
      <motion.g initial={{ x: 14, y: 10, opacity: 0 }} animate={{ x: 0.85, y: 0.85, opacity: 1 }} transition={intro}>
        <motion.path d={NOTE} fill={RED} animate={{ x: [0, 1.2, -0.5, 0], y: [0, -0.4, 0.3, 0] }} transition={glitch} />
      </motion.g>
      {/* nota branca por cima */}
      <motion.path
        d={NOTE}
        fill="#ffffff"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.18, 1], opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: delay + 0.45 }}
      />
    </svg>
  );
}
