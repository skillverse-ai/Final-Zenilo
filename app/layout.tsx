import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/sections/Navbar";
import { CookieConsentProvider } from "@/components/cookie-consent/CookieConsentContext";
import { CookieConsentBanner } from "@/components/cookie-consent/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/cookie-consent/CookiePreferencesModal";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const grift = localFont({
  src: [
    { path: "../public/fonts/Grift-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Grift-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Grift-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Grift-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-grift",
});

const newOrder = localFont({
  src: [
    { path: "../public/fonts/New Order Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-new-order",
});

export const metadata: Metadata = {
  title: {
    default: "Zenlio - Web Design & Automation Agency",
    template: "%s - Zenlio",
  },
  description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
  metadataBase: new URL("https://zenlio.agency"),
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Zenlio - Web Design & Automation Agency",
    description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
    url: "https://zenlio.agency",
    siteName: "Zenlio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Zenlio Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenlio - Web Design & Automation Agency",
    description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
    images: ["https://zenlio.agency/logo.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://zenlio.agency/#organization",
    "name": "Zenlio",
    "url": "https://zenlio.agency",
    "logo": "https://zenlio.agency/logo.png",
    "description": "Outcome-focused automation and high-performance web systems for small teams ready to scale without expanding headcount.",
    "email": "contact@zenlio.agency",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  };

  return (
    <html
      lang="en"
      className={`${grift.variable} ${newOrder.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <SmoothScrollProvider>
          <CookieConsentProvider>
            <Navbar />
            {children}
            <CookieConsentBanner />
            <CookiePreferencesModal />
          </CookieConsentProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


