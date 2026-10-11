/**
 * TOP 5 PRODUTOS OLWAY — fotos oficiais enviadas pela marca + links da loja.
 * Para trocar uma foto, substitua o arquivo em public/products/<slug>.webp.
 */

export interface Product {
  slug: string;
  rank: number;
  name: string;
  url: string;
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    slug: "compressao-manga-curta",
    rank: 1,
    name: "Compressão Manga Curta",
    url: "https://olway.com.br/produtos/compressao-manga-curta/",
    image: "/products/compressao-manga-curta.webp",
    imageAlt: "Atleta na academia vestindo a Compressão Manga Curta preta da Olway",
  },
  {
    slug: "regata-canelada-golden-era",
    rank: 2,
    name: "Regata Canelada Golden Era",
    url: "https://olway.com.br/produtos/regata-canelada-golden-era/",
    image: "/products/regata-canelada-golden-era.webp",
    imageAlt: "Atleta segurando halteres com a Regata Canelada Golden Era preta com acabamento branco",
  },
  {
    slug: "compressao-armor-gothic-1ocjt",
    rank: 3,
    name: "Compressão Armor Gothic",
    url: "https://olway.com.br/produtos/compressao-armor-gothic-1ocjt/",
    image: "/products/compressao-armor-gothic-1ocjt.webp",
    imageAlt: "Atleta fazendo pose com a Compressão Armor Gothic preta com estampa gótica",
  },
  {
    slug: "regata-canelada",
    rank: 4,
    name: "Regata Canelada",
    url: "https://olway.com.br/produtos/regata-canelada/",
    image: "/products/regata-canelada.webp",
    imageAlt: "Atleta na academia vestindo a Regata Canelada preta da Olway",
  },
  {
    slug: "strap-couro",
    rank: 5,
    name: "Strap Couro",
    url: "https://olway.com.br/produtos/strap-couro/",
    image: "/products/strap-couro.webp",
    imageAlt: "Mão segurando a barra com o Strap de Couro marrom com o símbolo Olway",
  },
];
