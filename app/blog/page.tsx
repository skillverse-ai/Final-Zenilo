import type { Metadata } from 'next';
import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "AI Automation & Operations Blog | Zenlio",
  description: "Discover how to scale operations using AI agents, n8n workflows, and custom CRM systems. Read the Zenlio automation blog for expert insights.",
  alternates: {
    canonical: "https://zenlio.agency/blog",
  },
  openGraph: {
    title: "AI Automation & Operations Blog | Zenlio Blog",
    description: "Discover how to scale operations using AI agents, n8n workflows, and custom CRM systems. Read the Zenlio automation blog for expert insights.",
    url: "https://zenlio.agency/blog",
    type: "website",
  }
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-black pt-10">
      <Blog />
      <Footer />
    </main>
  );
}
