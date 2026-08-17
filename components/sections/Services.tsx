"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedArrow } from "@/components/ui/button";
import TextAnimation from "@/components/ui/scroll-text";

const services = [
  {
    title: "Website Design & Development",
    description: "Digital storefronts engineered for performance and conversion over pure aesthetics.",
    features: [
      "Turn traffic into booked calls instantly with load speeds that eliminate bounce rates."
    ],
    className: "col-span-1 md:col-span-3 min-h-[300px] lg:min-h-[400px]",
    visual: (
      <img 
        src="/images/website-laptop.webp" 
        alt="Website Design Laptop" 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain object-top scale-[1.06] -translate-y-6 opacity-80" 
      />
    )
  },
  {
    title: "AI Automation & Workflows",
    description: "Replacing repetitive manual labor with tireless, error-free systems.",
    features: [
      "Never miss a lead again with instant routing, recovering lost hours every single week."
    ],
    className: "col-span-1 md:col-span-3 min-h-[300px] lg:min-h-[400px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain object-top scale-105 -translate-y-6 opacity-80"
      >
        <source src="/videos/Integrations_Staggered_202608131740_gwr_video_mvp.mp4" type="video/mp4" />
      </video>
    )
  },
  {
    title: "Website & AI Automation",
    description: "Connecting your tech stack so data flows seamlessly across your business.",
    features: [
      "Create a single source of truth for client data while automating onboarding and fulfillment."
    ],
    className: "col-span-1 md:col-span-3 lg:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <img 
        src="/images/website-and-auto.webp" 
        alt="Website and AI Automation Dashboard" 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain object-top scale-105 opacity-80" 
      />
    )
  },
  {
    title: "SEO / Google",
    description: "Get found on Google. We improve your search visibility to drive organic, high-intent traffic.",
    features: [
      "Dominate search rankings and capture high-intent leads passively."
    ],
    className: "col-span-1 md:col-span-3 lg:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center scale-[1.25] -translate-y-16 opacity-80"
      >
        <source src="/videos/search_(1)_20260813101855.mp4" type="video/mp4" />
      </video>
    )
  },
  {
    title: "Custom Solutions",
    description: "Bespoke technical architecture for complex operational challenges.",
    features: [
      "Solve highly specific bottlenecks with scalable architecture built for rapid growth."
    ],
    className: "col-span-1 md:col-span-3 lg:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center scale-[1.25] -translate-y-20 opacity-80"
      >
        <source src="/videos/custom_20260812174233.mp4" type="video/mp4" />
      </video>
    )
  },
];

function ServiceCard({ 
  service, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  service: typeof services[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 1.02, 0.73, 1] }}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-out cursor-pointer",
        service.className,
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

      {/* Background Visual (Native Lazy Loaded) */}
      {service.visual && (
        <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
          {service.visual}
        </div>
      )}

      {/* Heavy noise texture overlay for the "Quiet Luxury" feel */}
      <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />

      {/* Bottom Gradient for text readability */}
      {service.visual && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
      )}

      {/* Content Area */}
      <div className="relative p-6 md:p-8 z-20 mt-auto flex flex-col">
        <h3 className="text-2xl font-bold text-neutral-100 mb-4 transition-all duration-500">{service.title}</h3>

        {service.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start text-sm text-neutral-300">
                <svg className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {service.features.length > 0 && (
          <div className="inline-flex items-center text-xs font-bold tracking-widest text-primary uppercase group/button hover:text-white transition-colors cursor-pointer w-fit">
            EXPLORE SPECS <AnimatedArrow className="ml-2" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="w-full bg-black py-24 border-b border-white/5 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">

        <div className="flex flex-col space-y-4 mb-20 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
              OUR SERVICES
            </div>
          </div>
          <TextAnimation
            as="h2"
            text="The Services"
            classname="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white normal-case"
            direction="up"
          />
          <TextAnimation
            as="p"
            text="We engineer custom ecosystems combining high-conversion design with ruthless automation."
            classname="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed normal-case"
            direction="up"
          />
        </div>

        {/* 2026 Liquid Spatial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-[25px] max-w-6xl mx-auto auto-rows-min">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
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
