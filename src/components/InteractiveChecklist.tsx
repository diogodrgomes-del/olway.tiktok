import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, PartyPopper, RotateCcw } from "lucide-react";
import { checklist } from "../data/content";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { OlwayPillar } from "./brand/Logo";
import { ease, NextSection, Reveal, SectionHeading } from "./ui";

const RING = 2 * Math.PI * 52;

function Burst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-chrome"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 110, y: Math.sin(angle) * 110, opacity: 0, scale: 0.4 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function ProgressRing({ done, total, small = false }: { done: number; total: number; small?: boolean }) {
  const complete = done === total;
  const pct = Math.round((done / total) * 100);
  return (
    <div className={`relative shrink-0 ${small ? "h-[60px] w-[60px]" : "h-28 w-28"}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(var(--c-bone) / 0.1)" strokeWidth={small ? 11 : 8} />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="rgb(var(--c-chrome))"
          strokeWidth={small ? 11 : 8}
          strokeLinecap="round"
          strokeDasharray={RING}
          initial={false}
          animate={{ strokeDashoffset: RING * (1 - done / total) }}
          transition={{ duration: 0.6, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {complete ? (
            <motion.span
              key="ok"
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            >
              <OlwayPillar className={small ? "h-5 w-auto" : "h-10 w-auto"} intro title="" />
            </motion.span>
          ) : (
            <motion.span
              key={pct}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`font-display font-bold ${small ? "text-sm" : "text-2xl"}`}
            >
              {pct}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {complete && !small && <Burst />}
    </div>
  );
}

export function InteractiveChecklist() {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    checklist.storageKey,
    checklist.items.map(() => false),
  );
  // garante o tamanho correto caso a lista de itens mude
  const state = checklist.items.map((_, i) => !!checked[i]);
  const total = state.length;
  const done = state.filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const complete = done === total;

  const toggle = (i: number) => setChecked(state.map((v, j) => (j === i ? !v : v)));
  const reset = () => setChecked(checklist.items.map(() => false));

  return (
    <section id="checklist" aria-labelledby="checklist-title" className="relative border-t border-bone/5 bg-coal/40 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="checklist-title" index="07" label="Checklist interativo" title={checklist.title}>
          <p>Marque cada item antes de publicar. Seu progresso fica salvo neste navegador.</p>
        </SectionHeading>

        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-10">
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)]">

            {/* Indicador de progresso */}
              <Reveal>
              <div className="card relative flex items-center gap-6 overflow-hidden p-5 sm:p-6">
                <ProgressRing done={done} total={total} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xs font-semibold tracking-[0.2em] text-mute" aria-live="polite">
                    {done} DE {total} ITENS · {pct}%
                  </p>
                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-bone/10"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label="Conclusão do checklist"
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-chrome-deep via-chrome to-chrome-soft"
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    disabled={done === 0}
                    className="mt-4 inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-lg px-1 text-sm font-semibold text-mute transition-colors hover:text-bone disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Reiniciar checklist
                  </button>
                </div>
              </div>
              </Reveal>
            </div>
          </div>

          {/* celular: progresso fixo à esquerda + itens à direita, tudo visível ao mesmo tempo */}
          <div className="grid grid-cols-[76px_1fr] gap-3 lg:block">
            <div className="lg:hidden">
              <div className="card sticky top-[calc(var(--header-h)+14px)] flex flex-col items-center gap-2 px-1.5 py-3">
                <ProgressRing done={done} total={total} small />
                <p className="font-display text-[11px] font-bold tracking-[0.08em]" aria-live="polite">
                  {done}/{total}
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone/10" aria-hidden>
                  <motion.div
                    className="h-full rounded-full bg-bone"
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease }}
                  />
                </div>
                <button
                  type="button"
                  onClick={reset}
                  disabled={done === 0}
                  aria-label="Reiniciar checklist"
                  className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bone/15 text-mute transition-colors hover:text-bone disabled:opacity-30"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          <div>
            <ul className="space-y-2.5 lg:space-y-3">
              {checklist.items.map((item, i) => {
                const on = state[i];
                return (
                  <Reveal as="li" key={item} delay={i * 0.04}>
                    <label
                      className={`group flex min-h-[56px] cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-colors sm:gap-4 sm:p-5 ${
                        on ? "border-moss bg-moss/20" : "border-bone/10 bg-coal hover:border-bone/25"
                      }`}
                    >
                      <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(i)} />
                      <motion.span
                        aria-hidden
                        animate={{ scale: on ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-chrome peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink ${
                          on ? "border-moss bg-moss text-bone" : "border-bone/30 text-transparent"
                        }`}
                      >
                        <motion.svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3.5}>
                          <motion.path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{ pathLength: on ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.svg>
                      </motion.span>
                      <span className={`text-[14px] leading-snug transition-colors sm:text-base ${on ? "text-bone" : "text-bone/80"}`}>
                        <span className="mr-2 font-display text-xs font-semibold text-chrome">{String(i + 1).padStart(2, "0")}</span>
                        {item}
                      </span>
                    </label>
                  </Reveal>
                );
              })}
            </ul>

            <AnimatePresence>
              {complete && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease }}
                  className="relative mt-6 overflow-hidden rounded-2xl border border-chrome bg-ink p-6 sm:p-7"
                  role="status"
                >
                  <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-chrome/25 blur-3xl" />
                  <p className="relative flex items-center gap-3 font-display text-xl font-bold uppercase leading-tight text-chrome-soft sm:text-2xl">
                    <PartyPopper className="h-6 w-6 shrink-0 text-chrome" aria-hidden />
                    {checklist.done}
                  </p>
                  <p className="relative mt-3 flex items-start gap-2 text-sm text-mute">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-chrome" aria-hidden />
                    {checklist.doneNote}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>

        <NextSection current="checklist" />
      </div>
    </section>
  );
}
