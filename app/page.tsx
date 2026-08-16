import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { OrbitingCirclesGlobeSection } from "@/components/sections/OrbitingGlobe";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <Solution />
      <Testimonials />
      <Pricing />
      <FAQ />
      <OrbitingCirclesGlobeSection />
      <CTA />
      <Footer />
    </main>
  );
}
