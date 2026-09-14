"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Info, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";

type NavItem = {
  name: string;
  href?: string;
  children?: { name: string; href: string; icon?: React.ElementType }[];
};

const navItems: NavItem[] = [
  { name: "Problem", href: "/#problem" },
  { name: "Features", href: "/#services" },
  { name: "Process", href: "/#solution" },
  { name: "Work", href: "/#testimonials" },
  { name: "Pricing", href: "/#pricing" },
  {
    name: "Company",
    children: [
      { name: "About", href: "/about", icon: Info },
      { name: "Blog", href: "/blog", icon: FileText },
      { name: "FAQs", href: "/faq", icon: HelpCircle },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const pathname = usePathname();
  const lenis = useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        lenis.scrollTo(0);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/10 relative overflow-visible">

        {/* Global Progress Bar */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full bg-[#ccff00] origin-left shadow-[0_0_8px_rgba(204,255,0,0.4)]"
              style={{ scaleX }}
            />
          </div>
        </div>

        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="relative z-10 flex items-center pl-2">
          <img src="/navbar-logo.png" alt="Zenlio Agency logo wordmark" className="h-8 w-auto object-contain shrink-0 scale-[1.8] translate-x-[-14px] translate-y-[18px]" />
          <span className="font-[family-name:var(--font-chillax)] font-[720] text-3xl leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#F4F4EC] to-neutral-600 translate-y-[0px] -ml-1">Zenlio</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href!)}
                  className="relative px-4 py-2 flex items-center text-sm font-medium font-sans text-foreground/80 hover:text-[#ccff00] transition-colors"
                >
                  <span className="relative z-10">{item.name}</span>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-[#ccff00]/10 rounded-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  className="relative px-4 py-2 flex items-center gap-1 text-sm font-medium font-sans text-foreground/80 hover:text-[#ccff00] transition-colors group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <ChevronDown className="relative z-10 w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-[#ccff00]/10 rounded-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              )}

              {/* Desktop Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[180px] rounded-[32px] border border-border/40 bg-[#0C0C0C]/80 backdrop-blur-xl shadow-lg shadow-black/10 p-3 flex flex-col gap-1 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={(e) => handleSmoothScroll(e, child.href)}
                          className="group px-4 py-3 text-[16px] font-medium text-white hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-[20px] transition-all flex items-center gap-3.5"
                        >
                          {child.icon && <child.icon className="w-5 h-5 text-[#ccff00] transition-colors" strokeWidth={1.5} />}
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 relative z-10">
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6 font-semibold font-sans">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile/Tablet Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex lg:hidden p-2 text-foreground/80 hover:text-white transition-colors relative z-50 rounded-full bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile/Tablet Dropdown Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mt-3 w-full rounded-[28px] border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col p-5 z-40 relative"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        setIsOpen(false);
                        handleSmoothScroll(e, item.href!);
                      }}
                      className="px-4 py-3 text-[15px] font-medium font-sans text-neutral-300 hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-full transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                        className="flex items-center justify-between px-4 py-3 text-[15px] font-medium font-sans text-neutral-300 hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-full transition-all duration-200 w-full group"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 text-neutral-400 group-hover:text-[#ccff00] transition-transform duration-300 ${mobileExpanded === item.name ? "rotate-180 text-[#ccff00]" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === item.name && item.children && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-1 pl-3 py-1 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={(e) => {
                                  setIsOpen(false);
                                  handleSmoothScroll(e, child.href);
                                }}
                                className="group px-4 py-2.5 text-[14px] font-medium font-sans text-neutral-300 hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-full transition-all flex items-center gap-3"
                              >
                                {child.icon && (
                                  <child.icon className="w-4 h-4 text-[#ccff00] transition-colors" strokeWidth={1.5} />
                                )}
                                <span>{child.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full block">
                  <Button size="lg" className="w-full rounded-full font-bold font-sans h-12 text-base shadow-lg shadow-[#ccff00]/15">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
