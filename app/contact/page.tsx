import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Book a Free AI Strategy Call & Systems Audit | Zenlio",
  description: "Get in touch with Zenlio to build custom websites, CRM integrations, and n8n workflow automations. Book your free systems audit today.",
  alternates: {
    canonical: "https://zenlio.agency/contact",
  },
  openGraph: {
    title: "Book a Free AI Strategy Call & Systems Audit | Zenlio",
    description: "Get in touch with Zenlio to build custom websites, CRM integrations, and n8n workflow automations. Book your free systems audit today.",
    url: "https://zenlio.agency/contact",
    type: "website",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
