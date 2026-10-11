import { OlwayPillar } from "./brand/Logo";
import { splash } from "../data/content";

/** Faixa infinita com a assinatura da marca e o pilar girando. */
export function Marquee({ inverted = false }: { inverted?: boolean }) {
  const items = Array.from({ length: 4 }).flatMap(() => splash.lines);
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-y py-4 ${
        inverted ? "border-ink/10 bg-bone text-ink" : "gloss border-bone/10 bg-coal text-bone"
      }`}
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-8">
            {items.map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.22em] sm:text-base">
                {t}
                <span className="inline-block h-5 w-6 [perspective:400px]">
                  <span className="spin-y block h-full w-full" style={{ animationDuration: `${4 + (i % 3)}s` }}>
                    <OlwayPillar className={`h-full w-full ${inverted ? "[&_g]:fill-ink" : ""}`} title="" />
                  </span>
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
