"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/ui/scroll-text";

const principles = [
  {
    title: "Systems before style",
    description: "We map your leads, tools, and workflows before a single page gets designed, so the site is built to fix a real bottleneck, not just fill a blank page.",
  },
  {
    title: "One build, not a handoff",
    description: "Website and automation are built in parallel by the same team. Nothing launches half-connected or waiting on 'phase two'.",
  },
  {
    title: "We stay on after launch",
    description: "Support & Optimize isn't an upsell we mention once. It's the last step of our process, for every client, every time.",
  },
];

function PrincipleCard({ 
  principle, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  principle: typeof principles[0];
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
        "group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-out p-8 min-h-[300px]",
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
              rgba(255,255,255,0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Heavy noise texture overlay for the "Quiet Luxury" feel */}
      <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary font-bold mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
          0{index + 1}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-4 transition-all duration-500">
            {principle.title}
          </h3>
          <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
            {principle.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-black py-24 pb-32 border-b border-white/5 relative overflow-hidden">
      {/* Premium Background Glow matching Problem section */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-6xl space-y-32 mt-16">

        {/* Part 1: Our Story / Hook */}
        <div className="flex flex-col space-y-8 max-w-4xl">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary mb-4 tracking-widest uppercase">
              OUR STORY
            </div>
          </div>
          <TextAnimation
            as="h1"
            text="We don't just design websites. We build the systems behind them."
            classname="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white normal-case"
            direction="up"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed normal-case">
              <strong className="text-neutral-200 font-semibold">In short:</strong> Zenlio is a web design and AI automation agency that treats your website as one part of a larger system, not the whole solution. We build the design, the automation, and the follow-through together, so leads get answered, work gets done, and none of it depends on you being online 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/5">
                  See Our Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Part 2: The Zenlio Story */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 border-t border-white/5"
        >
          <div className="md:col-span-5">
            <div className="inline-flex items-center text-sm font-bold text-primary mb-4 tracking-widest uppercase">
              THE ZENLIO STORY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Why we started building it this way.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              We kept running into the same problem, over and over, before people ever became clients: they'd already paid for a website. It looked fine. And they were still doing everything by hand — replying to leads at 11pm, copying details between five different tools, losing the deal to whoever called back first.
            </p>
            <p>
              <strong className="text-neutral-200">The website was never the problem. It just wasn't connected to anything.</strong>
            </p>
            <p>
              That's the gap Zenlio exists to close. We don't hand over a homepage and disappear — we build the operating system behind it: the routing, the follow-ups, the CRM, the systems that keep working on your business long after launch day.
            </p>
            <p>
              Zenlio is co-founded by Srishanth and Akhil, and grew out of hands-on work building automated lead-generation and outreach systems for real service businesses — dental clinics, real estate agencies, architects, interior designers, and law firms — before it became an agency in its own right. We build what we've already used ourselves.
            </p>
          </div>
        </motion.div>

        {/* Part 3: How We Think */}
        <div className="pt-16 border-t border-white/5">
          <div className="flex flex-col space-y-4 mb-16 text-center md:text-left">
            <div>
              <div className="inline-flex items-center text-sm font-bold text-primary mb-4 tracking-widest uppercase">
                HOW WE THINK
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
              Three things that shape every project.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <PrincipleCard 
                key={principle.title} 
                principle={principle} 
                index={index} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            ))}
          </div>
        </div>

        {/* Part 4: Who We Build For */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-white/5 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center text-sm font-bold text-primary mb-6 tracking-widest uppercase">
            WHO WE BUILD FOR
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            For businesses that live and die by their follow-through.
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Businesses that run on leads, clients, and consistent follow-through — where every unanswered inquiry is a lost customer, and every manual step is an hour you didn't get back.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
