import type { Metadata } from 'next';
import { Services } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Services & Features | Zenlio",
  description: "We engineer custom ecosystems combining high-conversion design with ruthless automation. Discover our web design and AI workflow services.",
  alternates: {
    canonical: "https://zenlio.agency/features",
  },
};

export default function FeaturesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-[#0a0a0a]">
      <Services />
      <CTA />
      <Footer />
    </main>
  );
}
