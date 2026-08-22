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
    <>
      {/* Global Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 pointer-events-none z-[100]">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ scaleX }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[95%] max-w-5xl"
      >
        <div className="flex items-center justify-between px-6 py-3 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/10 relative overflow-visible">

        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="relative z-10 flex items-center pl-2">
          <img src="/navbar-logo.png" alt="Zenlio Agency logo wordmark" className="h-8 w-auto object-contain shrink-0 scale-[1.8] translate-x-[-14px] translate-y-[18px]" />
          <span className="font-[family-name:var(--font-chillax)] font-[720] text-3xl leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#F4F4EC] to-neutral-600 translate-y-[0px] -ml-1">Zenlio</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
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
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 rounded-[20px] border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl p-2 flex flex-col gap-1 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={(e) => handleSmoothScroll(e, child.href)}
                          className="px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-[15px] transition-all flex items-center gap-2"
                        >
                          {child.icon && <child.icon className="w-4 h-4 opacity-50" />}
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
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6 font-semibold font-sans">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile/Tablet Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden p-2 text-foreground/80 hover:text-white transition-colors relative z-50 rounded-full bg-white/5 border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile/Tablet Dropdown Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-2 w-full rounded-3xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col p-6 z-40 relative"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        setIsOpen(false);
                        handleSmoothScroll(e, item.href!);
                      }}
                      className="px-4 py-3 text-base font-semibold text-foreground/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                        className="flex items-center justify-between px-4 py-3 text-base font-semibold text-foreground/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.name ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === item.name && item.children && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-1 px-4 pl-8 py-2 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={(e) => {
                                  setIsOpen(false);
                                  handleSmoothScroll(e, child.href);
                                }}
                                className="py-2 text-sm font-medium text-foreground/60 hover:text-white transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
              <div className="border-t border-white/5 pt-4 mt-2">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full block">
                  <Button size="lg" className="w-full rounded-xl font-bold font-sans">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
