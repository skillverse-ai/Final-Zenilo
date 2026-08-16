"use client";

import React, { useState } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

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
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
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
          title="Get in touch"
          description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
          contactInfo={[
            {
              icon: MailIcon,
              label: "Email",
              value: "hello@zenlio.io",
            },
            {
              icon: PhoneIcon,
              label: "Phone",
              value: "+1 (555) 019-2834",
            },
            {
              icon: MapPinIcon,
              label: "Address",
              value: "San Francisco, CA",
              className: "col-span-1 md:col-span-2 lg:col-span-1",
            },
          ]}
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
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Email</label>
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

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Phone <span className="text-neutral-500 font-normal lowercase tracking-normal">(Optional)</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full backdrop-blur-md"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help systemize your growth?"
                className={cn(
                  "bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-colors w-full h-24 resize-none backdrop-blur-md",
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
