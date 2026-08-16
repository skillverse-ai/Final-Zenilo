"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/blog-data";
import { useRouter } from "next/navigation";

function BlogCard({ 
  post, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  post: typeof blogPosts[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const router = useRouter();
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
      onClick={() => router.push(`/blog/${post.slug}`)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 1.02, 0.73, 1] }}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-all duration-700 ease-out cursor-pointer",
        post.size,
        isDimmed ? "opacity-30 blur-[2px] scale-[0.98]" : "opacity-100 blur-0 scale-100",
        index === 0 ? "min-h-[400px] md:min-h-[500px]" : "min-h-[300px]"
      )}
    >
      {/* 2026 Spatial Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-500 group-hover:opacity-100"
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

      {/* Abstract Background / Image Placeholder */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
        {post.image && (() => {
          const SvgIcon = post.image;
          return <SvgIcon className="w-full h-full object-cover" />;
        })()}
      </div>

      {/* Top Left Primary Glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#ccff00]/25 blur-[80px] rounded-full pointer-events-none z-10" />
      
      {/* Heavy noise texture overlay for the "Quiet Luxury" feel */}
      <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("/noise.svg")' }} />

      {/* Bottom Gradient for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col p-6 md:p-8 h-full justify-between">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
            {post.category}
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white group-hover:text-primary group-hover:border-primary/30 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-white/50 text-sm mb-3 font-sans">{post.readTime}</p>
          <h3 className={cn(
            "text-white font-bold tracking-tight mb-2 transition-all duration-500",
            index === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          )}>
            {post.title}
          </h3>
          <p className="text-white/60 text-sm md:text-base line-clamp-2">
            {post.snippet}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Blog() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="blog" className="relative w-full py-24 md:py-32 bg-black overflow-hidden flex justify-center">
      <div className="w-[95%] max-w-7xl mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase mb-4">
              Insights & Perspectives
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
          >
            Highly Recommended <span className="text-primary">Reads.</span>
          </motion.h2>
        </div>

        {/* 2026 Spatial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
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
