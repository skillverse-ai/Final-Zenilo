import type { Metadata } from 'next';
import { Solution } from "@/components/sections/Solution";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Our Process | Zenlio",
  description: "The blueprint for building your automated ecosystem. From discovery to deployment, see how we build high-performance web systems.",
  alternates: {
    canonical: "https://zenlio.agency/process",
  },
};

export default function ProcessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-background">
      <Solution />
      <CTA />
      <Footer />
    </main>
  );
}
