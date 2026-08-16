import React from 'react';

export default function Post3Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice" {...props}>
      <rect width="400" height="300" fill="#050505" />
      
      {/* Ultra-subtle background grid */}
      <pattern id="grid-3" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0c0c0c" strokeWidth="1" />
      </pattern>
      <rect width="400" height="300" fill="url(#grid-3)" />

      {/* CRM Flow - TOP RIGHT */}
      <g transform="translate(260, 80) scale(0.9)">
        {/* Source Node */}
        <rect x="-80" y="-30" width="60" height="60" rx="12" fill="#0a0a0a" stroke="#262626" strokeWidth="2" />
        <line x1="-65" y1="-5" x2="-35" y2="-5" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" />
        <line x1="-65" y1="5" x2="-45" y2="5" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" />
        
        {/* Connection Line */}
        <path d="M -20 0 C 10 0 20 -40 50 -40" fill="none" stroke="#1f1f1f" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M -20 0 C 10 0 20 40 50 40" fill="none" stroke="#1f1f1f" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="-20" y1="0" x2="60" y2="0" stroke="#1a1a1a" strokeWidth="1" />
        
        {/* Destination Nodes */}
        <circle cx="70" cy="-40" r="20" fill="none" stroke="#262626" strokeWidth="2" />
        <circle cx="70" cy="-40" r="6" fill="#141414" />
        
        <circle cx="70" cy="40" r="16" fill="none" stroke="#262626" strokeWidth="2" />
        <circle cx="70" cy="40" r="4" fill="#141414" />

        {/* Floating Data Packets */}
        <circle cx="20" cy="-25" r="3" fill="#333333" />
        <circle cx="25" cy="27" r="2" fill="#333333" />
      </g>
    </svg>
  );
}