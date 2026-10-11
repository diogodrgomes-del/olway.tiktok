import { motion } from "framer-motion";
import { finalCta, footer } from "../data/content";
import { OlwayPillar, OlwayWordmark, SpinningPillar } from "./brand/Logo";
import { ease } from "./ui";

export function FinalCTA() {
  const words = finalCta.headline.split(" ");
  return (
    <section id="executar" aria-labelledby="executar-title" className="relative isolate overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[140px]" />
        <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <SpinningPillar className="h-24 w-[120px] sm:h-28 sm:w-[140px]" duration={6} />
        </motion.div>

        <h2
          id="executar-title"
          className="mt-10 max-w-5xl font-display text-[2.6rem] font-bold uppercase leading-[0.95] min-[390px]:text-5xl sm:text-7xl lg:text-8xl"
        >
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              className="text-chrome-gradient mr-[0.22em] inline-block pb-1 last:mr-0"
              initial={{ opacity: 0, y: 40, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.1 }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-bone/10 py-10">
      <div className="container-page flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <OlwayPillar className="h-8 w-auto" title="" />
          <div>
            <OlwayWordmark className="h-4 w-auto" />
            <p className="mt-1 font-display text-[11px] tracking-[0.24em] text-chrome">{footer.brand.replace("OLWAY — ", "")}</p>
          </div>
        </div>
        <p className="text-sm text-mute">{footer.tagline}</p>
        <p className="text-xs text-bone/35">© {new Date().getFullYear()} {footer.brand}</p>
      </div>
    </footer>
  );
}
