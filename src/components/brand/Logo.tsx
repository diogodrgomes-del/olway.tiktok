import { useId } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "../../brand/wordmarkPath";

/**
 * LOGO OLWAY
 * - Símbolo (pilar) redesenhado em SVG a partir do arquivo oficial enviado.
 * - Logotipo (OLWAY) vetorizado a partir do arquivo oficial enviado.
 * Para trocar a logo, substitua os desenhos abaixo e o arquivo src/brand/wordmarkPath.ts.
 */

const PILLAR_VIEWBOX = "180 10 346 268";

const pillarBars = [
  "185,16 521,16 509,40 197,40",
  "200,48 506,48 496,68 210,68",
  "237,78 469,78 469,102 237,102",
];
const pillarCols = [
  "273,102 304,102 304,226 273,206",
  "321,102 385,102 385,250 353,272 321,250",
  "402,102 433,102 433,206 402,226",
];

function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

function GoldGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="rgb(var(--c-gold-soft))" />
      <stop offset="45%" stopColor="rgb(var(--c-gold))" />
      <stop offset="100%" stopColor="rgb(var(--c-gold-deep))" />
    </linearGradient>
  );
}

/** Faixa de luz que atravessa o desenho, recortada pelo clipPath informado. */
function Shine({
  clipId,
  x,
  y,
  w,
  h,
  delay,
}: {
  clipId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
}) {
  const gradId = useSvgId("shine");
  const band = w * 0.28;
  return (
    <g clipPath={`url(#${clipId})`} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.rect
        y={y - h}
        width={band}
        height={h * 3}
        fill={`url(#${gradId})`}
        style={{ rotate: 20, transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ x: x - band * 2 }}
        animate={{ x: x + w + band }}
        transition={{ duration: 1.6, ease: "easeInOut", delay, repeat: Infinity, repeatDelay: 5 }}
      />
    </g>
  );
}

interface PillarProps {
  className?: string;
  /** Monta o pilar peça por peça ao aparecer. */
  intro?: boolean;
  /** Brilho periódico atravessando o símbolo. */
  shine?: boolean;
  /** 0 → 1: preenche o pilar de dourado de baixo para cima (ex.: progresso de leitura). */
  progress?: MotionValue<number>;
  title?: string;
}

export function OlwayPillar({ className, intro = false, shine = false, progress, title = "Símbolo Olway" }: PillarProps) {
  const reduce = useReducedMotion();
  const gold = useSvgId("gold");
  const clip = useSvgId("pillar");
  const play = intro && !reduce;
  const full = useMotionValue(1);
  const fillY = useTransform(progress ?? full, [0, 1], [278, 10]);

  const shapes = (
    <>
      {pillarBars.map((p) => (
        <polygon key={p} points={p} />
      ))}
      {pillarCols.map((p) => (
        <polygon key={p} points={p} />
      ))}
    </>
  );

  return (
    <svg
      viewBox={PILLAR_VIEWBOX}
      className={className}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <defs>
        <GoldGradient id={gold} />
        <clipPath id={clip}>{shapes}</clipPath>
      </defs>

      {progress ? (
        <>
          {/* base apagada + preenchimento dourado guiado pelo progresso */}
          <g fill="rgb(var(--c-bone) / 0.16)">{shapes}</g>
          <g clipPath={`url(#${clip})`}>
            <motion.rect x={180} width={346} height={300} y={fillY} fill={`url(#${gold})`} />
          </g>
        </>
      ) : (
        <g fill={`url(#${gold})`}>
          {pillarBars.map((p, i) => (
            <motion.polygon
              key={p}
              points={p}
              initial={play ? { opacity: 0, y: -60 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.15 + i * 0.14 }}
            />
          ))}
          {pillarCols.map((p, i) => (
            <motion.polygon
              key={p}
              points={p}
              style={{ transformBox: "fill-box", transformOrigin: "top" }}
              initial={play ? { scaleY: 0, opacity: 0 } : false}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 + [0.12, 0, 0.12][i] }}
            />
          ))}
        </g>
      )}

      {shine && !reduce && <Shine clipId={clip} x={180} y={10} w={346} h={268} delay={intro ? 1.6 : 0.8} />}
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  /** Desenha o contorno em dourado e depois preenche. */
  intro?: boolean;
  shine?: boolean;
  /** "gold" usa o gradiente dourado; "bone" usa branco. */
  tone?: "gold" | "bone";
  delay?: number;
}

export function OlwayWordmark({ className, intro = false, shine = false, tone = "bone", delay = 0 }: WordmarkProps) {
  const reduce = useReducedMotion();
  const gold = useSvgId("wgold");
  const clip = useSvgId("wclip");
  const play = intro && !reduce;
  const fill = tone === "gold" ? `url(#${gold})` : "rgb(var(--c-bone))";

  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label="OLWAY">
      <defs>
        <GoldGradient id={gold} />
        <clipPath id={clip}>
          <path d={WORDMARK_PATH} clipRule="evenodd" />
        </clipPath>
      </defs>
      <motion.path
        d={WORDMARK_PATH}
        fillRule="evenodd"
        fill={fill}
        stroke={`url(#${gold})`}
        strokeWidth={play ? 6 : 0}
        initial={play ? { pathLength: 0, fillOpacity: 0 } : false}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: 2.2, ease: "easeInOut", delay },
          fillOpacity: { duration: 0.9, ease: "easeOut", delay: delay + 1.7 },
        }}
      />
      {shine && !reduce && <Shine clipId={clip} x={0} y={0} w={1656} h={424} delay={delay + (intro ? 2.6 : 0.5)} />}
    </svg>
  );
}

/** Símbolo + logotipo lado a lado (uso no cabeçalho/rodapé). */
export function OlwayLockup({ className, progress }: { className?: string; progress?: MotionValue<number> }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <OlwayPillar className="h-7 w-auto" progress={progress} title="Olway" />
      <OlwayWordmark className="h-[15px] w-auto" />
    </span>
  );
}
