"use client";

import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/ui/scroll-text";

const plans = [
  {
    id: "website",
    title: "Website &\nDevelopment",
    description: "Custom websites designed, developed and deployed for your business.",
    priceUSD: 1000,
    priceINR: 40000,
    recommended: false,
    initialFeaturesCount: 4,
    features: [
      "Custom Website Design",
      "Responsive Development",
      "Frontend & Backend Integration",
      "Deployment & Hosting Setup",
      "Performance Optimization",
      "Basic SEO & Analytics Setup",
    ],
    addons: [
      { id: "seo", name: "Advanced SEO Setup", priceUSD: 300, priceINR: 12000 },
      { id: "aeo", name: "AEO Optimization", priceUSD: 200, priceINR: 8000 },
      { id: "geo", name: "GEO Location Strategy", priceUSD: 150, priceINR: 6000 }
    ],
    addonNoteUSD: "Monthly Maintenance & Optimization — $250 / mo",
    addonNoteINR: "Monthly Maintenance & Optimization — ₹10,000 / mo",
  },
  {
    id: "ai",
    title: "Website + AI\nAutomations",
    description: "Digital presence combined with intelligent AI-powered business automation.",
    priceUSD: 1500,
    priceINR: 60000,
    recommended: true,
    badge: "RECOMMENDED",
    initialFeaturesCount: 5,
    features: [
      "Custom Website & Responsive Dev",
      "AI Chatbot / Assistant Integration",
      "AI Workflow & n8n Automation",
      "Lead Capture & CRM Integration",
      "Deployment & System Integration",
      "Performance & Security Tuning",
    ],
    addons: [
      { id: "rag", name: "RAG Vector DB Setup", priceUSD: 500, priceINR: 20000 },
      { id: "voice", name: "Voice AI Agent", priceUSD: 400, priceINR: 16000 },
      { id: "seo", name: "Advanced SEO Setup", priceUSD: 300, priceINR: 12000 }
    ],
    addonNoteUSD: "Monthly Maintenance & AI Upgrades • $375 / mo",
    addonNoteINR: "Monthly Maintenance & AI Upgrades • ₹15,000 / mo",
  },
  {
    id: "automation",
    title: "Automation &\nWorkflows",
    description: "Automate repetitive business processes and connect your existing tools.",
    priceUSD: 750,
    priceINR: 30000,
    recommended: false,
    initialFeaturesCount: 4,
    features: [
      "n8n Workflow Automation",
      "API & Webhook Integrations",
      "Business Process Automation",
      "Lead & Form Automation",
      "Notifications & Alerts",
      "Data Sync & Custom Logic",
    ],
    recurring: [
      "Workflow Monitoring",
      "Maintenance & Optimization",
      "New Workflow Development",
    ],
    addons: [
      { id: "custom-api", name: "Custom API Dev", priceUSD: 250, priceINR: 10000 },
      { id: "slack-bot", name: "Slack/Discord Bot", priceUSD: 150, priceINR: 6000 }
    ]
  }
];

const customPlan = {
  id: "custom",
  title: "Custom Solutions",
  description: "Bespoke software, AI agents and automation systems for unique requirements.",
  priceUSD: "Custom Quote",
  priceINR: "Custom Quote",
  features: [
    "Complex Web Applications",
    "AI Agents & Voice Assistant Systems",
    "RAG Systems & Vector DBs",
    "Enterprise Multi-Tool Automation",
    "Custom APIs & Admin Dashboards",
    "Bespoke Architecture & CRM Sync",
  ],
};


function PricingCard({ pkg, index, currency }: { pkg: any, index: number, currency: "USD" | "INR" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addonsExpanded, setAddonsExpanded] = useState(false);
  const isRecommended = pkg.recommended;

  const visibleFeatures = isExpanded
    ? pkg.features
    : pkg.features.slice(0, pkg.initialFeaturesCount);
  const hasMoreFeatures = pkg.features.length > pkg.initialFeaturesCount;

  // Hover Spotlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const basePrice = currency === "USD" ? pkg.priceUSD : pkg.priceINR;
  const addonTotal = pkg.addons?.reduce((sum: number, addon: any) => {
    if (selectedAddons.includes(addon.id)) {
      return sum + (currency === "USD" ? addon.priceUSD : addon.priceINR);
    }
    return sum;
  }, 0) || 0;

  const finalPrice = basePrice + addonTotal;
  const formattedPrice = currency === "USD" 
    ? `$${finalPrice.toLocaleString()}`
    : `₹${finalPrice.toLocaleString()}`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[24px] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out ${
        isRecommended
          ? "bg-[#0a0a0a] border border-primary/30 shadow-[0_0_40px_rgba(204,255,0,0.08)]"
          : "bg-[#0a0a0a] border border-white/5 hover:border-white/10"
      }`}
    >
      {/* Backgrounds Wrapper */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none z-0">
        {/* Spatial Dynamic Spotlight */}
        <motion.div
          className="absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.04),
                transparent 80%
              )
            `,
          }}
        />
        {/* Noise Texture */}
        <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("/noise.svg")' }} />
      </div>

      {isRecommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-30">
          <Zap className="w-3 h-3 fill-black" />
          Recommended
        </div>
      )}

      {/* Content wrapper with z-index to sit above the noise and spotlight */}
      <div className="relative z-20 flex flex-col h-full">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 leading-snug whitespace-pre-line">
            {pkg.title}
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed min-h-[40px] mb-6">
            {pkg.description}
          </p>

          <div className={`py-4 mb-6 border-b ${isRecommended ? 'border-primary/20' : 'border-white/5'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={formattedPrice}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {formattedPrice}
                </span>
                <span className="text-sm text-neutral-500 font-medium">/project</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-2.5 mb-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-3">
              What's included
            </div>
            <AnimatePresence initial={false}>
              {visibleFeatures.map((feature: string, fIdx: number) => (
                <motion.div 
                  key={fIdx} 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 text-sm text-slate-200 leading-tight"
                >
                  <svg className={`w-4 h-4 mt-0.5 shrink-0 ${isRecommended ? 'text-primary' : 'text-primary opacity-80'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMoreFeatures && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 pt-2 transition-colors"
              >
                <span>{isExpanded ? "Show less" : `View all features (+${pkg.features.length - pkg.initialFeaturesCount})`}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {(pkg.recurring || pkg.addons) && (
            <div className={`p-4 rounded-[24px] mb-6 border border-white/5 bg-black/40`}>
              {pkg.recurring && (
                <div className="space-y-2 mb-3 last:mb-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    Optional Recurring
                  </div>
                  {pkg.recurring.map((item: string, rIdx: number) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-neutral-300 px-1">
                      <span className="text-primary font-bold opacity-70">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {pkg.addons && (
                <div className="space-y-0">
                  <button 
                    onClick={() => setAddonsExpanded(!addonsExpanded)}
                    className={`w-full flex items-center justify-between text-left group p-3 rounded-[16px] transition-all ${
                      addonsExpanded || selectedAddons.length > 0 ? "bg-primary/5" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className={`w-4 h-4 ${addonsExpanded || selectedAddons.length > 0 ? "text-primary fill-primary/20" : "text-neutral-500 group-hover:text-primary transition-colors"}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${addonsExpanded || selectedAddons.length > 0 ? "text-primary" : "text-neutral-400 group-hover:text-primary transition-colors"}`}>
                        Customize Add-ons
                      </span>
                      {selectedAddons.length > 0 && (
                        <span className="bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                          {selectedAddons.length}
                        </span>
                      )}
                    </div>
                    <div className={`p-1.5 rounded-full transition-colors ${
                      addonsExpanded || selectedAddons.length > 0 ? "bg-primary text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]" : "bg-white/10 text-white group-hover:bg-primary/20 group-hover:text-primary"
                    }`}>
                      <motion.div animate={{ rotate: addonsExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {addonsExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 pt-2 pb-1">
                          {pkg.addons.map((addon: any) => {
                            const isSelected = selectedAddons.includes(addon.id);
                            const addonPrice = currency === "USD" ? `+$${addon.priceUSD}` : `+₹${addon.priceINR.toLocaleString()}`;
                            return (
                              <label 
                                key={addon.id} 
                                className={`flex items-start gap-3 p-3 rounded-[16px] border cursor-pointer transition-colors ${
                                  isSelected ? "bg-primary/10 border-primary/30" : "bg-black/50 border-white/5 hover:border-white/10"
                                }`}
                              >
                                <div className="mt-0.5">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                    isSelected ? "bg-primary border-primary" : "border-white/30"
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                                  </div>
                                </div>
                                <div className="flex-1 flex justify-between items-center text-sm">
                                  <span className={isSelected ? "text-white font-medium" : "text-neutral-300"}>{addon.name}</span>
                                  <span className="text-neutral-500 text-xs font-medium shrink-0 ml-2">{addonPrice}</span>
                                </div>
                                <input 
                                  type="checkbox" 
                                  className="hidden" 
                                  checked={isSelected}
                                  onChange={() => toggleAddon(addon.id)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {(pkg.addonNoteUSD || pkg.addonNoteINR) && (
                    <p className="text-[11px] text-neutral-400 leading-snug pt-2 whitespace-pre-line border-t border-white/5 mt-3 relative h-6 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={currency}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0"
                        >
                          {currency === "USD" ? pkg.addonNoteUSD : pkg.addonNoteINR}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            const contactElem = document.getElementById("contact") || document.getElementById("cta");
            if (contactElem) contactElem.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "#contact";
          }}
          variant={isRecommended ? "default" : "outline"}
          className={`w-full mt-auto transition-transform ${isRecommended ? 'shadow-lg shadow-primary/20 hover:scale-[1.02]' : ''}`}
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}

function CustomBanner({ currency }: { currency: "USD" | "INR" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      className="group relative w-full bg-[#0a0a0a] border border-white/5 rounded-[24px] overflow-hidden p-8 md:p-12 mb-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:border-white/10 transition-colors duration-500"
    >
      {/* Spatial Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.04),
              transparent 80%
            )
          `,
        }}
      />
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />

      <div className="relative z-20 max-w-2xl w-full">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider mb-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          Enterprise
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">
          {customPlan.title}
        </h3>
        <p className="text-neutral-400 text-base md:text-lg mb-6">
          {customPlan.description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {customPlan.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </div>
          ))}
          <span className="text-sm text-neutral-500 italic flex items-center gap-2">
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            and more...
          </span>
        </div>
      </div>
      
      <div className="relative z-20 w-full lg:w-auto shrink-0 flex flex-col items-start lg:items-end gap-4 border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0">
        <div className="text-left lg:text-right h-[40px] relative w-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currency}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 right-0 w-full lg:w-auto lg:text-right text-left"
            >
              <div className="text-2xl font-bold text-white">
                {currency === "USD" ? customPlan.priceUSD : customPlan.priceINR}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <Button
          onClick={() => {
            const contactElem = document.getElementById("contact") || document.getElementById("cta");
            if (contactElem) contactElem.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "#contact";
          }}
          className="w-full lg:w-auto hover:scale-[1.02] transition-transform"
        >
          Contact Sales
        </Button>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  return (
    <section id="pricing" className="w-full bg-[#0c0c0c] py-24 relative border-b border-white/5">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col space-y-8 mb-10 md:mb-12 max-w-4xl mx-auto md:text-left text-center"
        >
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
                PRICING & PACKAGES
              </div>
            </div>
            <TextAnimation
              as="h2"
              text="Transparent Pricing. No Surprises."
              classname="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-[1.1] normal-case"
              direction="up"
            />
          </div>
          
          {/* Currency Toggle */}
          <div className="flex justify-center w-full pt-4">
            <div className="inline-flex items-center justify-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  currency === "USD" ? "bg-primary text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  currency === "INR" ? "bg-primary text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                INR (₹)
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3-Tier Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-12">
          {plans.map((pkg, idx) => (
            <PricingCard key={pkg.id} pkg={pkg} index={idx} currency={currency} />
          ))}
        </div>

        {/* 4th Tier: Custom Solutions Banner */}
        <CustomBanner currency={currency} />



      </div>
    </section>
  );
}
