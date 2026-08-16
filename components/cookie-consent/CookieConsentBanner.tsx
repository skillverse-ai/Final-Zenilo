"use client";

import React, { useState, useEffect } from "react";
import { useCookieConsent } from "./CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const { consentState, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server rendering and client state
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show only if no status has been stored yet
  const showBanner = consentState.status === null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md w-[calc(100%-3rem)] bg-[#171717] border border-[#29292d] shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-[20px] p-6 z-50 flex flex-col gap-5 text-left"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="space-y-2">
            <h3 id="cookie-title" className="text-lg font-bold text-white tracking-tight font-[family-name:var(--font-new-order)]">
              Cookie Consent
            </h3>
            <p id="cookie-desc" className="text-sm text-neutral-400 leading-relaxed">
              We use necessary cookies to run our website. With your consent, we would also like to use optional cookies to analyze traffic and customize marketing. Read our{" "}
              <Link href="/cookies" className="text-white underline hover:text-[#ccff00] transition-colors">
                Cookie Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <Button
              onClick={acceptAll}
              className="w-full font-sans"
            >
              Accept All
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={rejectNonEssential}
                hideArrow
                className="w-full font-sans text-xs sm:text-sm px-2"
              >
                Reject Optional
              </Button>
              <Button
                variant="ghost"
                onClick={openPreferences}
                hideArrow
                className="w-full font-sans text-xs sm:text-sm px-2"
              >
                Customize
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
