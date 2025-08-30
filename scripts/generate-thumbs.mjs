import sharp from "sharp";
import { glob } from "glob";
import fs from "fs/promises";
import path from "path";

const SRC_DIR = "../public/images/gallery/full-res";     // your originals
const OUT_DIR = "../public/images/gallery/thumbnails";          // output root

const variants = [
    { name: "thumb",  width: 320,  quality: 70 },
    { name: "2048w",  width: 2048, quality: 75 },
];

const formats = [
    { ext: "avif", options: (q) => ({ quality: q }) },
];

await fs.mkdir(OUT_DIR, { recursive: true });

const files = await glob(`${SRC_DIR}/**/*.{jpg,jpeg,png,HEIC}`, { nocase: true });

let processed = 0;
await Promise.all(
    files.map(async (srcPath) => {
        const rel = path.relative(SRC_DIR, srcPath);
        const base = path.parse(rel).name;          // file name without ext
        const dir  = path.dirname(rel);

        for (const v of variants) {
            for (const f of formats) {
                const outDir = path.join(OUT_DIR, v.name, dir);
                await fs.mkdir(outDir, { recursive: true });
                const outPath = path.join(outDir, `${base}.${f.ext}`);

                const pipeline = sharp(srcPath)
                    .rotate()                // honors EXIF orientation
                    .resize({ width: v.width, withoutEnlargement: true })
                    .withMetadata({ orientation: 1 }); // strips heavy metadata but keeps orientation tag normalized

                const opts = f.options(v.quality);
                if (f.ext === "avif") pipeline.avif(opts);
                if (f.ext === "webp") pipeline.webp(opts);
                if (f.ext === "jpg")  pipeline.jpeg(opts);

                await pipeline.toFile(outPath);
            }
        }
        processed++;
        if (processed % 10 === 0) console.log(`Processed ${processed}/${files.length}`);
    })
);

console.log(`Done! Generated variants: ${variants.map(v => v.name).join(", ")} in ${OUT_DIR}`);
