"use client";

import { motion } from "framer-motion";

const keywords = [
  "Web Design",
  "SEO",
  "Automation",
  "Lead Generation",
  "WhatsApp",
  "Payments",
  "Analytics",
  "Support"
];

// 4-point star separator
const StarSeparator = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0c0c0c] opacity-50 mx-8">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
  </svg>
);

export function TrustStrip() {
  // Duplicate array multiple times to ensure seamless looping on ultra-wide screens
  const doubledKeywords = [...keywords, ...keywords, ...keywords, ...keywords];

  return (
    <section className="w-full pt-2 pb-8 md:pb-12 overflow-hidden flex flex-col items-center relative bg-black -mt-4">

      {/* Straight, Colored Heading */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 mb-8 relative z-10">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#ccff00] pl-2">
          SYSTEMIZE YOUR BUSINESS
        </p>
      </div>

      {/* Tilted Container spanning 110vw to cover screen edges when rotated */}
      <div className="w-[110vw] flex flex-col -rotate-3 transform-gpu relative left-1/2 -translate-x-1/2">

        {/* The Marquee Strip */}
        <div className="w-full bg-[#ccff00] py-5 md:py-6 overflow-hidden flex flex-col items-center shadow-[0_0_30px_rgba(204,255,0,0.15)]">
          <div className="relative w-full overflow-hidden flex items-center">
            {/* Marquee Row */}
            <div className="flex w-fit">
              <motion.div
                animate={{ x: [0, "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: "linear",
                }}
                className="flex items-center w-max"
              >
                {doubledKeywords.map((word, idx) => (
                  <div key={`${word}-${idx}`} className="flex items-center">
                    <span className="text-[#0c0c0c] text-sm md:text-base font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                      {word}
                    </span>
                    <StarSeparator />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
