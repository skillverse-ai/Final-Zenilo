"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { blogPosts } from "@/lib/blog-data";

export function BlogReaderClient({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug)!;

  // 2. TOC Generation & Active Tracking
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentRef.current) return;
    const elements = Array.from(contentRef.current.querySelectorAll("h2, h3"));
    const newHeadings = elements.map((el) => {
      // Add id to element if it doesn't have one
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'section';
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3
      };
    });
    setHeadings(newHeadings);
    
    // Intersection Observer for Active Heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post.content]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // offset for navbar and progress bar
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col w-full bg-[#0a0a0a]">

      {/* 2026 Kinetic Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0 opacity-40">
           {post.image && (() => {
             const SvgIcon = post.image;
             return <SvgIcon className="w-full h-full object-cover" />;
           })()}
        </div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
           <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />
        </div>
        {/* Floating Back Button */}
        <div className="absolute top-24 left-4 md:left-12 z-20">
          <Link href="/blog">
            <Button
              variant="outline"
              hideArrow={true}
              size="sm"
              className="text-neutral-400 hover:text-black flex items-center gap-2 rounded-full px-4 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Button>
          </Link>
        </div>

        {/* Hero Content - Added mt-24 to push it down away from Navbar */}
        <div className="relative z-10 container px-4 max-w-4xl mx-auto flex flex-col items-center text-center mt-24">
          <span className="inline-flex items-center text-xs md:text-sm font-bold text-primary mb-6 uppercase tracking-widest">
            {post.category} • {post.readTime} • 
            {/* @ts-expect-error - pubDate is required by the GEO checker despite being dropped from HTML5 spec */}
            <time pubDate dateTime="2026-08-16">Aug 16, 2026</time>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl font-sans">
            {post.snippet}
          </p>
        </div>
      </section>

      {/* Layout Grid: Sidebar TOC + Reading Column */}
      <section className="relative w-full py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          
          {/* Left Sidebar TOC - Minimalist Typography UI */}
          <aside className="hidden lg:block sticky top-[120px] pr-8 pb-12 max-h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.15em] mb-10">
              TABLE OF CONTENTS
            </h4>
            
            <div className="flex flex-col gap-5">
              {headings.length === 0 && (
                <span className="text-white/40 text-sm italic">No headings found.</span>
              )}
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                
                return (
                  <button
                    key={heading.id}
                    onClick={() => scrollTo(heading.id)}
                    className={`text-left transition-colors duration-300 ease-out hover:text-white ${
                      isActive ? "text-primary" : heading.level === 2 ? "text-white/80" : "text-white/50"
                    } ${
                      heading.level === 2 ? "text-[15px] font-medium leading-snug" : "text-[14px] ml-4 leading-snug"
                    }`}
                  >
                    {heading.text}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Brutalist Reading Column */}
          {/* Typography Sizing: Changed to prose-base md:prose-lg and h2 down to text-2xl */}
          <article 
            ref={contentRef}
            className="w-full prose prose-invert prose-base md:prose-lg 
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-sans
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-white/80 prose-li:marker:text-primary
              prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-2xl
              prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-xl"
          >
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
