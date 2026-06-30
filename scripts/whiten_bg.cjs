/**
 * Converts a dark/black photo background to white using a border flood-fill.
 * Only background pixels connected to the image edges (and near-black) are
 * recolored, so dark parts of the machine (tires, etc.) are preserved.
 *
 * Usage: node scripts/whiten_bg.cjs <image1> [image2 ...]
 */
const sharp = require('sharp');
const path = require('path');

const THRESHOLD = Number(process.env.BG_THRESHOLD || 30); // max channel value to be considered "background black"

async function whiten(file) {
  const img = sharp(file);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const ch = info.channels; // 4 (RGBA)

  const isDark = (idx) => {
    const a = data[idx + 3];
    if (a < 20) return true; // transparent counts as background
    return (
      data[idx] < THRESHOLD &&
      data[idx + 1] < THRESHOLD &&
      data[idx + 2] < THRESHOLD
    );
  };

  const visited = new Uint8Array(W * H);
  const queue = [];

  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (visited[p]) return;
    const idx = p * ch;
    if (isDark(idx)) {
      visited[p] = 1;
      queue.push(p);
    }
  };

  for (let x = 0; x < W; x++) {
    pushIf(x, 0);
    pushIf(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    pushIf(0, y);
    pushIf(W - 1, y);
  }

  let count = 0;
  while (queue.length) {
    const p = queue.pop();
    const x = p % W;
    const y = (p - x) / W;
    const idx = p * ch;
    data[idx] = 255;
    data[idx + 1] = 255;
    data[idx + 2] = 255;
    data[idx + 3] = 255;
    count++;
    pushIf(x + 1, y);
    pushIf(x - 1, y);
    pushIf(x, y + 1);
    pushIf(x, y - 1);
  }

  const ext = path.extname(file).toLowerCase();
  let pipeline = sharp(data, { raw: { width: W, height: H, channels: ch } })
    .flatten({ background: '#ffffff' });

  if (ext === '.png') pipeline = pipeline.png();
  else if (ext === '.webp') pipeline = pipeline.webp();
  else pipeline = pipeline.jpeg({ quality: 92 });

  const out = await pipeline.toBuffer();
  require('fs').writeFileSync(file, out);
  console.log(`Whitened ${path.basename(file)} — ${count} background px -> white`);
}

(async () => {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('No files provided');
    process.exit(1);
  }
  for (const f of files) {
    try {
      await whiten(f);
    } catch (e) {
      console.error('ERR', f, e.message);
    }
  }
})();
