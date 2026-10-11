import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { welcome } from "../data/content";
import { icons, NextSection, Reveal, scrollToId, SectionHeading } from "./ui";

export function WelcomeSection() {
  return (
    <section id="time" aria-labelledby="time-title" className="relative border-t border-bone/5 bg-coal/40 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="time-title" index="01" label="Bem-vindo" title={welcome.title}>
          {welcome.paragraphs.map((p) => (
            <p key={p} className="mt-3 first:mt-0">
              {p}
            </p>
          ))}
        </SectionHeading>

        {/* resumo rápido: o caminho todo em 4 passos */}
        <Reveal className="mt-10">
          <div className="card p-5 sm:p-7">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-mute">{welcome.quickTitle}</p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {welcome.quick.map((q, i) => (
                <motion.li
                  key={q.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToId(q.target)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-bone/10 bg-ink/60 p-4 text-left transition-colors hover:border-bone/40"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bone font-display text-lg font-bold text-ink transition-transform group-hover:scale-110">
                      {q.n}
                    </span>
                    <span>
                      <span className="block font-display font-bold uppercase leading-tight">{q.title}</span>
                      <span className="block text-sm text-mute">{q.text}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {welcome.cards.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <Reveal as="li" key={c.title} delay={i * 0.08}>
                <motion.button
                  type="button"
                  onClick={() => scrollToId(c.target)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="card group relative flex h-full w-full flex-col overflow-hidden p-6 text-left transition-colors hover:border-chrome/40 sm:p-7"
                >
                  <span
                    aria-hidden
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-bone/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
                  />
                  <span className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-bone/25 bg-bone/[0.06] text-bone">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-display text-sm text-mute">0{i + 1}</span>
                  </span>
                  <span className="mt-8 font-display text-2xl font-bold uppercase">{c.title}</span>
                  <span className="mt-2 text-mute">{c.text}</span>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-chrome-soft">
                    Ver na prática
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </motion.button>
              </Reveal>
            );
          })}
        </ul>

        <NextSection current="time" />
      </div>
    </section>
  );
}
