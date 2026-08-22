"use client";

import React, { useState, useEffect } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, ArrowLeft, Check, ChevronDown } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const planTemplates: Record<string, {
  name: string;
  build: string;
  recurring: string;
  addonsMap?: Record<string, string>;
}> = {
  "core-os": {
    name: "Core OS",
    build: "$1,200",
    recurring: "$89/mo",
    addonsMap: {
      "whatsapp": "WhatsApp",
      "ai-lead": "AI Lead Qualification",
    }
  },
  "growth-os": {
    name: "Growth OS",
    build: "$2,800",
    recurring: "$229/mo",
    addonsMap: {
      "ai-lead": "AI Lead Qualification",
      "ai-router": "AI Inquiry Router",
      "abandoned-form": "Abandoned Form Recovery",
      "personalized-exp": "Personalized Website Experience",
      "sales-agent": "AI Website Sales Agent",
      "quote-gen": "Dynamic Quote Generator",
      "onboarding": "Customer Onboarding Automation",
      "support-handoff": "AI Support + Handoff",
      "lost-lead": "Lost Lead Reactivation",
    }
  },
  "authority-os": {
    name: "Authority OS",
    build: "$6,000",
    recurring: "$499/mo",
    addonsMap: {
      "remaining-premium": "Any remaining premium automation",
      "lost-lead-campaigns": "Lost Lead Reactivation campaigns",
    }
  },
  "core-local": {
    name: "Core Local",
    build: "₹18,000",
    recurring: "₹799/mo",
    addonsMap: {
      "whatsapp": "WhatsApp",
      "appointment-up": "Appointment upgrade",
      "reviews": "Reviews",
    }
  },
  "growth-local": {
    name: "Growth Local",
    build: "₹40,000",
    recurring: "₹1,499/mo",
    addonsMap: {
      "lead-followup": "Lead Follow-Up Sequence",
      "ai-lead-capped": "AI Lead Qualification (capped)",
      "quote-gen": "Dynamic Quote Generator",
      "sales-agent": "AI Website Sales Agent",
    }
  },
  "authority-local": {
    name: "Authority Local",
    build: "₹85,000",
    recurring: "₹2,999/mo",
    addonsMap: {
      "ai-lead": "AI Lead Qualification",
      "quote-gen": "Dynamic Quote Generator",
      "sales-agent-capped": "AI Website Sales Agent (capped)",
    }
  },
  "custom": {
    name: "Zenlio Enterprise OS",
    build: "$10,000–$30,000+",
    recurring: "$800–$2,500+/mo",
  }
};

const generatePrefilledMessage = (
  plan: typeof planTemplates[string],
  selectedAddonsList: string[]
) => {
  const addonsSection = selectedAddonsList.length > 0
    ? `\n\nSelected add-ons:\n${selectedAddonsList.map(a => `* ${a}`).join("\n")}`
    : "";

  return `Hi Zenlio,

I'm interested in the ${plan.name} plan.

Build: ${plan.build}
Recurring: ${plan.recurring}${addonsSection}

I'd like to discuss the project and next steps.`;
};

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const [selectedPlanKey, setSelectedPlanKey] = useState<string | null>(null);
  const [selectedAddonKeys, setSelectedAddonKeys] = useState<string[]>([]);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);

  const planOptions = [
    { id: 'core-os', label: 'Core OS' },
    { id: 'growth-os', label: 'Growth OS' },
    { id: 'authority-os', label: 'Authority OS' },
    { id: 'custom', label: 'Zenlio Enterprise OS' }
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const planId = searchParams.get("plan");
    const addonsParam = searchParams.get("addons");

    if (planId && planTemplates[planId]) {
      setSelectedPlanKey(planId);
      const addonKeys = addonsParam ? addonsParam.split(",") : [];
      setSelectedAddonKeys(addonKeys);

      const planInfo = planTemplates[planId];
      const resolvedAddonsList = planInfo.addonsMap
        ? addonKeys.map(key => planInfo.addonsMap![key]).filter(Boolean)
        : [];

      const prefilled = generatePrefilledMessage(planInfo, resolvedAddonsList);
      setFormData(prev => ({
        ...prev,
        message: prefilled
      }));
    }
  }, []);

  const selectedPlanInfo = selectedPlanKey ? planTemplates[selectedPlanKey] : null;
  const resolvedAddons = selectedPlanInfo && selectedPlanInfo.addonsMap
    ? selectedAddonKeys
        .map(key => selectedPlanInfo.addonsMap![key])
        .filter(Boolean)
    : [];

  const getDropdownValue = (key: string | null): string => {
    if (!key) return "";
    if (key === "core-os" || key === "core-local") return "core-os";
    if (key === "growth-os" || key === "growth-local") return "growth-os";
    if (key === "authority-os" || key === "authority-local") return "authority-os";
    if (key === "custom") return "custom";
    return "";
  };

  const handlePlanSelect = (value: string) => {
    if (value === selectedPlanKey) return; // Prevent unnecessary updates

    setSelectedPlanKey(value);
    setSelectedAddonKeys([]);
    
    const currentPrefill = selectedPlanKey 
      ? generatePrefilledMessage(
          planTemplates[selectedPlanKey], 
          selectedAddonKeys.map(k => planTemplates[selectedPlanKey].addonsMap?.[k] || "").filter(Boolean)
        ) 
      : "";
    if (!formData.message.trim() || formData.message === currentPrefill) {
      const nextPrefill = generatePrefilledMessage(planTemplates[value], []);
      setFormData(prev => ({
        ...prev,
        message: nextPrefill
      }));
    }

    setErrors(prev => {
      const next = { ...prev };
      delete next.selectedPlan;
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!selectedPlanKey) {
      newErrors.selectedPlan = "Please select a plan.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    if (!consentGiven) {
      newErrors.consent = "You must consent to the processing of your data to submit.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          website: websiteHoneypot,
          selectedPlan: selectedPlanInfo ? selectedPlanInfo.name : "",
          buildPrice: selectedPlanInfo ? selectedPlanInfo.build : "",
          monthlyPrice: selectedPlanInfo ? selectedPlanInfo.recurring : "",
          selectedAddOns: resolvedAddons,
          timestamp: new Date().toISOString(),
          consent: {
            given: true,
            purpose: "To respond to user inquiry submitted via contact form",
            version: "1.0-August-2026"
          }
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
        setWebsiteHoneypot("");
        setConsentGiven(false);
        setSelectedPlanKey(null);
        setSelectedAddonKeys([]);
        if (typeof window !== "undefined") {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again or contact us directly.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 pt-28 pb-16 bg-background overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl relative z-10 space-y-6"
      >
        
        {/* Back to Home Link */}
        <div className="flex justify-start">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              hideArrow={true}
              className="text-neutral-400 hover:text-black flex items-center gap-2 rounded-full px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Button>
          </Link>
        </div>

        {/* Contact Bento Card */}
        <ContactCard
          leftContent={
            <div className="flex flex-col h-full">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-grift)] font-bold text-white tracking-tight leading-[1.1]">
                  Ready to systemize your <span className="text-[#ccff00]">growth?</span>
                </h1>
                <div className="space-y-4">
                  <p className="text-neutral-400 max-w-xl text-base md:text-lg leading-relaxed">
                    We build the digital infrastructure that scales your business while you sleep—from high-converting websites to custom AI workflows.
                  </p>
                  <p className="text-neutral-400 max-w-xl text-base md:text-lg leading-relaxed text-white font-medium">
                    Tell us what's bottlenecking your operations, and let's fix it.
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">1</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Discovery Call</h4>
                      <p className="text-sm text-neutral-400">We map your current workflows and identify the biggest bottlenecks.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">2</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Custom Blueprint</h4>
                      <p className="text-sm text-neutral-400">We design a tailored architecture for your website and AI automations.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">3</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Execution & Handoff</h4>
                      <p className="text-sm text-neutral-400">We build, integrate, and train you on your new operating system.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-12 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <a href="https://www.instagram.com/zenlio.agency/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#ccff00] hover:bg-[#ccff00]/10 transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/zenlio-agency-21a06642b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#ccff00] hover:bg-[#ccff00]/10 transition-colors">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                </div>
                
                <div>
                  <a href="mailto:contact@zenlio.agency" className="text-neutral-400 hover:text-white transition-colors text-base font-medium flex items-center gap-2">
                    <MailIcon className="w-4 h-4 text-primary" />
                    contact@zenlio.agency
                  </a>
                </div>
              </div>
            </div>
          }
        >
          <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={cn(
                  "bg-white/5 border rounded-[12px] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full backdrop-blur-md",
                  errors.name 
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50" 
                    : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                )}
              />
              {errors.name && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                  {errors.name}
                </motion.span>
              )}
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={cn(
                  "bg-white/5 border rounded-[12px] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full backdrop-blur-md",
                  errors.email 
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50" 
                    : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                )}
              />
              {errors.email && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                  {errors.email}
                </motion.span>
              )}
            </div>

            <div className="flex flex-col gap-1.5 relative z-50">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Select Your Plan</label>
              
              <button 
                type="button"
                onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
                className={`w-full flex items-center justify-between text-left group p-3.5 rounded-[12px] transition-all border ${
                  planDropdownOpen || selectedPlanKey ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[13px] font-medium ${selectedPlanKey ? "text-white" : "text-neutral-400"}`}>
                    {selectedPlanKey ? planOptions.find(p => p.id === getDropdownValue(selectedPlanKey))?.label || "Select Plan" : "Select a Plan"}
                  </span>
                </div>
                <div className={`transition-colors ${planDropdownOpen ? "text-primary" : "text-neutral-500"}`}>
                  <motion.div animate={{ rotate: planDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {planDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanDropdownOpen(false);
                      }}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-[calc(100%+8px)] z-[60] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl p-3 overflow-hidden"
                    >
                      <div className="flex flex-col gap-1">
                        {planOptions.map((plan) => {
                          const isSelected = getDropdownValue(selectedPlanKey) === plan.id;
                          return (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => {
                                handlePlanSelect(plan.id);
                                setPlanDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-200 text-left ${
                                isSelected 
                                  ? "bg-[#ccff00]/10 text-[#ccff00]" 
                                  : "text-neutral-300 hover:bg-[#ccff00]/10 hover:text-[#ccff00]"
                              }`}
                            >
                              <span className="text-[15px] font-medium truncate">
                                {plan.label}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-[#ccff00] shrink-0 ml-3" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {errors.selectedPlan && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                  {errors.selectedPlan}
                </motion.span>
              )}
            </div>


            {selectedPlanInfo && (
              <div className="bg-white/5 border border-white/10 rounded-[12px] p-4 space-y-2.5 text-sm text-neutral-300 backdrop-blur-md">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Your Selection
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-white/5 pb-2.5 mb-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Plan</span>
                    <span className="font-semibold text-white">{selectedPlanInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Build</span>
                    <span className="font-semibold text-white">{selectedPlanInfo.build}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Recurring</span>
                    <span className="font-semibold text-white">{selectedPlanInfo.recurring}</span>
                  </div>
                </div>
                {resolvedAddons.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Add-ons</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {resolvedAddons.map((addon, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{addon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help systemize your growth?"
                className={cn(
                  "bg-white/5 border rounded-[12px] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full h-24 resize-none backdrop-blur-md",
                  errors.message 
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50" 
                    : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                )}
              />
              {errors.message && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                  {errors.message}
                </motion.span>
              )}
            </div>

            <div className="flex flex-col gap-1.5 pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0 focus:ring-1"
                />
                <span className="text-xs text-neutral-300 leading-normal">
                  I consent to Zenlio processing this personal information to respond to my inquiry. I have read and agree to the{" "}
                  <Link href="/privacy" className="text-white underline hover:text-[#ccff00]">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
              {errors.consent && (
                <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                  {errors.consent}
                </motion.span>
              )}
            </div>

            {/* Honeypot field for bot protection */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                value={websiteHoneypot}
                onChange={(e) => setWebsiteHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full text-base font-bold"
            >
              <span>{isSubmitting ? "Sending..." : "Submit"}</span>
            </Button>

            {status.message && (
              <div
                className={cn(
                  "p-3.5 rounded-xl text-sm font-medium border text-center transition-all duration-300",
                  status.type === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                )}
              >
                {status.message}
              </div>
            )}
          </form>
        </ContactCard>

      </motion.div>
    </main>
  );
}
