import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Lightbulb, Plus, ShieldAlert } from "lucide-react";
import { pillars } from "../data/content";
import { ease, icons, NextSection, Reveal, SectionHeading } from "./ui";

function PurchaseFlow() {
  return (
    <ol className="mt-5 grid gap-2 sm:grid-cols-5 sm:gap-0" aria-label="Jornada de compra">
      {pillars.flow.map((step, i) => {
        const Icon = icons[step.icon];
        const last = i === pillars.flow.length - 1;
        return (
          <Fragment key={step.label}>
            <motion.li
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, ease }}
              className="relative flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center"
            >
              <span
                className={`relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                  last ? "border-gold bg-gold text-ink" : "border-gold/40 bg-ink text-gold"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-semibold uppercase leading-tight tracking-wide text-bone sm:px-1 sm:text-[12px]">
                <span className="mr-1 text-gold sm:block sm:mr-0">{String(i + 1).padStart(2, "0")}</span>
                {step.label}
              </span>
              {!last && (
                <>
                  {/* conectores animados */}
                  <motion.span
                    aria-hidden
                    className="absolute left-6 top-12 h-2 w-px origin-top bg-gold/50 sm:hidden"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.25 + i * 0.12 }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-56px)] origin-left bg-gradient-to-r from-gold/70 to-gold/20 sm:block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                  />
                </>
              )}
            </motion.li>
          </Fragment>
        );
      })}
    </ol>
  );
}

export function StrategyPillars() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="pilares" aria-labelledby="pilares-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="pilares-title" index="03" label="Estratégia" title={pillars.title}>
          <p>Toque em cada pilar para abrir o módulo.</p>
        </SectionHeading>

        <div className="mt-12 space-y-3">
          {pillars.items.map((p, i) => {
            const isOpen = open === i;
            const panelId = `pilar-painel-${i}`;
            return (
              <Reveal key={p.n} delay={i * 0.06}>
                <div
                  className={`card overflow-hidden transition-colors duration-300 ${
                    isOpen ? "border-gold/40 bg-graphite/60" : "hover:border-bone/20"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-7"
                    >
                      <span
                        className={`font-display text-4xl font-bold transition-colors sm:text-6xl ${
                          isOpen ? "text-gold-gradient" : "text-bone/20"
                        }`}
                      >
                        {p.n}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-[11px] font-semibold tracking-[0.22em] text-gold">
                          PILAR {p.n}
                        </span>
                        <span className="mt-1 block font-display text-lg font-bold uppercase leading-tight sm:text-2xl">
                          {p.title}
                        </span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                          isOpen ? "border-gold bg-gold text-ink" : "border-bone/20 text-bone"
                        }`}
                      >
                        <Plus className="h-5 w-5" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={p.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <div className="border-t border-bone/10 px-5 pb-6 pt-5 sm:px-7 sm:pb-8 sm:pl-[calc(1.75rem+5.25rem)]">
                          <p className="max-w-2xl text-base leading-relaxed text-bone/85 sm:text-lg">{p.lead}</p>

                          <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                            {p.listTitle}
                          </p>

                          {p.list.length > 0 ? (
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                              {p.list.map((item, j) => (
                                <motion.li
                                  key={item}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.08 + j * 0.04 }}
                                  className="flex items-start gap-2.5 rounded-xl bg-ink/60 px-4 py-3 text-[15px] text-bone/90"
                                >
                                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          ) : (
                            <PurchaseFlow />
                          )}

                          {p.tip && (
                            <p
                              className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
                                p.n === "03"
                                  ? "border-bone/10 bg-ink/50 text-mute"
                                  : "border-gold/30 bg-gold/[0.07] text-bone/85"
                              }`}
                            >
                              {p.n === "03" ? (
                                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-mute" aria-hidden />
                              ) : (
                                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                              )}
                              {p.tip}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <NextSection current="pilares" />
      </div>
    </section>
  );
}
