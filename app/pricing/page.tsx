import type { Metadata } from 'next';
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pricing Packages | Zenlio",
  description: "Transparent pricing for web design and AI automation systems. Choose the package that fits your business scale.",
  alternates: {
    canonical: "https://zenlio.agency/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-background">
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
