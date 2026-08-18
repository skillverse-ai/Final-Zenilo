"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextAnimation from "@/components/ui/scroll-text";

const faqs = [
  {
    question: "How does the pricing work for international vs Indian clients?",
    answer: "We offer transparent package pricing with an easy toggle to view rates in USD ($) or INR (₹). Billing will be processed in your local or preferred currency.",
  },
  {
    question: "Are maintenance and optimization included?",
    answer: "Basic deployment and performance optimization are included in all packages. Recurring monthly maintenance, workflow monitoring, and AI agent upgrades are available as flexible monthly add-ons.",
  },
  {
    question: "How long does a typical project take to deploy?",
    answer: "Most standard website and automation projects take between 2 to 4 weeks to launch. Complex AI agent systems or enterprise integrations may take 6 to 8 weeks depending on the bespoke architecture required.",
  },
  {
    question: "Do you provide training on how to use the automated workflows?",
    answer: "Absolutely. We hand over the systems with comprehensive documentation and a live walk-through session to ensure your team is confident using the new automations.",
  },
  {
    question: "Can we request custom integrations or AI features?",
    answer: "Yes! Our 'Custom Solutions' tier is built specifically for bespoke web platforms, specialized RAG systems, voice agents, and complex multi-tool enterprise automation.",
  },
  {
    question: "What tech stack do you use for custom development?",
    answer: "We specialize in modern, high-performance stacks like Next.js, React, and Tailwind CSS for the frontend, powered by specialized AI tools, n8n for workflow automation, and robust scalable backends tailored to your needs.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#0c0c0c] py-24 md:py-32 relative border-b border-white/5">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:w-1/3 shrink-0 lg:sticky lg:top-32">
            <div className="space-y-6">
              <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
                Support & Details
              </div>
              <TextAnimation
                as="h2"
                text="Frequently Asked Questions"
                classname="text-4xl font-bold tracking-tight sm:text-5xl text-white leading-[1.1] normal-case"
                direction="up"
              />
              <TextAnimation
                as="p"
                text="Everything you need to know about our packages, processes, and how we deliver value."
                classname="text-neutral-400 text-lg leading-relaxed normal-case"
                direction="up"
              />

            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:w-2/3 flex-1 w-full">
            <div className="flex flex-col border-t border-white/5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="border-b border-white/5 group">
                    <h3 className="w-full m-0 p-0">
                      <button
                        onClick={() => toggleFaq(index)}
                        className={`w-full flex items-center justify-between py-8 text-left transition-colors duration-300 ${
                          isOpen ? "text-primary" : "text-white hover:text-primary/80"
                        }`}
                      >
                        <span className="text-lg md:text-xl font-semibold pr-8 leading-snug">
                          {faq.question}
                        </span>
                        <div className={`p-2 rounded-full border transition-all duration-300 shrink-0 ${
                          isOpen ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-white group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5"
                        }`}>
                          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <Plus className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </button>
                    </h3>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-neutral-400 text-base md:text-lg leading-relaxed pb-8 pr-12">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
