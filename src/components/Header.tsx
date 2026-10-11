import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, PlayCircle, X } from "lucide-react";
import { sections } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { OlwayLockup } from "./brand/Logo";
import { scrollToId } from "./ui";

const ids = sections.map((s) => s.id);

export function Header() {
  const active = useActiveSection(ids);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 24));
  useMotionValueEvent(scrollYProgress, "change", (v) => setPct(Math.round(v * 100)));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // espera o menu fechar e liberar a rolagem
    requestAnimationFrame(() => scrollToId(id));
  };

  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      <a
        href="#time"
        className="sr-only z-[60] rounded-md bg-chrome px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-b border-bone/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go("inicio")}
            className="shrink-0 rounded-md"
            aria-label="Manual OLWAY TikTok Shop — voltar ao início"
            title={`Treinamento ${pct}% percorrido`}
          >
            {/* o pilar dá uma volta a cada nova etapa */}
            <OlwayLockup progress={progress} spinKey={active} />
          </button>

          <nav aria-label="Etapas do treinamento" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {sections.slice(1).map((s) => {
                const isActive = s.id === active;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(s.id);
                      }}
                      aria-current={isActive ? "step" : undefined}
                      className={`relative block rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        isActive ? "text-bone" : "text-mute hover:text-bone"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-bone/[0.07] ring-1 ring-chrome/30"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("referencias")}
              className="hidden items-center gap-2 rounded-lg border border-chrome/40 px-3 py-2 text-[13px] font-semibold text-chrome-soft transition-colors hover:bg-chrome/10 sm:inline-flex"
            >
              <PlayCircle className="h-4 w-4" aria-hidden />
              Referências
            </button>

            <span className="font-display text-[11px] tracking-[0.18em] text-mute lg:hidden" aria-hidden>
              <span className="text-chrome">{current.short}</span> {current.label.toUpperCase()}
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-bone/15 text-bone lg:hidden"
              aria-label="Abrir menu de etapas"
              aria-expanded={open}
              aria-controls="menu-etapas"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* barra de progresso do treinamento */}
        <div className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-transparent" aria-hidden>
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: progress,
              background: "linear-gradient(90deg, rgb(var(--c-chrome-deep)), #fff, rgb(var(--c-chrome-deep)), #fff)",
            }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-etapas"
            role="dialog"
            aria-modal="true"
            aria-label="Etapas do treinamento"
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-page flex h-[var(--header-h)] items-center justify-between">
              <span className="font-display text-xs tracking-[0.22em] text-mute">
                PROGRESSO <span className="text-chrome">{pct}%</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-bone/15"
                aria-label="Fechar menu"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-page flex-1 overflow-y-auto pb-10 pt-4">
              <ol className="space-y-1">
                {sections.map((s, i) => {
                  const isActive = s.id === active;
                  return (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i }}
                    >
                      <button
                        type="button"
                        onClick={() => go(s.id)}
                        aria-current={isActive ? "step" : undefined}
                        className={`flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left font-display text-2xl font-bold uppercase transition-colors ${
                          isActive ? "bg-bone/[0.06] text-bone" : "text-bone/55 active:bg-bone/[0.04]"
                        }`}
                      >
                        <span className={`w-8 text-sm ${isActive ? "text-chrome" : "text-mute"}`}>{s.short}</span>
                        {s.label}
                        {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-chrome" aria-hidden />}
                      </button>
                    </motion.li>
                  );
                })}
              </ol>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
