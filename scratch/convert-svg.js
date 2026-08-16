const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../components/icons');

for (let i = 1; i <= 6; i++) {
  const svgPath = path.join(iconsDir, `Post${i}Icon.svg`);
  const tsxPath = path.join(iconsDir, `Post${i}Icon.tsx`);
  
  if (fs.existsSync(svgPath)) {
    let content = fs.readFileSync(svgPath, 'utf8');
    
    // Replace <svg ...> with <svg ... {...props}>
    content = content.replace(/<svg([^>]+)>/, '<svg$1 {...props}>');
    
    // Convert attributes to camelCase for React (e.g., stop-color -> stopColor, stop-opacity -> stopOpacity)
    content = content.replace(/([a-z]+)-([a-z]+)=/g, (match, p1, p2) => {
      // standard exceptions like data-*, aria-* are fine, but in our SVG we only have standard SVG presentation attributes
      return `${p1}${p2.charAt(0).toUpperCase() + p2.slice(1)}=`;
    });
    
    // Some specific fixes: stroke-width -> strokeWidth, stroke-dasharray -> strokeDasharray, stroke-linecap -> strokeLinecap
    // Actually the regex above handles stop-color -> stopColor, stroke-width -> strokeWidth, etc perfectly!
    
    const tsxContent = `
import React from 'react';

export default function Post${i}Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${content}
  );
}
`;
    fs.writeFileSync(tsxPath, tsxContent.trim());
    fs.unlinkSync(svgPath); // delete old svg
  }
}
