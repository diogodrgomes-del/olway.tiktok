# OLWAY CREATOR HUB

Manual Definitivo do Criador — TikTok Shop. Landing page educativa (sem fins de venda) para novos criadores e afiliados Olway.

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

### Logo animada
- **Pilar:** monta-se peça por peça (barras caem, colunas descem) e recebe um brilho periódico.
- **Logotipo OLWAY:** contorno desenhado em dourado, depois preenchido, com faixa de luz.
- **Cabeçalho:** o pilar se preenche de dourado conforme o progresso de leitura do treinamento.
- Tudo respeita `prefers-reduced-motion`.

### Vídeos do TikTok
Os links fornecidos são encurtados (`tt.site`, `vt.tiktok.com`) e não permitem incorporação direta, então abrem em nova aba.
Para usar o player oficial, abra o link, copie o ID numérico da URL final (`tiktok.com/@perfil/video/<ID>`) e preencha `embedId` no item correspondente em `src/data/videos.ts`.
As capas são gráficas/tipográficas (identificadas como "Capa gráfica"), não thumbnails reais.
