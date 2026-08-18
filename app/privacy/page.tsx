import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Data Rights | Zenlio",
  description: "Understand how Zenlio processes your data in compliance with the DPDP Act 2023. Read our privacy policy and manage your data principal rights.",
  alternates: {
    canonical: "https://zenlio.agency/privacy",
  },
  openGraph: {
    title: "Privacy Policy & DPDP Data Rights | Zenlio",
    description: "Understand how Zenlio processes your data in compliance with the DPDP Act 2023. Read our privacy policy and manage your data principal rights.",
    url: "https://zenlio.agency/privacy",
    type: "website",
  }
};

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-[family-name:var(--font-new-order)]">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 16, 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed font-sans">
            {/* // LEGAL REVIEW REQUIRED: DPDP Act Overview */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. What is the scope of this privacy policy?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> This privacy policy details how Zenlio collects, processes, and protects your personal data when you use our website. We operate in strict compliance with data privacy regulations, including the Digital Personal Data Protection Act, 2023, ensuring transparency and security.
              </p>
              <p className="text-sm text-neutral-400">
                Zenlio ("we," "our," or "us") operates the Zenlio website. We are committed to protecting your personal data and respecting your privacy in accordance with applicable laws, including the <strong>Digital Personal Data Protection (DPDP) Act, 2023 (India)</strong>. This Privacy Policy describes how we collect, use, and store information when you interact with our website.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. What personal information does Zenlio collect?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio collects only the personal information you voluntarily submit through our contact and data-rights forms. This consists of your name, email address, optional phone number, text queries inside form message fields, and explicit consent metadata containing the timestamp and policy version.
              </p>
              <p className="text-sm text-neutral-400">
                We only collect personal information that you voluntarily provide to us when using our contact forms or data-rights forms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li><strong>Contact Details</strong>: Your Name, Email Address, and Phone Number (optional).</li>
                <li><strong>Message / Request Contents</strong>: Any text, queries, or information you provide in our form message fields.</li>
                <li><strong>Consent Metadata</strong>: Explicit records of consent (including purpose, timestamp, and policy version) captured during form submission.</li>
              </ul>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Purpose Limitation */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. Why does Zenlio process your personal data?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio processes your personal data strictly to respond to your service inquiries, compile website audits, and deliver services. We use Resend to securely route contact forms to our compliance mailbox, ensuring that data is never sold or shared for marketing.
              </p>
              <p className="text-sm text-neutral-400">
                In compliance with the DPDP Act 2023, we process your personal data strictly for specified, lawful purposes based on your explicit consent:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li><strong>Purpose</strong>: To respond to your service inquiries, coordinate consultations, and communicate about our offerings.</li>
                <li><strong>Third-Party Processors</strong>: We use <strong>Resend</strong> (a secure, transactional email service) to route contact submissions and data rights requests directly to our compliance inbox (<strong>contact@zenlio.agency</strong>). Personal data is processed on Resend's secure cloud servers (which may be located outside of India, such as in the United States).</li>
                <li>We do <strong>not</strong> sell, rent, share, or trade your personal data with third parties for marketing or analytical purposes.</li>
                <li>We do <strong>not</strong> store your form submissions in a persistent database; they exist solely as transactional emails in our inbox and Resend logs.</li>
              </ul>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Retention Policy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. How long does Zenlio retain your personal data?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio retains your personal data only as long as necessary to resolve your inquiry or fulfill our service obligations. Upon correspondence completion or when a deletion request is filed, we permanently erase all emails and contact logs within thirty days.
              </p>
              <p className="text-sm text-neutral-400">
                We retain your personal data only as long as necessary to fulfill the purpose for which it was collected (e.g., resolving your inquiry). Once the correspondence has ended or you request erasure, we will delete your emails and personal records within <strong>30 days</strong>, unless required to retain it by other applicable laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. Does Zenlio use tracking cookies?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> No, Zenlio does not use third-party tracking cookies, web beacons, or analytical scripts on this site. We only run a minimal local storage preference key to remember your cookie consent preferences, ensuring your privacy choices are respected automatically.
              </p>
              <p className="text-sm text-neutral-400">
                We do not employ any third-party advertising, analytics, or behavioral tracking scripts on our website.
              </p>
              <p className="text-sm text-neutral-400">
                We use a minimal local storage cookie configuration to store your consent choices under the key <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-xs text-[#ccff00]">zenlio_cookie_consent</code>. This is required solely to respect your consent preferences. Refer to our <a href="/cookies" className="text-white underline hover:text-[#ccff00] transition-colors">Cookie Policy</a> for detailed descriptions.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Data Security */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">6. How does Zenlio secure your personal data?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Zenlio secures your personal data by encrypting all form transmissions with HTTPS protocol and protecting target mailboxes with multi-factor authentication. We restrict access to API keys and transactional email logs, preventing unauthorized access or disclosure.
              </p>
              <p className="text-sm text-neutral-400">
                We implement reasonable security safeguards to protect your personal data from unauthorized access, loss, or disclosure. All form transmissions are encrypted using standard HTTPS protocol. Access to our Resend API keys and target mailboxes is strictly restricted and protected by multi-factor authentication (MFA).
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Data Principal Rights */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">7. What are your statutory rights as a data principal?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> Under the India DPDP Act 2023, data principals have the right to access summaries of their personal data, request correction or erasure, withdraw consent, nominate others in case of incapacity, and file grievances with the Data Protection Board of India.
              </p>
              <p className="text-sm text-neutral-400">
                If you are an Indian citizen (Data Principal under the DPDP Act 2023), you have the following statutory rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li><strong>Right to Access</strong>: Request a summary of the personal data we process about you and the processing activities we carry out.</li>
                <li><strong>Right to Correction & Erasure</strong>: Request correction of inaccurate/outdated data, or the deletion/erasure of your personal data when it is no longer necessary for the purpose.</li>
                <li><strong>Right to Withdraw Consent</strong>: Withdraw your consent at any time. Upon withdrawal, we will cease processing your personal data, subject to legal requirements.</li>
                <li><strong>Right to Nomination</strong>: Nominate another individual to exercise your rights under the DPDP Act in the event of your death or incapacity.</li>
                <li><strong>Right to Grievance Redressal</strong>: Seek redressal for any complaints regarding the processing of your personal data by contacting us first. If your concern is not resolved, you have the right to file a complaint with the Data Protection Board of India (DPBI).</li>
              </ul>
              <p className="text-sm pt-2">
                To exercise any of these rights, please submit a request through our dedicated <a href="/data-rights" className="text-white underline hover:text-[#ccff00] transition-colors">Data Rights Request Portal</a>.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Contact Details */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">8. How can you file a grievance or contact us?</h2>
              <p className="text-sm">
                <strong>Direct Answer:</strong> You can file a grievance or contact our compliance team directly by emailing contact@zenlio.agency. We commit to acknowledging your request within forty-eight hours and fully resolving any data processing queries or complaints within thirty days.
              </p>
              <p className="text-sm text-neutral-400">
                If you have any questions, feedback, or complaints regarding the processing of your personal data, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 backdrop-blur-md">
                <p className="text-sm font-semibold text-white">Contact Information:</p>
                <p className="text-sm"><span className="text-neutral-400">Email:</span> <a href="mailto:contact@zenlio.agency" className="text-white underline hover:text-[#ccff00]">contact@zenlio.agency</a></p>
                <p className="text-xs text-neutral-400 pt-1">
                  We commit to acknowledging your inquiry within 48 hours and resolving it within 30 days of receipt.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
