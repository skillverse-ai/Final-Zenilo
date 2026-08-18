import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: "Zenlio - Web Design & Automation Agency",
  description: "Scale your business with custom AI workflows, autonomous systems, and high-performance web design. Book a free automation systems audit with Zenlio today.",
  alternates: {
    canonical: "https://zenlio.agency",
  },
  openGraph: {
    title: "Zenlio - Web Design & Automation Agency",
    description: "Scale your business with custom AI workflows, autonomous systems, and high-performance web design. Book a free automation systems audit with Zenlio today.",
    url: "https://zenlio.agency",
    type: "website",
  }
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://zenlio.agency/#organization",
    "name": "Zenlio",
    "url": "https://zenlio.agency",
    "logo": "https://zenlio.agency/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/zenlio",
      "https://twitter.com/zenlio"
    ],
    "description": "Outcome-focused automation and high-performance web systems for small teams ready to scale without expanding headcount.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@zenlio.agency",
      "contactType": "Grievance & Customer Support"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://zenlio.agency/#website",
    "name": "Zenlio",
    "url": "https://zenlio.agency"
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://zenlio.agency/#service-web",
        "name": "Custom Website Development",
        "description": "High-performance custom Next.js web systems built to maximize conversion rates and speed.",
        "provider": {
          "@type": "Organization",
          "@id": "https://zenlio.agency/#organization"
        },
        "areaServed": "Worldwide"
      },
      {
        "@type": "Service",
        "@id": "https://zenlio.agency/#service-automation",
        "name": "AI Lead Capture & Workflow Automation",
        "description": "Custom n8n and Make workflow integrations, automated lead routing, and customer support databases.",
        "provider": {
          "@type": "Organization",
          "@id": "https://zenlio.agency/#organization"
        },
        "areaServed": "Worldwide"
      },
      {
        "@type": "Service",
        "@id": "https://zenlio.agency/#service-crm",
        "name": "Connected CRM Systems & Onboarding",
        "description": "Automatic form-to-CRM syncing, client onboarding sequence pipelines, and pipeline dashboard tracking.",
        "provider": {
          "@type": "Organization",
          "@id": "https://zenlio.agency/#organization"
        },
        "areaServed": "Worldwide"
      }
    ]
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Web Design & Automation Systems That Let Your Business Run Itself",
    "description": "Outcome-focused automation and high-performance web systems for small teams ready to scale without expanding headcount.",
    "image": "https://zenlio.agency/logo.png",
    "datePublished": "2026-08-17T12:00:00Z",
    "dateModified": "2026-08-17T12:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://zenlio.agency"
    },
    "author": {
      "@type": "Organization",
      "@id": "https://zenlio.agency/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://zenlio.agency/#organization"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zenlio.agency"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the pricing work for international vs Indian clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer transparent package pricing with an easy toggle to view rates in USD ($) or INR (₹). Billing will be processed in your local or preferred currency."
        }
      },
      {
        "@type": "Question",
        "name": "Are maintenance and optimization included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic deployment and performance optimization are included in all packages. Recurring monthly maintenance, workflow monitoring, and AI agent upgrades are available as flexible monthly add-ons."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical project take to deploy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most standard website and automation projects take between 2 to 4 weeks to launch. Complex AI agent systems or enterprise integrations may take 6 to 8 weeks depending on the bespoke architecture required."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide training on how to use the automated workflows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We hand over the systems with comprehensive documentation and a live walk-through session to ensure your team is confident using the new automations."
        }
      },
      {
        "@type": "Question",
        "name": "Can we request custom integrations or AI features?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our 'Custom Solutions' tier is built specifically for bespoke web platforms, specialized RAG systems, voice agents, and complex multi-tool enterprise automation."
        }
      },
      {
        "@type": "Question",
        "name": "What tech stack do you use for custom development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in modern, high-performance stacks like Next.js, React, and Tailwind CSS for the frontend, powered by specialized AI tools, n8n for workflow automation, and robust scalable backends tailored to your needs."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
    </>
  );
}
