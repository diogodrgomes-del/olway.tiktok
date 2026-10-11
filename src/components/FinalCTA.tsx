import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { finalCta, footer, TIKTOK_SHOP_URL } from "../data/content";
import { OlwayPillar, OlwayWordmark, SpinningPillar } from "./brand/Logo";
import { ease, scrollToId } from "./ui";

export function FinalCTA() {
  return (
    <section id="executar" aria-labelledby="executar-title" className="relative isolate overflow-hidden py-24 sm:py-36">
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

        <h2 id="executar-title" className="mt-10 font-display text-[2.1rem] font-bold uppercase leading-[0.95] min-[390px]:text-[2.4rem] sm:text-6xl lg:text-7xl">
          {finalCta.headline.map((line, i) => (
            <span key={line} className="-mt-[0.12em] block overflow-hidden pb-1 pt-[0.12em]">
              <motion.span
                className={`block ${i === 2 ? "text-chrome-gradient" : ""}`}
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg"
        >
          {finalCta.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <motion.a
            whileTap={{ scale: 0.97 }}
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-chrome w-full sm:w-auto"
          >
            {finalCta.primary}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </motion.a>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => scrollToId("referencias")}
            className="btn-ghost w-full sm:w-auto"
          >
            <PlayCircle className="h-4 w-4" aria-hidden />
            {finalCta.secondary}
          </motion.button>
        </motion.div>
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
