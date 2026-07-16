#!/usr/bin/env node
/**
 * Generates localized OG images (1200×630) from gallery photos 1–4.
 * Requires: rsvg-convert, Python 3 + Pillow
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public");
const imgDir = join(root, "public/images/apartment");
const ids = ["794165989", "793706167", "793706263", "794165251"];

const locales = {
	en: {
		file: "og-image-en.jpg",
		subtitle: "Castel Mella, Brescia · Lombardy, Italy",
		cta: "Book direct",
	},
	it: {
		file: "og-image-it.jpg",
		subtitle: "Castel Mella, Brescia · Lombardia, Italia",
		cta: "Prenota diretto",
	},
	pl: {
		file: "og-image-pl.jpg",
		subtitle: "Castel Mella, Brescia · Lombardia, Włochy",
		cta: "Rezerwuj bezpośrednio",
	},
};

function escapeXml(s) {
	return s
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function badgeSvg(subtitle, cta) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="210" viewBox="0 0 1200 210">
  <rect x="0" y="0" width="1200" height="210" fill="#FFFFFF" fill-opacity="0.95"/>
  <g transform="translate(0, 24)">
    <g transform="translate(568, 0)">
      <rect x="0" y="0" width="21.33" height="18" fill="#009246"/>
      <rect x="21.33" y="0" width="21.34" height="18" fill="#FFFFFF"/>
      <rect x="42.67" y="0" width="21.33" height="18" fill="#CE2B37"/>
      <rect x="0" y="0" width="64" height="18" fill="none" stroke="#C8C2B8" stroke-width="1"/>
    </g>
    <text x="600" y="62" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="42" font-weight="700" letter-spacing="-0.8"
          xml:space="preserve"><tspan fill="#009246">Karting</tspan><tspan fill="#1A1A1A">&#160;Apartment</tspan></text>
    <text x="600" y="98" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="17" font-weight="400"
          fill="#6B6B6B">${escapeXml(subtitle)}</text>
    <text x="600" y="140" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="17" font-weight="700"
          fill="#009246">${escapeXml(cta)}</text>
  </g>
</svg>`;
}

const tmpDir = join(root, ".tmp-og");
mkdirSync(tmpDir, { recursive: true });

const collagePy = `
from PIL import Image, ImageDraw
from pathlib import Path
import sys

W, H = 1200, 630
N = 4
GAP = 2
TOP = 25
ids = ${JSON.stringify(ids)}
img_dir = Path(${JSON.stringify(imgDir)})
bar_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])

photo_total = W - GAP * (N - 1)
base_w = photo_total // N
extra = photo_total - base_w * N

def cover_crop(img, tw, th):
    src = img.convert("RGB")
    sw, sh = src.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    left, top = (nw - tw) // 2, (nh - th) // 2
    return resized.crop((left, top, left + tw, top + th))

canvas = Image.new("RGB", (W, H), (255, 255, 255))
widths = [base_w + (1 if i < extra else 0) for i in range(N)]
x = 0
for i, id_ in enumerate(ids):
    canvas.paste(cover_crop(Image.open(img_dir / f"{id_}.jpg"), widths[i], H), (x, 0))
    x += widths[i] + GAP

draw = ImageDraw.Draw(canvas)
cursor = 0
for i in range(N - 1):
    cursor += widths[i]
    draw.rectangle([cursor, 0, cursor + GAP - 1, H - 1], fill=(255, 255, 255))
    cursor += GAP

bar = Image.open(bar_path).convert("RGBA")
layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
layer.paste(bar, (0, TOP), bar)
final = Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")
# JPEG keeps OG well under 1 MB while looking sharp at 1200×630
final.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
print(out_path, out_path.stat().st_size)
`;

const pyFile = join(tmpDir, "compose.py");
writeFileSync(pyFile, collagePy);

for (const [locale, cfg] of Object.entries(locales)) {
	const svgPath = join(tmpDir, `badge-${locale}.svg`);
	const barPath = join(tmpDir, `bar-${locale}.png`);
	const outPath = join(outDir, cfg.file);
	writeFileSync(svgPath, badgeSvg(cfg.subtitle, cfg.cta));
	execFileSync("rsvg-convert", ["-w", "1200", svgPath, "-o", barPath]);
	execFileSync("python3", [pyFile, barPath, outPath], { stdio: "inherit" });
	console.log(`Generated ${cfg.file}`);
}

// Default alias → EN
execFileSync("cp", [
	join(outDir, "og-image-en.jpg"),
	join(outDir, "og-image.jpg"),
]);
console.log("Copied og-image-en.jpg → og-image.jpg");

// Remove legacy PNGs if present
for (const legacy of [
	"og-image.png",
	"og-image-en.png",
	"og-image-it.png",
	"og-image-pl.png",
]) {
	const p = join(outDir, legacy);
	if (existsSync(p)) {
		unlinkSync(p);
		console.log(`Removed ${legacy}`);
	}
}
