"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import TextAnimation from "@/components/ui/scroll-text";
import {
  FaReact, FaSlack, FaWhatsapp, FaGoogle, FaInstagram, FaLinkedin
} from "react-icons/fa";
import {
  SiN8N, SiNextdotjs, SiWebflow, SiFramer, SiSupabase, SiHubspot
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

const iconConfigs = [
  { Icon: SiN8N, color: "#FF6D5A" },
  { Icon: RiOpenaiFill, color: "#000000" },
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiWebflow, color: "#4353FF" },
  { Icon: SiFramer, color: "#0055FF" },
  { Icon: SiSupabase, color: "#3ECF8E" },
  { Icon: SiHubspot, color: "#FF7A59" },
  { Icon: FaSlack, color: "#E01E5A" },
  { Icon: FaWhatsapp, color: "#25D366" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaLinkedin, color: "#0077B5" }
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Keep the animation mounted while near the viewport
  const isInView = useInView(sectionRef, { margin: "400px" });

  const orbitCount = 3;
  const orbitGap = 12; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-background text-foreground pt-28 lg:pt-32 pb-12 lg:pb-10 min-h-0 lg:min-h-[800px]">
      <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row justify-between relative z-10">

        {/* Left side: Heading and Text */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-xs font-medium tracking-widest uppercase text-muted-foreground"
            >
              SCALE YOUR BUSINESS WITH US
            </motion.div>

            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-sm font-semibold text-primary mb-4"
            >
              Updated August 2026
            </motion.div>
            <motion.h1
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none text-foreground"
            >
              Web design & automation systems that let your business <span className="text-primary">run itself.</span>
            </motion.h1>
            <motion.p
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed normal-case"
            >
              <strong>In short:</strong> Zenlio is a <Link href="/#services" className="underline hover:text-primary transition-colors">web design</Link> and AI automation agency building autonomous systems and high-performance websites for <Link href="/blog/website-vs-digital-system" className="underline hover:text-primary transition-colors">service professionals</Link>. We enable small teams to scale operations and handle more leads automatically, entirely without needing to <Link href="/contact" className="underline hover:text-primary transition-colors">expand their headcount</Link>.
            </motion.p>
          </div>

          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            style={{ willChange: "filter, transform, opacity" }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Contact Us
              </Button>
            </Link>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                See Our Pricing
              </Button>
            </Link>
          </motion.div>

          <div className="pt-8 border-t border-border">
            <motion.p
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest"
            >
              WHERE WE BUILD SYSTEMS THAT GROW
            </motion.p>
            <motion.p
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
              className="text-sm text-muted-foreground normal-case mt-2"
            >
              For businesses that depend on leads, clients and consistent follow-through.
            </motion.p>
            <motion.p
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              style={{ willChange: "filter, transform, opacity" }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
              className="text-sm text-muted-foreground normal-case mt-1"
            >
              Dental clinics, real estate agencies, architects, interior designers & law firms.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right side: Orbit animation (Absolute to right edge of page) */}
      <div className="absolute right-0 top-0 lg:-top-16 w-full lg:w-[65rem] h-[500px] lg:h-[900px] flex items-center justify-end overflow-hidden opacity-30 lg:opacity-100 z-0 pointer-events-none">
        {/* translate-x to crop exactly at the edge */}
        <div className="relative w-[32rem] h-[32rem] md:w-[45rem] md:h-[45rem] lg:w-[65rem] lg:h-[65rem] translate-x-[20%] md:translate-x-[25%] lg:translate-x-[50%] flex items-center justify-center">

          {/* Center Circle */}
          <div className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl overflow-hidden">
            <span className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 font-[family-name:var(--font-new-order)] font-bold text-3xl tracking-tight text-primary-foreground/90 origin-center">
              Zenlio
            </span>
          </div>

          {/* Generate Orbits (Lazy Loaded via CSS PlayState) */}
          <div 
            className="absolute inset-0 w-full h-full"
          >
            {[...Array(orbitCount)].map((_, orbitIdx) => {
              const size = `${20 + orbitGap * (orbitIdx + 1)}rem`; // equal spacing
              const angleStep = (2 * Math.PI) / iconsPerOrbit;

              return (
                <div
                  key={orbitIdx}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/60"
                  style={{
                    width: size,
                    height: size,
                    animation: `spin ${20 + orbitIdx * 10}s linear infinite`,
                    animationPlayState: isInView ? 'running' : 'paused'
                  }}
                >
                  {iconConfigs
                    .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                    .map((cfg, iconIdx) => {
                      const angle = iconIdx * angleStep;
                      const x = (50 + 50 * Math.cos(angle)).toFixed(4);
                      const y = (50 + 50 * Math.sin(angle)).toFixed(4);

                      return (
                        <div
                          key={iconIdx}
                          className="absolute bg-background border border-border rounded-full p-3 shadow-sm flex items-center justify-center"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                            animation: `spinReverse ${20 + orbitIdx * 10}s linear infinite`,
                            animationPlayState: isInView ? 'running' : 'paused'
                          }}
                        >
                          <cfg.Icon className="w-8 h-8" style={{ color: cfg.color === "#000000" ? "var(--foreground)" : cfg.color }} />
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
