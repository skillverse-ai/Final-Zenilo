"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import TextAnimation from "@/components/ui/scroll-text";

const originalProjects = [
  {
    id: 1,
    title: "SkillVerse AI",
    description: "Learn, Build, and Master AI Tools for a Future-Proof Career. Real skills, real projects, real income.",
    link: "https://skillverseai.vercel.app",
    image: "/images/project-1.webp",
  },
  {
    id: 2,
    title: "Shivam Dental Care",
    description: "Experience world-class, painless dental care in Hyderabad. Serving healthy smiles since 2002.",
    link: "https://shivam-dental-18.vercel.app",
    image: "/images/project-2.webp",
  },
  {
    id: 3,
    title: "Fitness 19",
    description: "High-Octane Brutalist Fitness & Gym. Pitch black, neon accents, high intensity, and raw power.",
    link: "https://fitness19.vercel.app",
    image: "/images/project-3.webp",
  },
  {
    id: 4,
    title: "iCraft Designz",
    description: "Quiet Luxury Interior Studio. Premium residential and commercial architectural spaces.",
    link: "https://jishnutask1.ai.studio",
    image: "/images/project-4.webp",
  }
];

// Duplicate 8 sets to create a massive buffer for aggressive manual swiping
const projects = [
  ...originalProjects.map(p => ({ ...p, uniqueId: `set1-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set2-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set3-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set4-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set5-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set6-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set7-${p.id}` })),
  ...originalProjects.map(p => ({ ...p, uniqueId: `set8-${p.id}` })),
];

function ProjectCard({ project, index, containerRef, setHovered, isReady }: { project: any, index: number, containerRef: React.RefObject<HTMLDivElement | null>, setHovered: (v: boolean) => void, isReady: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"],
  });

  // Rotate Y based on horizontal position (-45deg at right edge, 0 at center, 45deg at left edge)
  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [-45, 0, 45]);

  // Scale down when pushed to the sides
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.75, 1, 0.75]);

  // Push back in Z space when on sides to exaggerate perspective
  const z = useTransform(scrollXProgress, [0, 0.5, 1], [-300, 0, -300]);

  return (
    <motion.div
      ref={cardRef}
      data-index={index}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      whileInView={!isReady ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      animate={isReady ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.21, 1.02, 0.73, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        rotateY: isDesktop ? rotateY : 0,
        scale: isDesktop ? scale : 1,
        z: isDesktop ? z : 0,
        transformStyle: isDesktop ? "preserve-3d" : "flat",
        willChange: "transform"
      }}
      className="flex-shrink-0 w-[90vw] md:w-[75vw] lg:w-[55vw] flex flex-col gap-4 relative group cursor-pointer"
      onClick={() => window.open(project.link, '_blank')}
    >
      <div className="w-full aspect-video rounded-[20px] overflow-hidden border border-[#29292d] group-hover:border-[#3a3a40] transition-colors duration-300 shadow-[inset_-1px_-3px_4px_rgba(0,0,0,0.3),0px_3px_4px_3px_rgba(0,0,0,0.3)] relative bg-[#171717]">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          style={{ willChange: "transform" }}
        />
        {/* Overlay to ensure inner shadow is visible over absolute children */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] shadow-[inset_-1px_-3px_4px_rgba(0,0,0,0.3)] z-30" />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-10" />
      </div>

      {/* Text Container Below */}
      <div className="px-2 flex flex-col items-start text-left">
         <p className="text-white font-bold text-xl md:text-2xl tracking-tight flex items-center gap-2">
            {project.title} <span className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">&rarr;</span>
         </p>
         <p className="text-neutral-400 text-sm md:text-base mt-1 line-clamp-2">
            {project.description}
         </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1.5 seconds after mounting, force all off-screen cards to become visible
    // This prevents them from triggering their entrance animation when the infinite loop teleports to them
    const t = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Use refs instead of state to prevent restarting the animation loop and jumping
  const isHovered = useRef(false);
  const isInteracting = useRef(false);
  const interactionTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedOffset = useRef(false);

  const handleManualInteraction = () => {
    isInteracting.current = true;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1000); // Wait 1 second after last interaction before resuming auto-scroll
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    
    // Scroll speed (pixels per millisecond)
    const speed = 0.05; 

    const scrollLoop = (time: number) => {
      let delta = time - lastTime;
      // If delta is huge (e.g. user switched tabs), cap it to a normal frame duration (16ms)
      if (delta > 100) delta = 16;
      lastTime = time;

      const cards = container.querySelectorAll<HTMLElement>('[data-index]');
      if (cards.length >= 5) {
        const firstCard = cards[0];
        const fifthCard = cards[4];
        // The exact width of one complete set of 4 cards (including their gaps)
        const setWidth = fifthCard.offsetLeft - firstCard.offsetLeft;

        // Shift the starting position to Set 4 (middle of the huge buffer) to allow infinite manual swiping
        if (!hasInitializedOffset.current && setWidth > 0) {
          container.scrollLeft = setWidth * 3;
          hasInitializedOffset.current = true;
        }

        if (!isHovered.current && !isInteracting.current && hasInitializedOffset.current) {
          container.scrollLeft += speed * delta;
        }

        // Invisible Loop Wrapping Magic
        // ONLY snap when the user is NOT interacting to avoid breaking native scroll momentum/gestures
        if (!isInteracting.current && hasInitializedOffset.current) {
          if (container.scrollLeft >= setWidth * 5) {
            // Keep them roughly in the center (jump back one set)
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft <= setWidth * 2) {
            // Jump forward one set if they manually scrolled left too far
            container.scrollLeft += setWidth;
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-background py-24 relative border-b border-border overflow-hidden flex flex-col">
      
      {/* Standard Section Header matching Services section */}
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col space-y-4 mb-16 max-w-4xl mx-auto md:text-left text-center"
        >
          <div>
             <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
                SELECTED WORK
             </div>
          </div>
          <TextAnimation
            as="h2"
            text="Featured Projects & Product Showcases."
            classname="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white normal-case"
            direction="up"
          />
          <TextAnimation
            as="p"
            text="Explore recent digital platforms, web applications, and automated ecosystems built for scale."
            classname="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0 normal-case"
            direction="up"
          />
        </motion.div>
      </div>

      <div className="relative z-10 w-full" style={{ perspective: "1500px" }}>
        
        {/* Horizontal Scroll Track */}
        <div 
          ref={containerRef}
          onWheel={handleManualInteraction}
          onTouchStart={handleManualInteraction}
          onTouchMove={handleManualInteraction}
          onPointerDown={handleManualInteraction}
          className="relative w-full overflow-x-auto overflow-y-visible flex flex-nowrap gap-6 md:gap-10 py-10 hide-scroll [&::-webkit-scrollbar]:hidden"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.uniqueId} project={project} index={index} containerRef={containerRef} setHovered={(val) => isHovered.current = val} isReady={isReady} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
