"use client";

import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/ui/scroll-text";

type Feature = {
  text: string;
  sub?: string;
  list?: string[];
};

const usdPlans = [
  {
    id: "core-os",
    title: "Core OS",
    whoItsFor: "Under 20 leads a month. You still answer everything yourself.",
    promise: "Get found. Capture every lead.",
    priceBuildUSD: "+ $1,199 one-time setup",
    priceMonthlyUSD: "$89/mo",
    recommended: false,
    initialFeaturesCount: 20,
    features: [
      { text: "5 conversion-built pages", sub: "Custom-designed, not a template reskin" },
      { text: "Google Business Profile setup" },
      { text: "Smart Lead Capture Engine", sub: "Qualifying forms, spam-filtered" },
      { text: "Click-to-text and click-to-call" },
      { text: "SMS compliance handled", sub: "Carrier registration, consent capture, automatic opt-outs" },
      { text: "1 revision round · 30-day warranty" },
      { text: "Mobile-first, under 2 seconds" },
      { text: "CMS you can edit" },
      { text: "SEO foundations" },
      { text: "Accessible build" },
      { text: "SSL, hosting, domain" },
      { text: "Stripe, calendar, analytics" }
    ]
  },
  {
    id: "growth-os",
    title: "Growth OS",
    whoItsFor: "20–100 leads a month. Things are starting to slip.",
    promise: "Every lead answered in under a minute.",
    priceBuildUSD: "+ $2,499 one-time setup",
    priceMonthlyUSD: "$229/mo",
    recommended: true,
    badge: "RECOMMENDED",
    chip: "Everything in Core, plus",
    initialFeaturesCount: 20,
    features: [
      { text: "12 pages + blog system, ready to publish" },
      { text: "Conversion-focused layout and copy structure" },
      { text: "Local SEO", sub: "Google Business Profile optimization, schema, local keyword structure" },
      { text: "WCAG 2.1 AA accessibility audit and fixes" },
      { text: "Smart Appointment System", sub: "Booking with confirmations and reminders" },
      { text: "CRM set up with your pipeline configured" },
      { text: "Wired into the software you already run" },
      { text: "2 revision rounds · 30-day warranty" }
    ]
  },
  {
    id: "authority-os",
    title: "Authority OS",
    whoItsFor: "100+ leads a month, or multiple locations and services.",
    promise: "The system runs the operation and reports on itself.",
    priceBuildUSD: "+ $4,299 one-time setup",
    priceMonthlyUSD: "$499/mo",
    recommended: false,
    chip: "Everything in Growth, plus",
    initialFeaturesCount: 20,
    features: [
      { text: "Unlimited pages within an 8-week build window" },
      { text: "AI search visibility", sub: "Structured data so ChatGPT, Gemini and Perplexity cite you" },
      { text: "Three premium automations included*", sub: "Chosen with you from the full library" },
      { text: "Connected to your accounting and industry software", sub: "Plus custom integrations for whatever else you run" },
      { text: "Unlimited revisions within the build window" },
      { text: "Dedicated project lead" }
    ]
  }
];

const inrPlans = [
  {
    id: "core-local",
    title: "Core Local",
    whoItsFor: "Under 30 enquiries a month. You reply to everything on WhatsApp yourself.",
    promise: "Get found locally. Every enquiry in one place.",
    priceBuildINR: "+ ₹18,000 one-time setup",
    priceMonthlyINR: "₹1,499/mo",
    recommended: false,
    initialFeaturesCount: 20,
    features: [
      { text: "5 conversion-built pages", sub: "Custom-designed, not a template reskin" },
      { text: "Google Business Profile setup" },
      { text: "Smart Lead Capture Engine", sub: "Qualifying forms, spam-filtered" },
      { text: "Click-to-WhatsApp and click-to-call" },
      { text: "DLT registration handled", sub: "Entity, sender header and message templates" },
      { text: "2 revision rounds · 15-day warranty" },
      { text: "Mobile-first, under 2 seconds on 4G" },
      { text: "CMS you can edit" },
      { text: "SEO foundations" },
      { text: "Accessible build" },
      { text: "Hosting, domain, SSL" },
      { text: "Razorpay, UPI, analytics" }
    ]
  },
  {
    id: "growth-local",
    title: "Growth Local",
    whoItsFor: "30–150 enquiries a month. Replies are slipping and follow-ups aren't happening.",
    promise: "Every enquiry answered in under a minute.",
    priceBuildINR: "+ ₹40,000 one-time setup",
    priceMonthlyINR: "₹2,999/mo",
    recommended: true,
    badge: "RECOMMENDED",
    chip: "Everything in Core, plus",
    initialFeaturesCount: 20,
    features: [
      { text: "8–10 pages + blog or updates section" },
      { text: "Conversion-focused layout and copy structure" },
      { text: "Local SEO", sub: "Google Business Profile optimization, schema, local keyword structure" },
      { text: "Smart Appointment System", sub: "Booking or site-visit scheduling with WhatsApp reminders" },
      { text: "CRM set up with your pipeline configured" },
      { text: "Wired into the software you already run" },
      { text: "3 revision rounds · 30-day warranty" }
    ]
  },
  {
    id: "authority-local",
    title: "Authority Local",
    whoItsFor: "150+ enquiries a month, or multiple locations and services.",
    promise: "The system runs the front desk and reports on itself.",
    priceBuildINR: "+ ₹85,000 one-time setup",
    priceMonthlyINR: "₹5,999/mo",
    recommended: false,
    chip: "Everything in Growth, plus",
    initialFeaturesCount: 20,
    features: [
      { text: "Unlimited pages within a 6-week build window" },
      { text: "Multi-location pages", sub: "One per branch, each ranking in its own area" },
      { text: "AI search visibility", sub: "Structured data so ChatGPT, Gemini and Perplexity cite you" },
      { text: "Three premium automations included*", sub: "Chosen with you from the full library" },
      { text: "Connected to your accounting and industry software", sub: "Plus custom integrations for whatever else you run" },
      { text: "Unlimited revisions within the build window" },
      { text: "Dedicated project lead" }
    ]
  }
];




function PricingCard({ pkg, index, currency }: { pkg: any, index: number, currency: "USD" | "INR" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isRecommended = pkg.recommended;

  const visibleFeatures = pkg.features; 
  const hasMoreFeatures = false; 

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const priceBuild = currency === "USD" ? pkg.priceBuildUSD : pkg.priceBuildINR;
  const priceBuildNum = priceBuild.replace("+ ", "").replace(" one-time setup", "").trim();

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[24px] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out h-full ${
        isRecommended
          ? "bg-[#0a0a0a] border border-primary/30 shadow-[0_0_40px_rgba(204,255,0,0.08)]"
          : "bg-[#0a0a0a] border border-white/5 hover:border-white/10"
      }`}
    >
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none z-0">
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
        <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("/noise.svg")' }} />
      </div>

      {isRecommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-30">
          <Zap className="w-3 h-3 fill-black" />
          Recommended
        </div>
      )}

      <div className="relative z-20 flex flex-col h-full">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 leading-snug whitespace-pre-line">
            {pkg.title}
          </h3>
          <p className={`text-neutral-400 text-sm leading-relaxed ${pkg.promise ? 'mb-2' : 'mb-6'}`}>
            {pkg.whoItsFor}
          </p>
          {pkg.promise && (
             <p className="text-primary text-sm font-medium leading-relaxed mb-6">
                {pkg.promise}
             </p>
          )}

          <div className={`py-4 mb-6 border-b ${isRecommended ? 'border-primary/20' : 'border-white/5'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={priceBuildNum}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-y-1"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
                  {priceBuildNum}
                </span>
                <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">
                  one-time setup
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-4 mb-6">
            {pkg.chip && (
              <div className="inline-block text-xs font-medium text-white px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                {pkg.chip}
              </div>
            )}
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              BUILD ONCE
            </div>
            <AnimatePresence initial={false}>
              {visibleFeatures.map((feature: Feature, fIdx: number) => (
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
                  <div className="flex flex-col gap-1">
                    <span>{feature.text}</span>
                    {feature.sub && (
                      <span className="text-xs text-neutral-500">{feature.sub}</span>
                    )}
                    {feature.list && (
                      <ul className="list-disc pl-4 mt-1 text-xs text-neutral-400 space-y-1">
                        {feature.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMoreFeatures && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 pt-2 transition-colors hidden"
              >
                <span>{isExpanded ? "Show less" : `View all features`}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            {pkg.id.includes("authority") && (
              <p className="text-[10px] text-neutral-500 pt-2 leading-tight">
                *Automations are curated based on your specific business type.
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={() => {
            window.location.href = `/contact?plan=${pkg.id}`;
          }}
          variant={isRecommended ? "default" : "outline"}
          className={`w-full mt-auto transition-transform ${isRecommended ? 'shadow-lg shadow-primary/20 hover:scale-[1.02]' : ''}`}
        >
          Book a free systems audit
        </Button>
      </div>
    </motion.div>
  );
}

function RecurringStrip({ currency }: { currency: "USD" | "INR" }) {
  if (currency === "USD") {
    return (
      <div className="w-full bg-primary/5 border border-primary/15 rounded-[24px] p-7 md:p-8 mt-8 mb-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            RUNS EVERY MONTH
          </span>
          <span className="text-sm text-neutral-500 ml-1">— what your monthly plan actually does</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <h4 className="text-sm font-medium text-neutral-400">Core OS</h4>
              <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
                <span className="text-sm font-extrabold text-primary">$89</span>
                <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Missed-call-to-text — Unanswered call gets an instant reply
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                All leads in one inbox — Website, text, calls, Google
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Connections monitored — If a link between your systems breaks, we fix it
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Hosting, backups, security patching
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Automation health monitoring
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Monthly report · 30 min edits · 48-hr support
              </li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <h4 className="text-sm font-medium text-neutral-400">Growth OS</h4>
              <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
                <span className="text-sm font-extrabold text-primary">$229</span>
                <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-500">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Everything in Core
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Instant SMS + email response — Under 60 seconds, 24/7
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Lead Follow-Up Sequence — Multi-touch across SMS and email
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Review & Testimonial Engine
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Lost Lead Reactivation — Works your old database every month
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Leads flow into the software you already use, filled in
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Report + 1 recommendation · 2 hrs edits · 24-hr support
              </li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <h4 className="text-sm font-medium text-neutral-400">Authority OS</h4>
              <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
                <span className="text-sm font-extrabold text-primary">$499</span>
                <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-500">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Everything in Growth
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Your three chosen automations, monitored and tuned*
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Accessibility monitoring + quarterly compliance review
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Report + 1 recommendation we implement · 5 hrs edits · Priority support
              </li>
            </ul>
            <p className="text-[10px] text-neutral-500 mt-4 leading-tight">
              *Automations are curated based on your specific business type.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // INR Strip
  return (
    <div className="w-full bg-primary/5 border border-primary/15 rounded-[24px] p-7 md:p-8 mt-8 mb-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          RUNS EVERY MONTH
        </span>
        <span className="text-sm text-neutral-500 ml-1">— what your monthly plan actually does</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <h4 className="text-sm font-medium text-neutral-400">Core Local</h4>
            <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
              <span className="text-sm font-extrabold text-primary">₹1,499</span>
              <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Missed-call-to-WhatsApp — Unanswered call gets an instant message
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              All enquiries in one inbox — Website, WhatsApp, Instagram DMs, Google and listing sites
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Connections monitored — If a link between your systems breaks, we fix it
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Hosting, backups, security patching
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Automation health monitoring
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Monthly report · 30 min edits · 48-hr support
            </li>
          </ul>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <h4 className="text-sm font-medium text-neutral-400">Growth Local</h4>
            <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
              <span className="text-sm font-extrabold text-primary">₹2,999</span>
              <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Everything in Core
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              WhatsApp Instant Response — Under 60 seconds, 24/7, on approved templates
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Lead Follow-Up Sequence — Multi-touch across WhatsApp and calls
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Review & Testimonial Engine — Automated Google review requests
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Lost Lead Reactivation — Works your old enquiry database every month
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Enquiries flow into your CRM, filled in, nobody retyping
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Report + 1 recommendation · 2 hrs edits · 24-hr support
            </li>
          </ul>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <h4 className="text-sm font-medium text-neutral-400">Authority Local</h4>
            <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-baseline gap-0.5">
              <span className="text-sm font-extrabold text-primary">₹5,999</span>
              <span className="text-[10px] font-bold text-primary/80 uppercase">/MO</span>
            </div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-neutral-500">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Everything in Growth
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Your three chosen automations, monitored and tuned*
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Quarterly compliance review
            </li>
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Report + 1 recommendation we implement · 5 hrs edits · Priority support
            </li>
          </ul>
          <p className="text-[10px] text-neutral-500 mt-4 leading-tight">
            *Automations are curated based on your specific business type.
          </p>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable({ currency }: { currency: "USD" | "INR" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[24px] mb-16 max-w-7xl mx-auto overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-xl font-bold text-white">Compare all features</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-neutral-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-white/5"
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-[#0a0a0a] z-20 p-6 font-bold text-neutral-400 text-sm border-b border-white/10 w-2/5 shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">Feature</th>
                    <th className="p-6 font-bold text-white border-b border-white/10 w-1/5">{currency === "USD" ? "Core OS" : "Core Local"}</th>
                    <th className="p-6 font-bold text-primary border-b border-white/10 w-1/5">{currency === "USD" ? "Growth OS" : "Growth Local"}</th>
                    <th className="p-6 font-bold text-white border-b border-white/10 w-1/5">{currency === "USD" ? "Authority OS" : "Authority Local"}</th>
                  </tr>
                </thead>
                <tbody>
                  {currency === "USD" ? (
                    <>
                      <ComparisonGroup title="Website and design" />
                      <ComparisonRow title="Pages" values={["5", "12 + blog", "Unlimited, 8-week window"]} />
                      <ComparisonRow title="Mobile-first, under 2 seconds" values={[true, true, true]} />
                      <ComparisonRow title="CMS you can edit" values={[true, true, true]} />
                      <ComparisonRow title="Conversion-focused layout and copy structure" values={[false, true, true]} />
                      <ComparisonRow title="Revision rounds" values={["1", "2", "Unlimited in window"]} />
                      <ComparisonRow title="Build warranty" values={["30 days", "30 days", "30 days"]} />
                      <ComparisonRow title="Dedicated project lead" values={[false, false, true]} />

                      <ComparisonGroup title="Accessibility" />
                      <ComparisonRow title="Accessible build" values={[true, true, true]} />
                      <ComparisonRow title="WCAG 2.1 AA accessibility audit and fixes" values={[false, true, true]} />
                      <ComparisonRow title="Accessibility monitoring" values={[false, false, true]} />

                      <ComparisonGroup title="SEO and visibility" />
                      <ComparisonRow title="SEO foundations" values={[true, true, true]} />
                      <ComparisonRow title="Google Business Profile setup" values={[true, true, true]} />
                      <ComparisonRow title="Local SEO" values={[false, true, true]} />
                      <ComparisonRow title="AI search visibility" values={[false, false, true]} />

                      <ComparisonGroup title="Lead capture" />
                      <ComparisonRow title="Smart Lead Capture Engine" values={[true, true, true]} />
                      <ComparisonRow title="Click-to-text and click-to-call" values={[true, true, true]} />
                      <ComparisonRow title="Smart Appointment System" values={["Add-on", true, true]} />

                      <ComparisonGroup title="Messaging compliance" />
                      <ComparisonRow title="SMS compliance handled" values={[true, true, true]} />
                      <ComparisonRow title="Quarterly compliance review" values={[false, false, true]} />

                      <ComparisonGroup title="Payments and systems" />
                      <ComparisonRow title="Stripe, calendar, analytics" values={[true, true, true]} />
                      <ComparisonRow title="CRM set up with your pipeline configured" values={[false, true, true]} />
                      <ComparisonRow title="Wired into the software you already run" values={[false, true, true]} />
                      <ComparisonRow title="Accounting and industry software connected" values={[false, false, true]} />

                      <ComparisonGroup title="Automations that run every month" />
                      <ComparisonRow title="Missed-call-to-text" values={[true, true, true]} />
                      <ComparisonRow title="All leads in one inbox" values={[true, true, true]} />
                      <ComparisonRow title="Instant SMS + email response" values={[false, true, true]} />
                      <ComparisonRow title="Lead Follow-Up Sequence" values={[false, true, true]} />
                      <ComparisonRow title="Review & Testimonial Engine" values={[false, true, true]} />
                      <ComparisonRow title="Lost Lead Reactivation" values={[false, true, true]} />
                      <ComparisonRow title="Leads flow into the software you already use, filled in" values={[false, true, true]} />
                      <ComparisonRow title="Premium automations included" values={["Add-on", "Add-on", "Three"]} />

                      <ComparisonGroup title="Ongoing service" />
                      <ComparisonRow title="Hosting, backups, security patching" values={[true, true, true]} />
                      <ComparisonRow title="Automation health monitoring" values={[true, true, true]} />
                      <ComparisonRow title="Connections monitored" values={[true, true, true]} />
                      <ComparisonRow title="Edit time each month" values={["30 min", "2 hrs", "5 hrs"]} />
                      <ComparisonRow title="Monthly report" values={["Numbers", "+ 1 recommendation", "+ 1 we implement"]} />
                      <ComparisonRow title="Support response" values={["48 hours", "24 hours", "Priority"]} />
                    </>
                  ) : (
                    <>
                      <ComparisonGroup title="Website and design" />
                      <ComparisonRow title="Pages" values={["5", "8–10 + blog", "Unlimited, 6-week window"]} />
                      <ComparisonRow title="Mobile-first, under 2 seconds on 4G" values={[true, true, true]} />
                      <ComparisonRow title="CMS you can edit" values={[true, true, true]} />
                      <ComparisonRow title="Conversion-focused layout and copy structure" values={[false, true, true]} />
                      <ComparisonRow title="Multi-location pages" values={[false, false, true]} />
                      <ComparisonRow title="Revision rounds" values={["2", "3", "Unlimited in window"]} />
                      <ComparisonRow title="Build warranty" values={["15 days", "30 days", "30 days"]} />
                      <ComparisonRow title="Dedicated project lead" values={[false, false, true]} />

                      <ComparisonGroup title="Accessibility" />
                      <ComparisonRow title="Accessible build" values={[true, true, true]} />

                      <ComparisonGroup title="SEO and visibility" />
                      <ComparisonRow title="SEO foundations" values={[true, true, true]} />
                      <ComparisonRow title="Google Business Profile setup" values={[true, true, true]} />
                      <ComparisonRow title="Local SEO" values={[false, true, true]} />
                      <ComparisonRow title="AI search visibility" values={[false, false, true]} />

                      <ComparisonGroup title="Lead capture" />
                      <ComparisonRow title="Smart Lead Capture Engine" values={[true, true, true]} />
                      <ComparisonRow title="Click-to-WhatsApp and click-to-call" values={[true, true, true]} />
                      <ComparisonRow title="Smart Appointment System" values={["Add-on", true, true]} />

                      <ComparisonGroup title="Messaging compliance" />
                      <ComparisonRow title="DLT registration handled" values={[true, true, true]} />
                      <ComparisonRow title="Quarterly compliance review" values={[false, false, true]} />

                      <ComparisonGroup title="Payments and systems" />
                      <ComparisonRow title="Razorpay, UPI, analytics" values={[true, true, true]} />
                      <ComparisonRow title="CRM set up with your pipeline configured" values={[false, true, true]} />
                      <ComparisonRow title="Wired into the software you already run" values={[false, true, true]} />
                      <ComparisonRow title="Accounting and industry software connected" values={[false, false, true]} />

                      <ComparisonGroup title="Automations that run every month" />
                      <ComparisonRow title="Missed-call-to-WhatsApp" values={[true, true, true]} />
                      <ComparisonRow title="All enquiries in one inbox" values={[true, true, true]} />
                      <ComparisonRow title="WhatsApp Instant Response" values={[false, true, true]} />
                      <ComparisonRow title="Lead Follow-Up Sequence" values={[false, true, true]} />
                      <ComparisonRow title="Review & Testimonial Engine" values={[false, true, true]} />
                      <ComparisonRow title="Lost Lead Reactivation" values={[false, true, true]} />
                      <ComparisonRow title="Enquiries flow into your CRM, filled in, nobody retyping" values={[false, true, true]} />
                      <ComparisonRow title="Premium automations included" values={["Add-on", "Add-on", "Three"]} />

                      <ComparisonGroup title="Ongoing service" />
                      <ComparisonRow title="Hosting, domain, SSL" values={[true, true, true]} />
                      <ComparisonRow title="Hosting, backups, security patching" values={[true, true, true]} />
                      <ComparisonRow title="Automation health monitoring" values={[true, true, true]} />
                      <ComparisonRow title="Connections monitored" values={[true, true, true]} />
                      <ComparisonRow title="Edit time each month" values={["30 min", "2 hrs", "5 hrs"]} />
                      <ComparisonRow title="Monthly report" values={["Numbers", "+ 1 recommendation", "+ 1 we implement"]} />
                      <ComparisonRow title="Support response" values={["48 hours", "24 hours", "Priority"]} />
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComparisonGroup({ title }: { title: string }) {
  return (
    <tr>
      <td colSpan={4} className="sticky left-0 bg-[#0a0a0a] px-6 pt-8 pb-4 z-10 shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-white/5 py-1.5 px-3 rounded-md inline-block">
          {title}
        </div>
      </td>
    </tr>
  );
}

function ComparisonRow({ title, values }: { title: string, values: (string | boolean)[] }) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0 group">
      <td className="sticky left-0 bg-[#0a0a0a] group-hover:bg-[#0c0c0c] p-4 pl-6 text-sm text-neutral-300 transition-colors z-10 shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">
        {title}
      </td>
      {values.map((val, idx) => (
        <td key={idx} className="p-4 text-sm">
          {val === true ? (
             <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          ) : val === false ? (
            <span className="text-neutral-600">—</span>
          ) : (
            <span className="text-neutral-400">{val}</span>
          )}
        </td>
      ))}
    </tr>
  );
}

function CustomBanner() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const customFeatures = [
    "You need something none of the three plans covers",
    "You run multiple brands, sites or locations",
    "Your industry software needs a custom integration",
    "You want a specific set of automations rather than a package",
    "You're replacing an existing system, not starting fresh"
  ];

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      className="group relative w-full bg-[#0a0a0a] border border-white/5 rounded-[24px] overflow-hidden p-8 md:p-10 mb-24 flex flex-col lg:flex-row items-start gap-12 lg:gap-16 hover:border-white/10 transition-colors duration-500"
    >
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
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-30 pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />

      <div className="relative z-20 w-full lg:w-[55%] flex flex-col">
        <div className="self-start inline-flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider mb-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          CUSTOM
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Zenlio Custom OS
        </h3>
        <p className="text-neutral-400 text-base md:text-lg mb-8 lg:mb-12 leading-relaxed max-w-xl">
          Not everything fits a plan. Tell us what your business needs and we'll scope and price it specifically for you.
        </p>
        <p className="text-neutral-500 text-xs leading-relaxed mt-auto lg:pr-8">
          Custom scope doesn't mean expensive. Plenty of custom builds cost less than Growth OS — it depends entirely on what you actually need.
        </p>
      </div>
      
      <div className="relative z-20 w-full lg:w-[45%] flex flex-col items-start border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0 lg:pl-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-6">
          WORTH A CONVERSATION IF
        </div>
        <ul className="space-y-4 mb-10 w-full">
          {customFeatures.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => {
            window.location.href = "/contact?plan=custom";
          }}
          className="w-full lg:w-auto hover:scale-[1.02] transition-transform"
        >
          Tell us what you need
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
          
          <div className="flex justify-center w-full pt-4">
            <div className="inline-flex items-center justify-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  currency === "USD" ? "bg-primary text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Global / USD
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  currency === "INR" ? "bg-primary text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                India / INR
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-0">
          {(currency === "USD" ? usdPlans : inrPlans).map((pkg, idx) => (
            <div key={pkg.id} className={`${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""} relative z-10`}>
              <PricingCard pkg={pkg} index={idx} currency={currency} />
            </div>
          ))}
        </div>

        <RecurringStrip currency={currency} />

        {currency === "USD" ? (
          <p className="text-center text-xs text-neutral-500 mb-16 max-w-3xl mx-auto px-4">
            Software subscriptions are billed directly by those providers to your own account. Usage-based costs we run for you — SMS carrier fees, AI usage — are passed through at cost. Your website is yours to keep; automations run on Zenlio infrastructure and pause if a plan ends.
          </p>
        ) : (
          <p className="text-center text-xs text-neutral-500 mb-16 max-w-3xl mx-auto px-4">
            WhatsApp message charges are billed at cost beyond 500 messages a month. Software subscriptions are billed directly by those providers to your own account. Your website is yours to keep; automations run on Zenlio infrastructure and pause if a plan ends. Prices exclude GST.
          </p>
        )}

        <ComparisonTable currency={currency} />

        <CustomBanner />

      </div>
    </section>
  );
}
