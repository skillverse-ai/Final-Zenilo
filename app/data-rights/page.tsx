import type { Metadata } from 'next';
import DataRightsClient from './DataRightsClient';

export const metadata: Metadata = {
  title: "DPDP Data Rights Request Portal | Zenlio",
  description: "Manage your privacy choices or exercise your statutory data principal rights (access, erasure, correction) under the DPDP Act 2023 with Zenlio.",
  alternates: {
    canonical: "https://zenlio.agency/data-rights",
  },
  openGraph: {
    title: "DPDP Data Rights Request Portal | Zenlio",
    description: "Manage your privacy choices or exercise your statutory data principal rights (access, erasure, correction) under the DPDP Act 2023 with Zenlio.",
    url: "https://zenlio.agency/data-rights",
    type: "website",
  }
};

export default function DataRightsPage() {
  return <DataRightsClient />;
}
