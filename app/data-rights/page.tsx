import type { Metadata } from 'next';
import DataRightsClient from './DataRightsClient';

export const metadata: Metadata = {
  title: "Data Principal Rights Portal",
  description: "Exercise your statutory data privacy rights (Access, Correction, Erasure, or Consent Withdrawal) under India's Digital Personal Data Protection (DPDP) Act 2023.",
  alternates: {
    canonical: "https://zenlio.io/data-rights",
  },
  openGraph: {
    title: "Data Principal Rights Portal | Zenlio",
    description: "Exercise your statutory data privacy rights (Access, Correction, Erasure, or Consent Withdrawal) under India's Digital Personal Data Protection (DPDP) Act 2023.",
    url: "https://zenlio.io/data-rights",
    type: "website",
  }
};

export default function DataRightsPage() {
  return <DataRightsClient />;
}
