const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../components/icons');

for (let i = 1; i <= 6; i++) {
  const tsxPath = path.join(iconsDir, `Post${i}Icon.tsx`);
  
  if (fs.existsSync(tsxPath)) {
    let content = fs.readFileSync(tsxPath, 'utf8');
    
    // Add preserveAspectRatio="xMidYMid slice" if not present
    if (!content.includes('preserveAspectRatio')) {
      content = content.replace('<svg xmlns="http://www.w3.org/2000/svg"', '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"');
      fs.writeFileSync(tsxPath, content);
    }
  }
}
