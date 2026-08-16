const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../components/icons');

for (let i = 1; i <= 6; i++) {
  const tsxPath = path.join(iconsDir, `Post${i}Icon.tsx`);
  
  if (fs.existsSync(tsxPath)) {
    let content = fs.readFileSync(tsxPath, 'utf8');
    
    // Replace HTML comments <!-- comment --> with JSX comments {/* comment */}
    content = content.replace(/<!--(.*?)-->/g, '{/*$1*/}');
    
    fs.writeFileSync(tsxPath, content);
  }
}
