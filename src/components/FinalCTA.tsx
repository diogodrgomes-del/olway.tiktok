import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { finalCta, footer, social } from "../data/content";
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

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.5a7.9 7.9 0 0 0 4.6 1.5V6.7a4.6 4.6 0 0 1-4.6-4.7Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: social.instagram, Icon: Instagram },
  { label: "TikTok", href: social.tiktok, Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-bone/10 py-12">
      <div className="container-page flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <OlwayPillar className="h-8 w-auto" title="" />
          <div>
            <OlwayWordmark className="h-4 w-auto" />
            <p className="mt-1 font-display text-[11px] tracking-[0.24em] text-chrome">{footer.brand.replace("OLWAY — ", "")}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">Siga a Olway · {social.handle}</p>
          <ul className="flex gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[52px] items-center gap-2.5 rounded-xl border border-bone/20 px-5 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                  <span className="sr-only">(abre em nova aba)</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 flex flex-col items-center gap-2 border-t border-bone/10 pt-6 text-center sm:flex-row sm:justify-between">
        <p className="text-sm text-mute">{footer.tagline}</p>
        <p className="text-xs text-bone/35">© {new Date().getFullYear()} {footer.brand}</p>
      </div>
    </footer>
  );
}
