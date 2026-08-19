import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { CookiePreferencesButton } from "@/components/cookie-consent/CookiePreferencesButton";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cookie Policy & User Consent Preferences | Zenlio",
  description: "Learn how Zenlio uses cookies and local variables to protect your privacy and manage cookie preferences in compliance with data privacy regulations.",
  alternates: {
    canonical: "https://zenlio.agency/cookies",
  },
  openGraph: {
    title: "Cookie Policy & User Consent Preferences | Zenlio",
    description: "Learn how Zenlio uses cookies and local variables to protect your privacy and manage cookie preferences in compliance with data privacy regulations.",
    url: "https://zenlio.agency/cookies",
    type: "website",
  }
};

export default function CookiesPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-[family-name:var(--font-chillax)]">
              Cookie Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 15, 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. What are website cookies?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Website cookies are small text files stored on your device that identify your browser and save configuration preferences. They help websites function efficiently, remember user settings, enable secure logins, and track visitor interactions without collecting identifiable personal data unless explicitly provided by the user.
              </p>
              <p className="text-sm text-neutral-400">
                Cookies are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide analytics data and customize your experience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. How does Zenlio use cookies on this website?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio uses cookies solely to save your privacy preferences and ensure core website elements load securely. We do not load third-party trackers, marketing scripts, or analytical trackers. The cookies we store are strictly operational to respect your consent choices during your visit.
              </p>
              <p className="text-sm text-neutral-400">
                Zenlio uses cookies to ensure our website functions correctly, to understand how visitors interact with our content, and to manage consent choices. Currently, Zenlio **does not run any third-party marketing trackers or analytics scripts**. We only store cookies and local variables to remember your preferences (like your cookie choices themselves!).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. What cookie categories does Zenlio utilize?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio utilizes Necessary cookies, Analytics cookies, and Marketing cookies, but only Necessary cookies are active. Necessary cookies store your consent status to remember preferences, while Analytics and Marketing categories remain deactivated as we do not run tracking scripts or external campaigns.
              </p>
              <div className="space-y-6 mt-4">
                <div className="p-5 rounded-[20px] bg-[#1c1c1f] border border-[#29292d] space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Necessary Cookies
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-normal">Always Active</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    These cookies are essential for core site functions, such as routing, security, and storing your consent preferences. They do not collect any personal data.
                  </p>
                </div>

                <div className="p-5 rounded-[20px] bg-[#1c1c1f] border border-[#29292d] space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Analytics Cookies</h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    These cookies help us count visits and analyze traffic sources so we can measure and improve the performance of our site. Currently, no analytics services are active on the site.
                  </p>
                </div>

                <div className="p-5 rounded-[20px] bg-[#1c1c1f] border border-[#29292d] space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Marketing Cookies</h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    These cookies are used to track advertising effectiveness and show targeted campaigns. Currently, no marketing cookies are active on the site.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. How are your cookie preferences stored?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Your cookie preferences are saved locally in your browser's local storage under the key zenlio_cookie_consent. This stores your chosen consent status, toggled permissions, creation timestamp, and the consent version, ensuring your choices persist across visits without database storage.
              </p>
              <p className="text-sm text-neutral-400">
                We save your choices in your browser's local storage. This storage saves:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400 font-sans">
                <li>Your chosen consent status (<code className="text-white">accepted</code>, <code className="text-white">rejected</code>, or <code className="text-white">custom</code>).</li>
                <li>Your custom toggled categories (Analytics and Marketing permissions).</li>
                <li>The date and time you set your preferences.</li>
                <li>The consent version (<code className="text-white">1.0.0</code>) to ensure your choices remain valid if we update our policies.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. How can you manage your cookie preferences?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> You can manage your cookie preferences by clicking the Cookie Preferences button in our footer or the direct link below. This triggers the consent panel, enabling you to modify your permissions, accept all operational tags, or reject non-essential cookie categories instantly.
              </p>
              <p className="text-sm text-neutral-400">
                You can change your consent settings at any time. Simply click the link below to open the preference panel and modify your toggles, or click "Cookie Preferences" in the footer of any page:
              </p>
              <div className="pt-2">
                <Button asChild className="font-sans">
                  <CookiePreferencesButton />
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
