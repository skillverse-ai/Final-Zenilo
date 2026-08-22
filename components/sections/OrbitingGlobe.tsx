"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";
import { 
  SiZapier, 
  SiN8N, 
  SiSupabase, 
  SiGooglegemini, 
  SiMake, 
  SiFigma, 
  SiClaude 
} from "react-icons/si";
import { FaSlack } from "react-icons/fa6";

interface OrbitIcon {
  component?: React.ComponentType<any>;
  src?: string;
  color?: string;
  alt: string;
  angle: number;
}

interface Orbit {
  size: string;
  duration: number;
  icons: OrbitIcon[];
}

const orbits: Orbit[] = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 18,
    icons: [
      { component: SiSupabase, color: "#3ECF8E", alt: "Supabase", angle: -60 },
      { component: SiGooglegemini, color: "#8E75FF", alt: "Gemini", angle: 0 },
      { component: SiMake, color: "#EA157A", alt: "Make", angle: 60 },
    ],
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 24,
    icons: [
      { component: SiFigma, color: "#F24E1E", alt: "Figma", angle: 0 },
      { component: FaSlack, color: "#4A154B", alt: "Slack", angle: -90 },
    ],
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 30,
    icons: [
      { component: SiClaude, color: "#CC785C", alt: "Claude", angle: -60 },
      { component: SiZapier, color: "#FF4A00", alt: "Zapier", angle: 0 },
      { component: SiN8N, color: "#FF6D5A", alt: "n8n", angle: 60 },
    ],
  },
];

export function OrbitingCirclesGlobeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Unmount completely when scrolled far out of view (using a large margin so it mounts slightly before arriving)
  const isInView = useInView(sectionRef, { margin: "400px" });

  return (
    <section id="ecosystem" ref={sectionRef} className="w-full bg-background pt-10 pb-0 overflow-hidden relative">
      
      {/* Premium Background Glow (matching Problem section) */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      {/* Foreground SaaS Badge */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest drop-shadow-md">
          Seamless Integrations
        </div>
      </div>

      <div className="relative w-full h-110 md:h-160 overflow-hidden flex justify-center items-center">
        {/* Background Watermark Text */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
          {/* Crisp Metallic Outline Typography */}
          <h2 className="text-6xl sm:text-8xl md:text-[160px] lg:text-[200px] font-bold tracking-tighter leading-none select-none relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white/30 via-white/5 to-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
            ECOSYSTEM
          </h2>
        </div>

        <style>{`
          @keyframes orbit-cw {
            from { transform: rotate(var(--start-angle)) }
            to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
          }
          @keyframes orbit-ccw {
            from { transform: rotate(var(--start-angle)) }
            to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
          }
          @keyframes counter-cw {
            from { transform: rotate(var(--counter-offset, 0deg)) }
            to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
          }
          @keyframes counter-ccw {
            from { transform: rotate(var(--counter-offset, 0deg)) }
            to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
          }
        `}</style>

        {/* Wrapper to control visibility without unmounting */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700" 
          style={{ 
            opacity: isInView ? 1 : 0, 
            visibility: isInView ? "visible" : "hidden" 
          }}
        >
          {/* Center particle globe */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10 hidden md:block">
            <ParticleSphereAnimation />
          </div>

          {/* Orbiting rings */}
          {orbits.map((orbit, index) => {
            const isCW = index % 2 === 0;
            const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
            const counterAnim = isCW ? "counter-cw" : "counter-ccw";

            const allIcons = [
              ...orbit.icons,
              ...orbit.icons.map((ic) => ({
                ...ic,
                angle: ic.angle + 180,
                alt: `${ic.alt}-mirror`,
              })),
            ];

            return (
              <div
                key={index}
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border/40 ${orbit.size}`}
              >
                {allIcons.map((iconData, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center"
                    style={
                      {
                        "--start-angle": `${iconData.angle}deg`,
                        animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                        animationPlayState: isInView ? 'running' : 'paused'
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="p-3 sm:p-4 border border-border/60 rounded-full bg-neutral-900/90 shadow-lg -mt-8 relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
                      style={
                        {
                          "--counter-offset": `${-iconData.angle}deg`,
                          animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                          animationPlayState: isInView ? 'running' : 'paused'
                        } as React.CSSProperties
                      }
                    >
                      {iconData.component ? (
                        <iconData.component className="w-6 h-6 md:w-8 md:h-8" style={{ color: iconData.color || "white" }} />
                      ) : (
                        <img
                          src={iconData.src}
                          alt={iconData.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
