import type { Metadata } from 'next';
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import TextAnimation from "@/components/ui/scroll-text";

export const metadata: Metadata = {
  title: "Enterprise Web Design & Custom Automation | Zenlio",
  description: "Bespoke technical architecture, high-performance web systems, and complex AI workflow automation for enterprise and fast-growing organizations.",
  alternates: {
    canonical: "https://zenlio.agency/enterprise",
  },
};

export default function EnterprisePage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pt-32 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6 mx-auto mb-24 min-h-[50vh] flex flex-col justify-center">
        <div className="flex flex-col space-y-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              ZENLIO ENTERPRISE OS
            </div>
          </div>
          <TextAnimation
            as="h1"
            text="Bespoke Architecture for Complex Operations."
            classname="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white normal-case"
            direction="up"
          />
          <TextAnimation
            as="p"
            text="We design fully customized digital ecosystems, multi-brand platforms, and deep API integrations to solve your organization's most pressing bottlenecks."
            classname="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed normal-case mt-6"
            direction="up"
          />
        </div>
      </div>
      <CTA />
      <Footer />
    </main>
  );
}
