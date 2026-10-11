// Baixa a foto oficial (og:image) de cada produto da loja Olway para public/products/
// e grava src/data/products.resolved.json.  Uso: npm run fetch:products
import { readFile, writeFile, mkdir } from "node:fs/promises";

const src = await readFile(new URL("../src/data/products.ts", import.meta.url), "utf8");
const items = [...src.matchAll(/slug: "([^"]+)"[^}]*?url: "([^"]+)"/g)].map((m) => ({ slug: m[1], url: m[2] }));
await mkdir(new URL("../public/products/", import.meta.url), { recursive: true });

const out = {};
for (const { slug, url } of items) {
  try {
    const html = await (await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } })).text();
    let img = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i)?.[1];
    if (!img) throw new Error("og:image não encontrada");
    if (img.startsWith("//")) img = "https:" + img;
    const res = await fetch(img);
    if (!res.ok) throw new Error(`imagem ${res.status}`);
    const ext = (res.headers.get("content-type") ?? "").includes("png") ? "png" : res.headers.get("content-type")?.includes("webp") ? "webp" : "jpg";
    const file = `${slug}.${ext}`;
    await writeFile(new URL(`../public/products/${file}`, import.meta.url), Buffer.from(await res.arrayBuffer()));
    out[slug] = { image: `/products/${file}` };
    console.log(`✓ ${slug} → public/products/${file}`);
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message} (${url})`);
  }
}
await writeFile(new URL("../src/data/products.resolved.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`\n${Object.keys(out).length}/${items.length} fotos baixadas. Agora rode: npm run build:html`);
