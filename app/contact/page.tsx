import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Book a Free Strategy Call",
  description: "Get in touch with Zenlio to build custom websites, CRM integrations, and n8n workflow automations. Book your free systems audit today.",
  alternates: {
    canonical: "https://zenlio.io/contact",
  },
  openGraph: {
    title: "Book a Free Strategy Call | Zenlio",
    description: "Get in touch with Zenlio to build custom websites, CRM integrations, and n8n workflow automations. Book your free systems audit today.",
    url: "https://zenlio.io/contact",
    type: "website",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
