import type { Metadata } from 'next';
import { Problem } from "@/components/sections/Problem";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "The Growth Bottlenecks | Zenlio",
  description: "Learn how manual processes, low conversion rates, and disconnected systems are costing your business leads.",
  alternates: {
    canonical: "https://zenlio.agency/problem",
  },
};

export default function ProblemPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-16 bg-[#0a0a0a]">
      <Problem />
      <CTA />
      <Footer />
    </main>
  );
}
