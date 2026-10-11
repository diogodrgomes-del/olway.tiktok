import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Percent, Sparkles, X } from "lucide-react";
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
        isPrefer ? "border-moss bg-[linear-gradient(180deg,rgb(var(--c-moss)/0.35),rgb(var(--c-moss)/0.12))] text-bone shadow-[0_20px_60px_-25px_rgb(var(--c-moss)/0.7)]" : "border-danger bg-[linear-gradient(180deg,rgb(var(--c-danger)/0.4),rgb(var(--c-danger)/0.12))] text-bone shadow-[0_20px_60px_-25px_rgb(var(--c-danger)/0.7)]"
      }`}
    >
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-xs font-bold tracking-[0.2em] ${
          isPrefer ? "bg-moss text-bone" : "bg-danger text-bone"
        }`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {isPrefer ? "COMO FALAR" : "COMO NÃO FALAR"}
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
                isPrefer ? "bg-moss text-bone" : "bg-danger text-bone"
              }`}
            >
              <Icon className="h-3 w-3" aria-hidden />
            </span>
            <span className={!isPrefer ? "text-bone/75 line-through decoration-danger decoration-2" : "font-medium"}>{t}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function BrandPositioning() {
  const [side, setSide] = useState<Side>("prefer");

  return (
    <section id="dna" aria-labelledby="dna-title" className="relative overflow-hidden border-t border-bone/5 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-16 w-[360px] opacity-[0.04] sm:w-[520px]">
        <OlwayPillar className="w-full" title="" />
      </div>

      <div className="container-page relative">
        <SectionHeading id="dna-title" index="02" label="DNA Olway · Valor acima de preço" title={dna.title}>
          <p>{dna.text}</p>
        </SectionHeading>

        {/* Diferenciais */}
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 lg:grid-cols-4">
          {dna.differentials.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.06} className="gloss group bg-coal p-5 transition-colors hover:bg-graphite sm:p-7">
              <span className="font-display text-4xl font-bold text-bone/15 transition-colors group-hover:text-bone sm:text-5xl">
                {d.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase sm:text-xl">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-mute sm:text-[15px]">{d.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Comparação interativa */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold uppercase sm:text-3xl">Como falar (e como não falar) da Olway</h3>
          </Reveal>
          <Reveal delay={0.05}>
            <div
              role="tablist"
              aria-label="Comparar abordagens"
              className="relative mt-5 inline-flex rounded-full border border-bone/15 bg-coal p-1"
            >
              {(["avoid", "prefer"] as Side[]).map((s) => (
                <button
                  key={s}
                  role="tab"
                  type="button"
                  aria-selected={side === s}
                  aria-controls={`painel-${s}`}
                  onClick={() => setSide(s)}
                  className={`relative min-h-[44px] rounded-full px-3.5 font-display text-xs font-bold tracking-[0.08em] sm:px-6 sm:text-sm sm:tracking-[0.14em] transition-colors ${
                    side === s ? "text-bone" : "text-mute"
                  }`}
                >
                  {side === s && (
                    <motion.span
                      layoutId="compare-pill"
                      className={`absolute inset-0 rounded-full ${s === "prefer" ? "bg-moss" : "bg-danger"}`}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s === "prefer" ? "✓ COMO FALAR" : "✕ COMO NÃO FALAR"}</span>
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
          <figure className="relative overflow-hidden rounded-3xl bg-bone px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.9)_50%,transparent_70%)] bg-[length:250%_100%] [animation:chrome-sweep_5s_linear_infinite]" />
            <blockquote className="relative font-display text-2xl font-bold uppercase leading-tight text-ink sm:text-4xl lg:text-5xl">
              <span className="block">{dna.quote[0]}</span>
              <span className="block text-ink/55">{dna.quote[1]}</span>
            </blockquote>
          </figure>
        </Reveal>

        {/* Tratando de promoções */}
        <Reveal className="mt-6">
          <div className="card relative grid overflow-hidden md:grid-cols-[1.4fr_1fr]">
            <div className="p-6 sm:p-9">
              <p className="eyebrow">
                <Percent className="h-3.5 w-3.5" aria-hidden /> Ponto de atenção
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase sm:text-3xl">{dna.promo.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">{dna.promo.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {dna.promo.traits.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-bone/20 px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.12em]"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden /> {t}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-bone/10 bg-ink/60 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">{dna.promo.left.label}</p>
                  <p className="mt-1 text-bone/80">{dna.promo.left.text}</p>
                </div>
                <div className="rounded-xl bg-bone p-4 text-ink">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/60">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden /> {dna.promo.right.label}
                  </p>
                  <p className="mt-1 font-semibold">{dna.promo.right.text}</p>
                </div>
              </div>
            </div>
            <div className="relative hidden min-h-[260px] md:block">
              <img
                src="/brand/packaging.webp"
                alt="Embalagens oficiais Olway com a frase Excelência em cada fio, propósito em cada estampa"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/30 to-transparent" />
            </div>
          </div>
        </Reveal>

        <NextSection current="dna" />
      </div>
    </section>
  );
}
