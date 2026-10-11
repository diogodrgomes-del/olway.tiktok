"""Embute as imagens de public/brand no HTML único (data URIs)."""
import base64, pathlib
html_path = pathlib.Path("dist-html/index.html")
html = html_path.read_text(encoding="utf-8")
types = {".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".png": "image/png"}
for f in pathlib.Path("public/brand").iterdir():
    ref = f"/brand/{f.name}"
    if ref in html:
        uri = f"data:{types[f.suffix]};base64," + base64.b64encode(f.read_bytes()).decode()
        html = html.replace(ref, uri)
html_path.write_text(html, encoding="utf-8")
pathlib.Path("olway-creator-hub.html").write_text(html, encoding="utf-8")
print("ok", len(html) // 1024, "KB")
