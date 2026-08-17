import type { Metadata } from 'next';
import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Insights & Perspectives",
  description: "Read the latest articles on workflow automation, CRM integration, n8n automation, and custom digital systems from the Zenlio team.",
  alternates: {
    canonical: "https://zenlio.io/blog",
  },
  openGraph: {
    title: "Insights & Perspectives | Zenlio Blog",
    description: "Read the latest articles on workflow automation, CRM integration, n8n automation, and custom digital systems from the Zenlio team.",
    url: "https://zenlio.io/blog",
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
