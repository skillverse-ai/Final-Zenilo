import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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

const chillax = localFont({
  src: [
    { path: "../public/fonts/Chillax-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-chillax",
});

export const metadata: Metadata = {
  title: {
    default: "Zenlio - Web Design & Automation Agency",
    template: "%s - Zenlio",
  },
  description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
  metadataBase: new URL("https://www.zenlio.agency"),
  alternates: {
    canonical: "https://www.zenlio.agency",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Zenlio - Web Design & Automation Agency",
    description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
    url: "https://www.zenlio.agency",
    siteName: "Zenlio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenlio Open Graph Image",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenlio - Web Design & Automation Agency",
    description: "We build the autonomous systems, AI workflows, and high-performance websites that let your business run itself. Scale without expanding headcount.",
    images: ["https://www.zenlio.agency/og-image.png"],
  },
  verification: {
    google: "cr5U1dDFDsylw5S3R_1ji292al5MGqnb9hBgubduk28",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    apple: '/apple-icon.png?v=2',
    shortcut: '/favicon.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.zenlio.agency/#organization",
    "name": "Zenlio",
    "url": "https://www.zenlio.agency",
    "logo": "https://www.zenlio.agency/logo.png",
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
      className={`${grift.variable} ${chillax.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-HH5XTDXM3N`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HH5XTDXM3N');
            `,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "y5w076d03j");
            `,
          }}
        />
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


