"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Safely register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollTriggerSyncer() {
  const lenis = useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (lenis) {
      // Mathematically guarantee Lenis starts at 0 on every page load
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent GSAP from violently fast-forwarding animations when returning to the tab
    gsap.ticker.lagSmoothing(100, 16);
    
    // Keep GSAP in sync during window resizing
    ScrollTrigger.refresh();

    // 1. Mathematically force the page to start at the top on every reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    // Also explicitly scroll to top immediately on mount
    window.scrollTo(0, 0);

    // 2. Fix glitchy animations when switching tabs back and forth
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Smooth scrolling physics interpolation
        smoothWheel: true,
        syncTouch: true, // Native-like sync on touchpads
      }}
    >
      <ScrollTriggerSyncer />
      {children}
    </ReactLenis>
  );
}
