import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BadgeCheck,
  Crown,
  Eye,
  Play,
  ShoppingBag,
  ShoppingCart,
  Video,
  type LucideIcon,
} from "lucide-react";
import { sections, type SectionId } from "../data/content";

export const icons: Record<string, LucideIcon> = {
  crown: Crown,
  video: Video,
  bag: ShoppingBag,
  play: Play,
  eye: Eye,
  cart: ShoppingCart,
  badge: BadgeCheck,
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Leva o foco para a seção sem pular a rolagem (acessibilidade por teclado).
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  children,
  tone = "dark",
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <header className="max-w-3xl">
      <Reveal>
        <span className={`eyebrow ${tone === "light" ? "text-chrome-deep" : ""}`}>
          <span className="h-px w-8 bg-current" aria-hidden />
          {index} — {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 id={id} className={`section-title mt-4 ${tone === "light" ? "text-ink" : "text-bone"}`}>
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.1}>
          <div className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-ink/70" : "text-mute"}`}>
            {children}
          </div>
        </Reveal>
      )}
    </header>
  );
}

/** Botão "próxima etapa" ao final de cada seção. */
export function NextSection({ current, tone = "dark" }: { current: SectionId; tone?: "dark" | "light" }) {
  const i = sections.findIndex((s) => s.id === current);
  const next = sections[i + 1];
  if (!next) return null;
  return (
    <div className="mt-14 flex justify-center sm:mt-20">
      <motion.button
        type="button"
        onClick={() => scrollToId(next.id)}
        whileTap={{ scale: 0.96 }}
        className={`group inline-flex min-h-[48px] items-center gap-3 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
          tone === "light"
            ? "border-ink/15 text-ink/70 hover:border-chrome-deep hover:text-ink"
            : "border-bone/15 text-mute hover:border-chrome/60 hover:text-bone"
        }`}
      >
        <span className="font-display text-xs tracking-[0.2em] text-chrome">{next.short}</span>
        Próxima etapa: <strong className="font-semibold">{next.label}</strong>
        <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
      </motion.button>
    </div>
  );
}
