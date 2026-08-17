"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import TextAnimation from "@/components/ui/scroll-text";

const problems = [
  {
    title: "Low Conversion Rates",
    description: "Templates get you online, not customers. Visitors leave without a clear next step.",
    className: "md:row-span-2 min-h-[400px] lg:min-h-[500px]",
    visual: (
      <img 
        src="/images/problem-1.webp" 
        alt="Graph showing a conversion rates drop-off dashboard on a standard non-optimized website" 
        className="w-full h-full object-cover object-center opacity-80" 
      />
    )
  },
  {
    title: "Manual Bottlenecks",
    description: "Growth is constrained when every lead and follow-up requires your direct involvement.",
    className: "md:col-span-1 min-h-[250px] lg:min-h-[280px]",
    visual: (
      <img 
        src="/images/problem-2.webp" 
        alt="Task checklist dashboard demonstrating manual team bottlenecks and task delays" 
        className="w-full h-full object-cover object-center opacity-80" 
      />
    )
  },
  {
    title: "Disconnected Systems",
    description: "Fragmented tools lead to lost context, data silos, and delayed responses.",
    className: "md:col-span-1 min-h-[250px] lg:min-h-[280px]",
    visual: (
      <img 
        src="/images/problem-3.webp" 
        alt="UI mockups of multiple disconnected software tools showing data silos" 
        className="w-full h-full object-contain scale-[1.25] translate-x-12 translate-y-8 opacity-80" 
      />
    )
  },
];

function ProblemCard({ 
  problem, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  problem: typeof problems[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 1.02, 0.73, 1] }}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-out",
        problem.className,
        isDimmed ? "md:opacity-30 md:blur-[2px] md:scale-[0.98]" : "opacity-100 blur-0 scale-100"
      )}
    >
      {/* 2026 Spatial Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-500 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Abstract Background / Image */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
        {problem.visual}
      </div>
      
      {/* Heavy noise texture overlay for the "Quiet Luxury" feel */}
      <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />

      {/* Bottom Gradient for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col p-6 md:p-8 mt-auto gap-3">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2 transition-all duration-500">
            {problem.title}
          </h3>
          <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
            {problem.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Problem() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="problem" className="w-full bg-black py-24 border-y border-white/5 relative overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        <div className="flex flex-col space-y-4 mb-16 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary mb-4 tracking-widest uppercase">
              THE REALITY CHECK
            </div>
          </div>
          <TextAnimation
            as="h2"
            text="The Growth Bottlenecks."
            classname="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white normal-case"
            direction="up"
          />
          <TextAnimation
            as="p"
            text="You're doing the work of five people. Here's where your systems are quietly costing you deals."
            classname="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed normal-case"
            direction="up"
          />
        </div>

        {/* 2026 Liquid Spatial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={problem.title} 
              problem={problem} 
              index={index} 
              hoveredIndex={hoveredIndex} 
              setHoveredIndex={setHoveredIndex} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

