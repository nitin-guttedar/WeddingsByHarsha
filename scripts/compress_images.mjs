import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Disable sharp cache so it releases all file locks immediately
sharp.cache(false);

const assetsDir = './assets';

async function processDirectory(dir) {
  let statsList = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      statsList = statsList.concat(await processDirectory(fullPath));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      const originalStats = fs.statSync(fullPath);
      const originalSize = originalStats.size;

      try {
        // Read file into memory buffer to avoid Windows file locking
        const inputBuffer = fs.readFileSync(fullPath);
        const metadata = await sharp(inputBuffer).metadata();

        // Target: Max 1600px width/height for web display
        const MAX_DIM = 1600;
        let resizeOptions = null;
        if (metadata.width > MAX_DIM || metadata.height > MAX_DIM) {
          if (metadata.width >= metadata.height) {
            resizeOptions = { width: MAX_DIM };
          } else {
            resizeOptions = { height: MAX_DIM };
          }
        }

        let pipeline = sharp(inputBuffer);
        if (resizeOptions) {
          pipeline = pipeline.resize(resizeOptions);
        }

        const optimizedBuffer = await pipeline
          .jpeg({
            quality: 82,
            progressive: true,
            mozjpeg: true
          })
          .toBuffer();

        if (optimizedBuffer.length < originalSize) {
          // Write safely
          fs.writeFileSync(fullPath, optimizedBuffer);
          const newSize = optimizedBuffer.length;
          statsList.push({
            file: fullPath.replace(/\\/g, '/'),
            originalKb: Math.round(originalSize / 1024),
            newKb: Math.round(newSize / 1024),
            savedPercent: Math.round(((originalSize - newSize) / originalSize) * 100),
            dimensions: `${metadata.width}x${metadata.height} -> ${resizeOptions ? (resizeOptions.width || resizeOptions.height) + 'px' : 'kept'}`
          });
        } else {
          statsList.push({
            file: fullPath.replace(/\\/g, '/'),
            originalKb: Math.round(originalSize / 1024),
            newKb: Math.round(originalSize / 1024),
            savedPercent: 0,
            dimensions: `${metadata.width}x${metadata.height} (optimal)`
          });
        }
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
  return statsList;
}

console.log('Starting buffer-based image compression...');
const results = await processDirectory(assetsDir);

let totalOriginal = 0;
let totalNew = 0;

results.forEach(r => {
  totalOriginal += r.originalKb;
  totalNew += r.newKb;
  console.log(`${r.file}: ${r.originalKb}KB -> ${r.newKb}KB (-${r.savedPercent}%) [${r.dimensions}]`);
});

console.log('----------------------------------------------------');
console.log(`Original Total: ${(totalOriginal / 1024).toFixed(2)} MB`);
console.log(`Optimized Total: ${(totalNew / 1024).toFixed(2)} MB`);
console.log(`Total Reduction: -${Math.round(((totalOriginal - totalNew) / totalOriginal) * 100)}%`);
