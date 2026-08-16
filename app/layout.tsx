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
  title: "Zenlio | Scale Your Business With Us",
  description: "Website + Automation Agency",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grift.variable} ${newOrder.variable} dark antialiased`}
      suppressHydrationWarning
    >
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
