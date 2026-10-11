import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Quote } from "lucide-react";
import { ideas } from "../data/content";
import { NextSection, Reveal, SectionHeading } from "./ui";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback para navegadores sem Clipboard API (ou fora de contexto seguro)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

type Idea = (typeof ideas.items)[number];

function IdeaCard({ idea, index }: { idea: Idea; index: number }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");

  const onCopy = async () => {
    const text = `IDEIA OLWAY — ${idea.title.toUpperCase()}\n\nGancho: "${idea.hook}"\n\nExecução: ${idea.execution}`;
    const ok = await copyText(text);
    setState(ok ? "ok" : "fail");
    window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <Reveal as="li" delay={(index % 3) * 0.07} className="h-full w-[86%] shrink-0 snap-center sm:w-auto">
      <motion.article
        whileHover={{ y: -4 }}
        className="card group relative flex h-full flex-col p-6 transition-colors hover:border-chrome/35 sm:p-7"
      >
        <header className="flex items-center justify-between">
          <span className="font-display text-xs font-semibold tracking-[0.22em] text-chrome">IDEIA {idea.n}</span>
          <span aria-hidden className="h-px flex-1 mx-4 bg-bone/10 transition-colors group-hover:bg-chrome/30" />
          <Quote className="h-4 w-4 text-bone/25" aria-hidden />
        </header>
        <h3 className="mt-5 font-display text-2xl font-bold uppercase">{idea.title}</h3>

        <div className="mt-4 rounded-xl border-l-2 border-chrome bg-ink/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">Gancho</p>
          <p className="mt-1 font-display text-lg font-medium leading-snug text-bone">“{idea.hook}”</p>
        </div>

        <div className="mt-4 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">Execução</p>
          <p className="mt-1 text-[15px] leading-relaxed text-bone/75">{idea.execution}</p>
        </div>

        <motion.button
          type="button"
          onClick={onCopy}
          whileTap={{ scale: 0.97 }}
          className={`mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border font-display text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
            state === "ok"
              ? "border-chrome bg-chrome text-ink"
              : "border-bone/15 text-bone hover:border-chrome/60 hover:text-chrome-soft"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2"
            >
              {state === "ok" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
              {state === "ok" ? "Ideia copiada!" : state === "fail" ? "Não foi possível copiar" : "Copiar ideia"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <span className="sr-only" aria-live="polite">
          {state === "ok" ? `Ideia ${idea.title} copiada para a área de transferência.` : ""}
        </span>
      </motion.article>
    </Reveal>
  );
}

export function ContentIdeas() {
  return (
    <section id="ideias" aria-labelledby="ideias-title" className="relative border-t border-bone/5 bg-coal/40 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="ideias-title" index="05" label="Ideias de conteúdo" title={ideas.title}>
          <p>Seis formatos prontos para gravar. Copie o gancho e a execução e adapte à sua rotina.</p>
        </SectionHeading>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-mute sm:hidden" aria-hidden>
          Deslize para ver as 6 ideias →
        </p>
        <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {ideas.items.map((idea, i) => (
            <IdeaCard key={idea.n} idea={idea} index={i} />
          ))}
        </ul>

        <NextSection current="ideias" />
      </div>
    </section>
  );
}
