// Compress your real photos before using them.
// 1) npm i -D sharp      2) add to package.json scripts:  "images": "node scripts/optimize-images.mjs"
// 3) put original photos in /raw-images and run: npm run images
// Output: /public/images/<name>.webp (max 800px wide, usually 40-90 KB).
// Then use "/images/<name>.webp" as the item's image in menuData.js.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const IN = "raw-images";
const OUT = "public/images";
await mkdir(OUT, { recursive: true });

for (const file of await readdir(IN)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = path.parse(file).name.toLowerCase().replace(/\s+/g, "-");
  await sharp(path.join(IN, file))
    .rotate() // respect phone camera orientation
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log("done:", name);
}
