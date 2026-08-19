import React from 'react';

export default function Post2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />
      
      {/* Ultra-subtle background grid */}
      <pattern id="grid-2" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f0f0f" strokeWidth="1" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-2)" />

      {/* Abstract Automation Nodes - TOP RIGHT */}
      <g transform="translate(280, 70)">
        {/* Central Hub */}
        <rect x="-30" y="-30" width="60" height="60" rx="16" fill="none" stroke="#262626" strokeWidth="2" transform="rotate(45)" />
        <circle cx="0" cy="0" r="8" fill="#1f1f1f" />
        
        {/* Orbiting Nodes */}
        <circle cx="-60" cy="-20" r="12" fill="none" stroke="#1f1f1f" strokeWidth="2" />
        <path d="M -48 -16 L -20 -8" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="2 4" />
        
        <circle cx="50" cy="-40" r="16" fill="none" stroke="#1f1f1f" strokeWidth="2" />
        <path d="M 18 -18 L 36 -28" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="2 4" />
        
        <circle cx="40" cy="40" r="8" fill="none" stroke="#1f1f1f" strokeWidth="2" />
        <path d="M 16 16 L 34 34" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="2 4" />

        {/* Energy Pulse */}
        <circle cx="-60" cy="-20" r="4" fill="#222222" />
        <circle cx="50" cy="-40" r="6" fill="#222222" />
      </g>
    </svg>
  );
}
