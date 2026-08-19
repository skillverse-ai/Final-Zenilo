import React from 'react';

export default function Post4Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />

      {/* Ultra-subtle dots */}
      <pattern id="grid-4" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1" fill="#111111" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-4)" />

      {/* Isometric Pricing Layers - TOP RIGHT */}
      <g transform="translate(280, 90) scale(0.85)">
        {/* Layer 1 (Bottom) */}
        <path d="M 0 40 L 80 0 L 0 -40 L -80 0 Z" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="2" />
        
        {/* Layer 2 (Middle) */}
        <path d="M 0 10 L 80 -30 L 0 -70 L -80 -30 Z" fill="#0d0d0d" stroke="#262626" strokeWidth="2" />
        
        {/* Layer 3 (Top) */}
        <path d="M 0 -20 L 80 -60 L 0 -100 L -80 -60 Z" fill="#111111" stroke="#333333" strokeWidth="2" />
        
        {/* Connecting Vertical Pillars */}
        <line x1="0" y1="-20" x2="0" y2="40" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="-80" y1="-60" x2="-80" y2="0" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80" y1="-60" x2="80" y2="0" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Cost Node Indicators */}
        <circle cx="0" cy="-20" r="4" fill="#222222" />
        <circle cx="0" cy="10" r="3" fill="#1a1a1a" />
      </g>
    </svg>
  );
}
