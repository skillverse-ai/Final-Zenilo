import React from 'react';

export default function Post6Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />
      
      {/* Background Architectural Grid */}
      <pattern id="grid-6" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0a0a0a" strokeWidth="1" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-6)" />

      {/* Funnel / Funnel Flow - TOP RIGHT */}
      <g transform="translate(300, 70)">
        {/* Horizontal Timeline Base */}
        <path d="M -80 0 L 80 0" stroke="#141414" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Filter Stage 1 */}
        <path d="M -60 -40 L -60 40" stroke="#1f1f1f" strokeWidth="2" />
        <rect x="-64" y="-15" width="8" height="30" rx="2" fill="#262626" />
        
        {/* Filter Stage 2 */}
        <path d="M 0 -30 L 0 30" stroke="#1f1f1f" strokeWidth="2" />
        <rect x="-4" y="-10" width="8" height="20" rx="2" fill="#262626" />
        
        {/* Final Conversion Stage */}
        <path d="M 60 -20 L 60 20" stroke="#1a1a1a" strokeWidth="2" />
        <circle cx="60" cy="0" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="60" cy="0" r="3" fill="#222222" />

        {/* Lead movement */}
        <circle cx="-30" cy="0" r="3" fill="#333333" />
        <circle cx="30" cy="0" r="3" fill="#333333" />
      </g>
    </svg>
  );
}