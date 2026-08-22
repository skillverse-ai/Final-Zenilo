import type { Metadata } from 'next';
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Zenlio",
  description: "Got questions about how we build web design and automation systems? We've got answers.",
  alternates: {
    canonical: "https://zenlio.agency/faq",
  },
};

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-[#0a0a0a]">
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
