import React from 'react';

export default function Post1Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />
      
      {/* Ultra-subtle background grid */}
      <pattern id="grid-1" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1" fill="#111111" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-1)" />

      {/* Floating Wireframe - TOP RIGHT */}
      <g transform="translate(240, 40) scale(0.8)">
        <rect x="0" y="0" width="160" height="120" rx="8" fill="none" stroke="#262626" strokeWidth="2" />
        <line x1="0" y1="30" x2="160" y2="30" stroke="#262626" strokeWidth="2" />
        <circle cx="20" cy="15" r="4" fill="#1f1f1f" />
        <circle cx="36" cy="15" r="4" fill="#1f1f1f" />
        <circle cx="52" cy="15" r="4" fill="#1f1f1f" />
        
        {/* Content Blocks */}
        <rect x="20" y="50" width="70" height="8" rx="4" fill="#141414" />
        <rect x="20" y="70" width="100" height="4" rx="2" fill="#111111" />
        <rect x="20" y="82" width="80" height="4" rx="2" fill="#111111" />
      </g>
      
      {/* Decorative lines bleeding off edge */}
      <path d="M 300 0 L 300 80" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 400 120 L 360 120" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );
}
