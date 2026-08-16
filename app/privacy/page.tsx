import React from "react";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 16, 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed">
            {/* // LEGAL REVIEW REQUIRED: DPDP Act Overview */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. Overview</h2>
              <p className="text-sm">
                Zenlio ("we," "our," or "us") operates the Zenlio website. We are committed to protecting your personal data and respecting your privacy in accordance with applicable laws, including the <strong>Digital Personal Data Protection (DPDP) Act, 2023 (India)</strong>. This Privacy Policy describes how we collect, use, and store information when you interact with our website.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. Information We Collect (Data Inventory)</h2>
              <p className="text-sm">
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
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. Purpose Limitation & Data Processing</h2>
              <p className="text-sm">
                In compliance with the DPDP Act 2023, we process your personal data strictly for specified, lawful purposes based on your explicit consent:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li><strong>Purpose</strong>: To respond to your service inquiries, coordinate consultations, and communicate about our offerings.</li>
                <li><strong>Third-Party Processors</strong>: We use <strong>Resend</strong> (a secure, transactional email service) to route contact submissions and data rights requests directly to our compliance inbox (<strong>skillverse0109@gmail.com</strong>). Personal data is processed on Resend's secure cloud servers (which may be located outside of India, such as in the United States).</li>
                <li>We do <strong>not</strong> sell, rent, share, or trade your personal data with third parties for marketing or analytical purposes.</li>
                <li>We do <strong>not</strong> store your form submissions in a persistent database; they exist solely as transactional emails in our inbox and Resend logs.</li>
              </ul>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Retention Policy */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. Retention Policy</h2>
              <p className="text-sm">
                We retain your personal data only as long as necessary to fulfill the purpose for which it was collected (e.g., resolving your inquiry). Once the correspondence has ended or you request erasure, we will delete your emails and personal records within <strong>30 days</strong>, unless required to retain it by other applicable laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. Cookies and Tracking</h2>
              <p className="text-sm">
                We do not employ any third-party advertising, analytics, or behavioral tracking scripts on our website.
              </p>
              <p className="text-sm">
                We use a minimal local storage cookie configuration to store your consent choices under the key <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-xs text-[#ccff00]">zenlio_cookie_consent</code>. This is required solely to respect your consent preferences. Refer to our <a href="/cookies" className="text-white underline hover:text-[#ccff00] transition-colors">Cookie Policy</a> for detailed descriptions.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Data Security */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">6. Data Security</h2>
              <p className="text-sm">
                We implement reasonable security safeguards to protect your personal data from unauthorized access, loss, or disclosure. All form transmissions are encrypted using standard HTTPS protocol. Access to our Resend API keys and target mailboxes is strictly restricted and protected by multi-factor authentication (MFA).
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Data Principal Rights */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">7. Data Principal Rights under DPDP</h2>
              <p className="text-sm">
                If you are an Indian citizen (Data Principal under the DPDP Act 2023), you have the following statutory rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li><strong>Right to Access</strong>: Request a summary of the personal data we process about you and the processing activities we carry out.</li>
                <li><strong>Right to Correction & Erasure</strong>: Request correction of inaccurate/outdated data, or the deletion/erasure of your personal data when it is no longer necessary for the purpose.</li>
                <li><strong>Right to Withdraw Consent</strong>: Withdraw your consent at any time. Upon withdrawal, we will cease processing your personal data, subject to legal requirements.</li>
                <li><strong>Right to Nomination</strong>: Nominate another individual to exercise your rights under the DPDP Act in the event of your death or incapacity.</li>
                <li><strong>Right to Grievance Redressal</strong>: Seek redressal for any complaints regarding the processing of your personal data by contacting our Grievance Officer first. If your concern is not resolved, you have the right to file a complaint with the Data Protection Board of India (DPBI).</li>
              </ul>
              <p className="text-sm pt-2">
                To exercise any of these rights, please submit a request through our dedicated <a href="/data-rights" className="text-white underline hover:text-[#ccff00] transition-colors">Data Rights Request Portal</a>.
              </p>
            </section>

            {/* // LEGAL REVIEW REQUIRED: Grievance Officer Details */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">8. Grievance Redressal & Contact Us</h2>
              <p className="text-sm">
                If you have any questions, feedback, or complaints regarding the processing of your personal data, please contact our nominated Grievance Officer:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 backdrop-blur-md">
                <p className="text-sm font-semibold text-white">Grievance Officer:</p>
                <p className="text-sm"><span className="text-neutral-400">Name:</span> Mr. Rajesh Kumar</p>
                <p className="text-sm"><span className="text-neutral-400">Email:</span> <a href="mailto:grievance@zenlio.io" className="text-white underline hover:text-[#ccff00]">grievance@zenlio.io</a></p>
                <p className="text-xs text-neutral-400 pt-1">
                  We commit to acknowledging your grievance within 48 hours and resolving it within 30 days of receipt.
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
