import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import { dna } from "../data/content";
import { OlwayPillar } from "./brand/Logo";
import { ease, NextSection, Reveal, SectionHeading } from "./ui";

type Side = "avoid" | "prefer";

function CompareList({ side, active, onSelect }: { side: Side; active: boolean; onSelect: () => void }) {
  const isPrefer = side === "prefer";
  const items = isPrefer ? dna.prefer : dna.avoid;
  const Icon = isPrefer ? Check : X;
  return (
    <motion.div
      layout
      onClick={onSelect}
      animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.985 }}
      transition={{ duration: 0.35, ease }}
      className={`h-full cursor-pointer rounded-2xl border p-6 sm:p-7 ${
        isPrefer ? "border-gold/50 bg-ink text-bone" : "border-ink/10 bg-white text-ink"
      }`}
    >
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-xs font-bold tracking-[0.2em] ${
          isPrefer ? "bg-gold text-ink" : "bg-danger/10 text-danger"
        }`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {isPrefer ? "PREFIRA" : "EVITE"}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: isPrefer ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, ease }}
            className="flex gap-3 text-[15px] leading-snug sm:text-base"
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isPrefer ? "bg-gold/15 text-gold" : "bg-danger/10 text-danger"
              }`}
            >
              <Icon className="h-3 w-3" aria-hidden />
            </span>
            <span className={!isPrefer ? "text-ink/75 line-through decoration-danger/40" : ""}>{t}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function BrandPositioning() {
  const [side, setSide] = useState<Side>("prefer");

  return (
    <section id="dna" aria-labelledby="dna-title" className="relative overflow-hidden bg-bone py-20 text-ink sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-16 w-[360px] opacity-[0.06] sm:w-[520px]">
        <OlwayPillar className="w-full [&_g]:fill-ink" />
      </div>

      <div className="container-page relative">
        <SectionHeading id="dna-title" tone="light" index="02" label="DNA Olway · Valor acima de preço" title={dna.title}>
          <p>{dna.text}</p>
        </SectionHeading>

        {/* Diferenciais */}
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 lg:grid-cols-4">
          {dna.differentials.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.06} className="group bg-bone p-5 transition-colors hover:bg-white sm:p-7">
              <span className="font-display text-4xl font-bold text-gold-deep/30 transition-colors group-hover:text-gold-deep sm:text-5xl">
                {d.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase sm:text-xl">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-ink/65 sm:text-[15px]">{d.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Comparação interativa */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold uppercase sm:text-3xl">Como falar da Olway</h3>
          </Reveal>
          <Reveal delay={0.05}>
            <div
              role="tablist"
              aria-label="Comparar abordagens"
              className="relative mt-5 inline-flex rounded-full border border-ink/10 bg-white p-1"
            >
              {(["avoid", "prefer"] as Side[]).map((s) => (
                <button
                  key={s}
                  role="tab"
                  type="button"
                  aria-selected={side === s}
                  aria-controls={`painel-${s}`}
                  onClick={() => setSide(s)}
                  className={`relative min-h-[44px] rounded-full px-6 font-display text-sm font-bold tracking-[0.14em] transition-colors ${
                    side === s ? (s === "prefer" ? "text-ink" : "text-bone") : "text-ink/55"
                  }`}
                >
                  {side === s && (
                    <motion.span
                      layoutId="compare-pill"
                      className={`absolute inset-0 rounded-full ${s === "prefer" ? "bg-gold" : "bg-danger"}`}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s === "prefer" ? "PREFIRA" : "EVITE"}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* mobile: um painel por vez */}
          <div className="mt-6 md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                id={`painel-${side}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <CompareList side={side} active onSelect={() => undefined} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* desktop: lado a lado, com destaque no selecionado */}
          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2">
            <CompareList side="avoid" active={side === "avoid"} onSelect={() => setSide("avoid")} />
            <CompareList side="prefer" active={side === "prefer"} onSelect={() => setSide("prefer")} />
          </div>
        </div>

        {/* Destaque */}
        <Reveal className="mt-16">
          <figure className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden className="absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-gold/25 blur-[90px]" />
            <blockquote className="relative font-display text-2xl font-bold uppercase leading-tight text-bone sm:text-4xl lg:text-5xl">
              <span className="block">{dna.quote[0]}</span>
              <span className="text-gold-gradient block">{dna.quote[1]}</span>
            </blockquote>
          </figure>
        </Reveal>

        <Reveal className="mt-5">
          <p className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4 text-sm text-ink/70 sm:text-[15px]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
            {dna.note}
          </p>
        </Reveal>

        <NextSection current="dna" tone="light" />
      </div>
    </section>
  );
}
