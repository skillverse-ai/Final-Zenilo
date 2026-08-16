"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";

const navItems = [
  { name: "Problem", href: "/#problem" },
  { name: "Features", href: "/#services" },
  { name: "Process", href: "/#solution" },
  { name: "Work", href: "/#testimonials" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "FAQs", href: "/#faq" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const isBlogReader = pathname?.startsWith("/blog/");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/", "");
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -80 });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0); // Scroll to the absolute top smoothly
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/10 relative overflow-hidden">

        {/* Global Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none z-0">
          <motion.div
            className="h-full bg-primary origin-left"
            style={{ scaleX }}
          />
        </div>

        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="relative z-10 flex items-center pl-2">
          <img src="/navbar-logo.png" alt="Zenlio" className="h-8 w-auto object-contain shrink-0 scale-[1.8] translate-x-[-14px] translate-y-[18px]" />
          <span className="font-[family-name:var(--font-new-order)] font-bold text-3xl leading-none tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-[#F4F4EC] to-neutral-400 translate-y-[0px] -ml-1">Zenlio</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-medium font-sans text-foreground/80 hover:text-foreground transition-colors"
            >
              <span className="relative z-10">{item.name}</span>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-muted rounded-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4 relative z-10">
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6 font-semibold font-sans">
              Contact Us
            </Button>
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
