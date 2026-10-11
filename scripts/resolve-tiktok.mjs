// Resolve os links curtos do TikTok (tt.site / vt.tiktok.com) para a URL completa
// e o ID do vídeo, e grava o resultado em src/data/videos.resolved.json.
// Uso: npm run resolve:videos   (requer Node 18+ e acesso à internet)
import { readFile, writeFile } from "node:fs/promises";

const src = await readFile(new URL("../src/data/videos.ts", import.meta.url), "utf8");
const items = [...src.matchAll(/id: "(ref-\d+)"[^}]*?url: "([^"]+)"/g)].map((m) => ({ id: m[1], url: m[2] }));
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const idFrom = (u) => u?.match(/\/(?:video|v)\/(\d{8,})/)?.[1];

const out = {};
const failed = [];
for (const { id, url } of items) {
  let finalUrl = url;
  let videoId;
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": UA } });
    finalUrl = res.url;
    videoId = idFrom(finalUrl) ?? idFrom(await res.text());
  } catch (e) {
    console.warn(`✗ ${id} redirecionamento falhou: ${e.message}`);
  }
  if (!videoId) {
    try {
      const o = await (await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`)).json();
      videoId = o.embed_product_id ?? o.html?.match(/data-video-id="(\d+)"/)?.[1];
    } catch {
      /* segue para a lista de falhas */
    }
  }
  if (videoId) {
    const clean = finalUrl.split("?")[0];
    out[id] = { embedId: videoId, canonicalUrl: idFrom(clean) ? clean : `https://www.tiktok.com/@/video/${videoId}` };
    console.log(`✓ ${id}  ${videoId}  ${out[id].canonicalUrl}`);
  } else {
    failed.push({ id, url });
    console.log(`✗ ${id}  não resolvido  ${url}`);
  }
}

await writeFile(new URL("../src/data/videos.resolved.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`\n${Object.keys(out).length} resolvidos, ${failed.length} precisam de correção manual.`);
for (const f of failed) console.log(`  - ${f.id}: ${f.url}  → abra no navegador e cole a URL completa em canonicalUrl (src/data/videos.ts)`);
console.log("Agora rode: npm run build:html");
