# MANUAL OLWAY TIKTOK SHOP

Guia oficial do criador Olway para o TikTok Shop. Landing page educativa (sem fins de venda) para novos criadores e afiliados Olway.

**Stack:** React 18 + TypeScript + Vite · Tailwind CSS · Framer Motion · Lucide React

## Rodar

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # servir o build
```

Deploy: pronto para Netlify (`netlify.toml`) ou qualquer hospedagem estática (pasta `dist/`).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Cores da marca (tokens) | `src/index.css` → bloco `:root` |
| Textos de todas as seções, checklist, link do CTA | `src/data/content.ts` |
| Destino do botão "Acessar TikTok Shop" | `TIKTOK_SHOP_URL` em `src/data/content.ts` |
| 11 vídeos de referência, categorias, embed | `src/data/videos.ts` |
| Logo (símbolo e logotipo animados) | `src/components/brand/Logo.tsx` e `src/brand/wordmarkPath.ts` |
| Foto do Hero | `public/brand/creator-hero.webp` / `.jpg` |

### Identidade
Preto e branco, "preto brilhante" (cards com reflexo) e destaques cromados. Tokens em `src/index.css` (`:root`).
Abertura de 3 s com o escudo Olway e "Excelência em cada fio, propósito em cada estampa" (`src/components/Splash.tsx`, duração em `splash.durationMs`).

### Logo animada
- **Abertura:** o escudo se monta, gira 360° e brilha.
- **Hero, faixas e encerramento:** pilar girando em 3D continuamente.
- **Cabeçalho:** o pilar dá uma volta a cada nova etapa e se preenche conforme o progresso de leitura.
- Tudo respeita `prefers-reduced-motion`.

### Vídeos de referência
Cards "Vídeo 1", "Vídeo 2"… com link direto para o TikTok (nova aba). Links em `src/data/videos.ts`.

### Top 5 produtos
Fotos oficiais em `public/products/` e links da loja em `src/data/products.ts`.

### HTML único
`npm run build:html` gera `olway-creator-hub.html` com tudo embutido.
