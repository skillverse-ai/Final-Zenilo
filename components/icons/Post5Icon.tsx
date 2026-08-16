import React from 'react';

export default function Post5Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />
      
      {/* Background Architectural Grid */}
      <pattern id="grid-5" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0a0a0a" strokeWidth="1" />
        <circle cx="50" cy="50" r="1" fill="#111111" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-5)" />

      {/* Intersection Venn/Rings - TOP RIGHT */}
      <g transform="translate(280, 80)">
        {/* Ring 1 (Top) */}
        <circle cx="0" cy="-20" r="35" fill="none" stroke="#262626" strokeWidth="2" />
        
        {/* Ring 2 (Bottom Left) */}
        <circle cx="-25" cy="20" r="35" fill="none" stroke="#1f1f1f" strokeWidth="2" />
        
        {/* Ring 3 (Bottom Right) */}
        <circle cx="25" cy="20" r="35" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        
        {/* Center Intersection Node */}
        <circle cx="0" cy="6" r="6" fill="#333333" />
        
        {/* Outer connection nodes */}
        <circle cx="0" cy="-55" r="4" fill="#111111" stroke="#262626" strokeWidth="1.5" />
        <circle cx="-60" cy="20" r="4" fill="#111111" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="60" cy="20" r="4" fill="#111111" stroke="#1a1a1a" strokeWidth="1.5" />
      </g>
    </svg>
  );
}