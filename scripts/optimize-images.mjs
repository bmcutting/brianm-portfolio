import sharp from "sharp"
import { readdir, stat, rm } from "node:fs/promises"
import { join, extname, basename } from "node:path"

const IMAGES_DIR = "src/assets/images"
const PUBLIC_DIR = "public"

const targets = {
  "car.jpg": 900,
  "programming.jpg": 900,
  "edgeComputing.jpg": 900,
  "BrianPic.png": 700,
  "b1English.png": 900,
  "efset.png": 900,
  "foundationalCS.png": 900,
  "frontEnd.png": 900,
  "responsiveWeb.png": 900,
}

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + " KB"

let before = 0
let after = 0

for (const file of await readdir(IMAGES_DIR)) {
  const width = targets[file]
  if (!width) continue

  const src = join(IMAGES_DIR, file)
  const out = join(IMAGES_DIR, basename(file, extname(file)) + ".webp")

  const sizeBefore = (await stat(src)).size
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  const sizeAfter = (await stat(out)).size

  before += sizeBefore
  after += sizeAfter
  console.log(`${file.padEnd(24)} ${kb(sizeBefore)} -> ${kb(sizeAfter)}`)
  await rm(src)
}

const favSrc = join(PUBLIC_DIR, "favicon.png")
const favBefore = (await stat(favSrc)).size
await sharp(favSrc)
  .resize({ width: 180 })
  .png({ compressionLevel: 9, palette: true })
  .toFile(join(PUBLIC_DIR, "favicon-tmp.png"))
before += favBefore

const ogSrc = "src/assets/og-banner-source.png"
const ogBefore = (await stat(ogSrc)).size
const { width: ogW, height: ogH } = await sharp(ogSrc).metadata()
const cropWidth = 1420
const cropHeight = Math.round((cropWidth * 630) / 1200)
await sharp(ogSrc)
  .extract({
    left: ogW - cropWidth - 40,
    top: Math.round((ogH - cropHeight) / 2) + 18,
    width: cropWidth,
    height: cropHeight,
  })
  .resize(1200, 630)
  .jpeg({ quality: 88 })
  .toFile(join(PUBLIC_DIR, "og-image.jpg"))
const ogAfter = (await stat(join(PUBLIC_DIR, "og-image.jpg"))).size
before += ogBefore
after += ogAfter
console.log(
  `${"og-banner-source.png".padEnd(24)} ${kb(ogBefore)} -> ${kb(ogAfter)}  (og-image.jpg 1200x630)`
)

console.log("\nTOTAL " + kb(before) + " -> " + kb(after))
