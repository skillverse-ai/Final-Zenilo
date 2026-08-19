"use client";

import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent/CookiePreferencesButton";
import { MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ZenlioLogo = () => (
  <svg className="w-16 h-10 select-none" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="silver-top" x1="20" y1="16" x2="58" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f5f5f7" />
        <stop offset="100%" stopColor="#a1a1aa" />
      </linearGradient>
      <linearGradient id="silver-bottom" x1="42" y1="22" x2="80" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="60%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
    </defs>
    {/* Top part */}
    <path d="M20 16h32l6 12H46l-3-6H23z" fill="url(#silver-top)" />
    {/* Bottom part */}
    <path d="M80 34H48l-6-12h12l3 6h23z" fill="url(#silver-bottom)" />
  </svg>
);

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState("auto");
  const [isDesktop, setIsDesktop] = useState(false);

  const lenis = useLenis();
  const pathname = usePathname();

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

  useEffect(() => {
    // Dynamic height calculation so the spacer div matches the footer perfectly
    if (footerRef.current) {
      setFooterHeight(`${footerRef.current.offsetHeight}px`);
    }
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => {
      if (footerRef.current) {
        setFooterHeight(`${footerRef.current.offsetHeight}px`);
      }
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Keep this empty or remove it if not needed, but we don't need GSAP animations anymore.
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{
        clipPath: isDesktop ? "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" : "none",
        height: isDesktop ? footerHeight : "auto"
      }}
    >
      <footer ref={footerRef} className={`${isDesktop ? "fixed bottom-0 left-0" : "relative"} w-full bg-black text-foreground border-t border-neutral-900 pt-6 pb-4 font-[family-name:var(--font-grift)] flex flex-col justify-end`}>
        <div ref={contentRef} className="container px-4 md:px-6 mx-auto">
          {/* Top Section: Brand Info + 4 Link Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-2">
            
            {/* Brand Info (Left Pane) - Spans 4 cols on large screens */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <Link href="/" onClick={handleLogoClick} className="inline-block transition-opacity hover:opacity-90">
                <span className="font-[family-name:var(--font-chillax)] text-3xl font-[700] tracking-[-5px] bg-clip-text text-transparent bg-gradient-to-b from-[#F4F4EC] to-[#52525b]">
                  Zenlio
                </span>
              </Link>
              <p className="text-sm text-neutral-400 max-w-sm font-sans leading-relaxed">
                Empowering businesses with custom websites, intelligent AI automation, and scalable systems designed for growth.
              </p>
              <a href="mailto:contact@zenlio.agency" className="text-sm text-neutral-400 hover:text-primary transition-colors flex items-center gap-2 mt-1 font-sans">
                <MailIcon className="w-4 h-4" />
                contact@zenlio.agency
              </a>
            </div>
            
            {/* Link Columns (Right Pane) - Spans 8 cols on large screens */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              
              {/* Col 1: Home */}
              <div className="flex flex-col items-start">
                <h3 className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider">Home</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#problem" onClick={(e) => handleSmoothScroll(e, "/#problem")} className="hover:text-white text-neutral-400 transition-colors">Problem</Link></li>
                  <li><Link href="/#services" onClick={(e) => handleSmoothScroll(e, "/#services")} className="hover:text-white text-neutral-400 transition-colors">Features</Link></li>
                  <li><Link href="/#solution" onClick={(e) => handleSmoothScroll(e, "/#solution")} className="hover:text-white text-neutral-400 transition-colors">Process</Link></li>
                  <li><Link href="/#testimonials" onClick={(e) => handleSmoothScroll(e, "/#testimonials")} className="hover:text-white text-neutral-400 transition-colors">Work</Link></li>
                  <li><Link href="/#pricing" onClick={(e) => handleSmoothScroll(e, "/#pricing")} className="hover:text-white text-neutral-400 transition-colors">Pricing</Link></li>
                  <li><Link href="/#faq" onClick={(e) => handleSmoothScroll(e, "/#faq")} className="hover:text-white text-neutral-400 transition-colors">FAQs</Link></li>
                </ul>
              </div>

              {/* Col 2: About */}
              <div className="flex flex-col items-start">
                <h3 className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider">About</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="hover:text-white text-neutral-400 transition-colors">Blog</Link></li>
                </ul>
              </div>

              {/* Col 3: Contact */}
              <div className="flex flex-col items-start">
                <h3 className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/contact" className="hover:text-white text-neutral-400 transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Col 4: Legal */}
              <div className="flex flex-col items-start">
                <h3 className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/terms" className="hover:text-white text-neutral-400 transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-white text-neutral-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/cookies" className="hover:text-white text-neutral-400 transition-colors">Cookie Policy</Link></li>
                  <li><Link href="/data-rights" className="hover:text-white text-neutral-400 transition-colors">Data Rights Portal</Link></li>
                  <li><CookiePreferencesButton className="hover:text-white text-neutral-400 transition-colors text-left" /></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Middle Section: Giant Fading "Zenlio" Text Logo */}
          <div ref={giantTextRef} className="w-full flex justify-center overflow-hidden mb-2 select-none">
            <h2 className="text-[20vw] font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-chillax)] bg-clip-text text-transparent bg-gradient-to-b from-[#ccff00]/[.55] via-[#ccff00]/[.25] to-transparent pr-[2vw]">
              Zenlio
            </h2>
          </div>

          {/* Bottom Section: Separator + Circle Logo Badge + Copyright */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-[#ccff00] flex items-center justify-center overflow-hidden shrink-0 bg-[#171717]">
                 <img src="/footer-logo.png" alt="Zenlio brand emblem" className="w-full h-full object-cover scale-[1.05]" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 text-xs text-neutral-500 gap-1 text-center sm:text-left">
              <span>© {new Date().getFullYear()} Zenlio. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span>Updated: August 2026</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
