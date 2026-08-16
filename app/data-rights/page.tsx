"use client";

import React, { useState } from "react";
import { MailIcon, ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// // LEGAL REVIEW REQUIRED: Whole copy of this page represents Data Rights compliance workflow under the DPDP Act 2023.

export default function DataRightsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "access",
    details: "",
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    if (!formData.details.trim()) {
      newErrors.details = "Request details are required.";
    }
    if (!consentGiven) {
      newErrors.consent = "You must consent to the processing of this request to proceed.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch("/api/data-rights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          consent: {
            given: true,
            purpose: "To process and fulfill Data Principal rights requests under DPDP Act 2023",
            version: "1.0-August-2026",
          }
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your Data Rights request has been submitted to our Grievance Officer. We will review your request and get back to you within 30 days.",
        });
        setFormData({ name: "", email: "", requestType: "access", details: "" });
        setConsentGiven(false);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again or contact us directly.",
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
        className="w-full max-w-2xl relative z-10 space-y-6"
      >
        {/* Back Link */}
        <div className="flex justify-start">
          <Link href="/privacy">
            <Button
              variant="outline"
              size="sm"
              hideArrow={true}
              className="text-neutral-400 hover:text-black flex items-center gap-2 rounded-full px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Privacy Policy</span>
            </Button>
          </Link>
        </div>

        {/* Premium Bento Card Wrapper */}
        <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }} />
          
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary tracking-widest uppercase">
                <ShieldAlert className="w-4 h-4" />
                <span>India DPDP Act 2023</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-[family-name:var(--font-grift)]">
                Data Rights Portal
              </h1>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                If you are an Indian citizen (Data Principal), you can use this form to exercise your statutory data rights under India's Digital Personal Data Protection Act 2023. Your request will be directly routed to our nominated Grievance Officer.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="w-full space-y-4 pt-2">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={cn(
                    "bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full backdrop-blur-md",
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
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Your Registered Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={cn(
                    "bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full backdrop-blur-md",
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

              {/* Request Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Request Type</label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full"
                >
                  <option value="access">Access my personal data (Summary of Processing)</option>
                  <option value="correction">Correct inaccurate or outdated personal data</option>
                  <option value="erasure">Erase my personal data (Right to be Forgotten)</option>
                  <option value="withdrawal">Withdraw my previously given consent</option>
                </select>
              </div>

              {/* Request Details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Request Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe in detail what specific data or records this request relates to, and what modifications or summary you require."
                  className={cn(
                    "bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full h-28 resize-none backdrop-blur-md",
                    errors.details 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50" 
                      : "border-white/10 focus:border-primary/50 focus:ring-primary/50"
                  )}
                />
                {errors.details && (
                  <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                    {errors.details}
                  </motion.span>
                )}
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0 focus:ring-1"
                  />
                  <span className="text-xs text-neutral-300 leading-normal">
                    I consent to Zenlio processing this request details and personal information to verify and fulfill my request under the India DPDP Act 2023. I understand this request is sent directly to the nominated Grievance Officer.
                  </span>
                </label>
                {errors.consent && (
                  <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 font-medium ml-1">
                    {errors.consent}
                  </motion.span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full text-base font-bold mt-2"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Data Rights Request"}</span>
              </Button>

              {/* Status Message */}
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
          </div>
        </div>
      </motion.div>
    </main>
  );
}
