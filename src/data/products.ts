/**
 * TOP 5 PRODUTOS OLWAY — links oficiais da loja.
 *
 * Fotos: coloque a imagem em public/products/<slug>.webp e preencha `image`
 * (ou rode `npm run fetch:products`, que baixa a foto oficial de cada página
 * e gera src/data/products.resolved.json). Sem foto, o card não inventa imagem:
 * mostra apenas o nome e o botão para ver as fotos no site.
 */
import resolved from "./products.resolved.json";

export interface Product {
  slug: string;
  rank: number;
  name: string;
  url: string;
  image?: string;
}

const base: Product[] = [
  { slug: "compressao-manga-curta", rank: 1, name: "Compressão Manga Curta", url: "https://olway.com.br/produtos/compressao-manga-curta/" },
  { slug: "regata-canelada-golden-era", rank: 2, name: "Regata Canelada Golden Era", url: "https://olway.com.br/produtos/regata-canelada-golden-era/" },
  { slug: "compressao-armor-gothic-1ocjt", rank: 3, name: "Compressão Armor Gothic", url: "https://olway.com.br/produtos/compressao-armor-gothic-1ocjt/" },
  { slug: "regata-canelada", rank: 4, name: "Regata Canelada", url: "https://olway.com.br/produtos/regata-canelada/" },
  { slug: "strap-couro", rank: 5, name: "Strap Couro", url: "https://olway.com.br/produtos/strap-couro/" },
];

type Resolved = Record<string, { image?: string; name?: string }>;

export const products: Product[] = base.map((p) => ({
  ...p,
  image: p.image ?? (resolved as Resolved)[p.slug]?.image,
}));
