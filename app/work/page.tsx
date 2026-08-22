import type { Metadata } from 'next';
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies | Zenlio",
  description: "Explore our portfolio of custom web design, complex integrations, and AI automation systems built for growing agencies.",
  alternates: {
    canonical: "https://zenlio.agency/work",
  },
};

export default function WorkPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-[#0a0a0a]">
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
