/**
 * Prepares a machine photo taken from a datasheet for the app:
 * - transparent areas become white (flattened onto a white background)
 * - near-white margins are trimmed, then an even white border is added
 * - the image is scaled to fit within 1600x1200 (never enlarged)
 * - saved as a high-quality JPEG
 *
 * Usage: node scripts/prepare_machine_photo.cjs <input> <output.jpg>
 */
const sharp = require('sharp');

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1200;
const BORDER_RATIO = 0.05; // white border around the machine, relative to the longest side
const CONTENT_THRESHOLD = 40; // how far from pure white a pixel must be to count as machine

/** Bounding box of pixels that are clearly not background white (ignores faint shadows and noise). */
function contentBox(data, width, height, channels) {
  let left = width, top = height, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const darkest = Math.min(data[i], data[i + 1], data[i + 2]);
      if (darkest < 255 - CONTENT_THRESHOLD) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) return { left: 0, top: 0, width, height };
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function prepare(input, output) {
  const { data, info } = await sharp(input)
    .flatten({ background: '#ffffff' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const box = contentBox(data, info.width, info.height, info.channels);
  const border = Math.round(Math.max(box.width, box.height) * BORDER_RATIO);

  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .extract(box)
    .extend({ top: border, bottom: border, left: border, right: border, background: '#ffffff' })
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${output}: ${meta.width}x${meta.height}`);
}

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/prepare_machine_photo.cjs <input> <output.jpg>');
  process.exit(1);
}
prepare(input, output).catch((err) => {
  console.error(err);
  process.exit(1);
});
