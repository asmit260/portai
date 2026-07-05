const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeFolder(dirPath, isAssets) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    const inputPath = path.join(dirPath, file);
    const basename = path.basename(file, ext);
    const outputPath = path.join(dirPath, `${basename}.webp`);

    const oldStats = fs.statSync(inputPath);
    const oldSizeKB = (oldStats.size / 1024).toFixed(1);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width > 800) {
        pipeline = pipeline.resize(800, null, { withoutEnlargement: true });
      }

      const tempPath = path.join(dirPath, `${basename}_temp.webp`);
      await pipeline.webp({ quality: 75, effort: 6 }).toFile(tempPath);

      const newStats = fs.statSync(tempPath);
      const newSizeKB = (newStats.size / 1024).toFixed(1);

      // Replace original/output
      if (inputPath !== outputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath); // remove .png/.jpg
      }
      if (fs.existsSync(outputPath) && outputPath !== tempPath) {
        fs.unlinkSync(outputPath);
      }
      fs.renameSync(tempPath, outputPath);

      console.log(`Optimized ${file} -> ${basename}.webp (${oldSizeKB} KB -> ${newSizeKB} KB)`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err.message);
    }
  }
}

async function run() {
  console.log('--- Optimizing assets folder ---');
  await optimizeFolder(path.join(__dirname, 'assets'), true);
  console.log('\n--- Optimizing img folder ---');
  await optimizeFolder(path.join(__dirname, 'img'), false);
  console.log('\nAll images converted to WebP and compressed for lightning fast loading!');
}

run();
