const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/navbar-logo.png');
const outputPath = path.join(__dirname, '../app/icon.png');

async function processImage() {
  try {
    await sharp(inputPath)
      .trim() // Removes transparent padding
      .resize({
        width: 512,
        height: 512,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath);
    console.log('Favicon cropped and saved to', outputPath);
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
