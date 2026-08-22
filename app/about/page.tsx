import type { Metadata } from 'next';
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About Us | Zenlio",
  description: "Zenlio is a web design and AI automation agency. We build the design, the automation, and the follow-through together.",
  alternates: {
    canonical: "https://zenlio.agency/about",
  },
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-[#0a0a0a]">
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
