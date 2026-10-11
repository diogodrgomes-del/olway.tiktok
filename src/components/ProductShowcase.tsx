import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products, type Product } from "../data/products";
import { NextSection, Reveal, SectionHeading } from "./ui";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal as="li" delay={index * 0.07} className="w-[72%] shrink-0 snap-center sm:w-auto">
      <motion.a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-bone/40"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
          <img
            src={product.image}
            alt={product.imageAlt}
            width={720}
            height={880}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coal to-transparent" />
          <span className="absolute left-3 top-3 font-display text-4xl font-bold leading-none text-bone drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            #{product.rank}
          </span>
          {/* reflexo ao passar o mouse */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.25)_50%,transparent_65%)] transition-transform duration-700 group-hover:translate-x-full"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-lg font-bold uppercase leading-tight">{product.name}</h3>
          <span className="mt-1 flex-1 break-all text-[11px] text-mute underline decoration-bone/20 underline-offset-2">
            {product.url.replace("https://", "")}
          </span>
          <span className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-bone px-3 text-xs font-bold uppercase tracking-[0.1em] text-ink">
            Ver detalhes
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
          <span className="sr-only">(abre a loja Olway em nova aba)</span>
        </div>
      </motion.a>
    </Reveal>
  );
}

export function ProductShowcase() {
  return (
    <section id="produtos" aria-labelledby="produtos-title" className="relative border-t border-bone/5 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="produtos-title" index="04" label="Top 5 produtos" title="TOP 5 OLWAY PARA OS SEUS VÍDEOS.">
          <p>Conheça as peças em destaque. Toque em cada uma para ver tamanhos, preço e todos os detalhes no site oficial.</p>
        </SectionHeading>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-mute sm:hidden" aria-hidden>
          Deslize para ver os 5 →
        </p>
        <ol className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </ol>

        <NextSection current="produtos" />
      </div>
    </section>
  );
}
