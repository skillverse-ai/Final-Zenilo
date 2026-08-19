import React from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zenlio",
  description: "Terms and conditions for Zenlio's web development, SaaS, and AI automation services.",
  alternates: {
    canonical: "https://zenlio.agency/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Zenlio",
    description: "Terms and conditions for Zenlio's web development, SaaS, and AI automation services.",
    url: "https://zenlio.agency/terms",
    type: "website",
  }
};

export default function TermsPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-[family-name:var(--font-chillax)]">
              Terms & Conditions
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 18, 2026
            </p>
          </div>

          <div className="space-y-10 text-neutral-300 leading-relaxed font-sans">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm font-semibold text-white mb-2">Legal Disclaimer</p>
              <p className="text-sm text-neutral-400">
                Please read these Terms and Conditions ("Terms", "Agreement") carefully before engaging Zenlio ("us", "we", or "our") for web development or AI automation services. This Agreement sets forth the legally binding terms and conditions for your use of our services.
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. Acceptance of Terms</h2>
              <p className="text-sm text-neutral-400">
                By signing a Statement of Work (SOW), accepting a quote, paying a deposit, or otherwise engaging Zenlio for services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions of this agreement, you may not access or use our services.
              </p>
            </section>

            {/* 2. Description of Services */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. Description of Services</h2>
              <p className="text-sm text-neutral-400">
                Zenlio provides digital agency services, which may include but are not limited to: custom website development, SaaS product development, AI automation architecture, AI chatbots, and maintenance services. The specific scope of work, deliverables, and timelines will be detailed in individual project proposals or Statements of Work (SOW) provided to the client.
              </p>
            </section>

            {/* 3. Fees, Payments, and SaaS Subscriptions */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. Fees & Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-400">
                <li><strong>Project Deposits:</strong> Standard custom projects require a 50% non-refundable deposit prior to the commencement of work, with the remaining 50% due upon completion but prior to deployment.</li>
                <li><strong>SaaS / Retainers:</strong> Monthly subscription services or maintenance retainers are billed in advance on the 1st of each month. Failure to pay may result in immediate suspension of associated services, hosting, or API access.</li>
                <li><strong>Late Fees:</strong> Invoices not paid within 14 days of the due date will incur a late fee of 1.5% per month on the outstanding balance.</li>
                <li><strong>Additional Costs:</strong> The client is responsible for third-party costs outside the agreed scope, including but not limited to premium fonts, stock photography, third-party API usage fees (e.g., OpenAI, Anthropic), and specialized hosting unless explicitly included in the SOW.</li>
              </ul>
            </section>

            {/* 4. Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. Intellectual Property Rights</h2>
              <p className="text-sm text-neutral-400">
                <strong>Pre-existing Material:</strong> Zenlio retains all intellectual property rights to our pre-existing codebases, frameworks, proprietary AI prompt architectures, and internal tools used to create your deliverables.
              </p>
              <p className="text-sm text-neutral-400">
                <strong>Client Deliverables:</strong> Upon full payment of all undisputed fees, Zenlio grants the client a non-exclusive, perpetual, worldwide license to use, display, and modify the final custom code, designs, and workflows delivered under the specific SOW for their intended business purpose. Zenlio reserves the right to showcase the completed work in our portfolio.
              </p>
            </section>

            {/* 5. AI-Specific Addendum */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. AI Automation Addendum</h2>
              <p className="text-sm text-neutral-400">
                Due to the probabilistic and rapidly evolving nature of Artificial Intelligence (AI) technologies, the following specialized terms apply to all AI automation services provided by Zenlio:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-400">
                <li><strong>AI "Hallucinations" & Accuracy:</strong> AI models generate outputs based on probability and may occasionally produce inaccurate, illogical, or inappropriate responses (commonly known as "hallucinations"). Zenlio implements prompt engineering best practices and guardrails, but we <strong>cannot guarantee 100% accuracy</strong> of any AI-generated output. The client is solely responsible for verifying AI outputs before using them in critical business operations or public-facing communications.</li>
                <li><strong>Third-Party Dependencies:</strong> Our AI solutions often rely on third-party APIs (e.g., OpenAI, Anthropic, Google). Zenlio is not liable for service outages, deprecated models, latency, or unannounced pricing/policy changes enforced by these third-party providers. If a third-party provider drastically changes their service, Zenlio may require a separate change order to migrate your automation to a new model.</li>
                <li><strong>Data Privacy & Input:</strong> Zenlio routes client data through third-party APIs strictly to execute the agreed-upon automation tasks. We configure these API calls to opt-out of model training wherever technically possible. However, the client is solely responsible for ensuring they possess the legal right and necessary user consent (under GDPR, DPDP Act, etc.) to process their customers' personal data through these AI systems.</li>
              </ul>
            </section>

            {/* 6. Client Responsibilities */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">6. Client Responsibilities</h2>
              <p className="text-sm text-neutral-400">
                The client agrees to provide timely feedback, approvals, and any necessary content (text, images, branding guidelines, API access) required for Zenlio to perform the services. Delays in client feedback exceeding 7 business days may result in project timeline extensions or project pausing.
              </p>
            </section>

            {/* 7. Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">7. Limitation of Liability</h2>
              <p className="text-sm text-neutral-400">
                To the maximum extent permitted by applicable law, Zenlio and its affiliates, directors, or employees shall not be liable for any indirect, punitive, incidental, special, or consequential damages, including loss of profits, data, or business opportunities, arising out of or related to the services provided.
              </p>
              <p className="text-sm text-neutral-400">
                In no event shall Zenlio's aggregate liability for any claims related to the services exceed the total amount paid by the client to Zenlio in the six (6) months immediately preceding the event giving rise to the claim.
              </p>
            </section>

            {/* 8. Termination */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">8. Termination</h2>
              <p className="text-sm text-neutral-400">
                Either party may terminate this agreement or an active SOW with 30 days written notice. In the event of termination by the client prior to project completion, Zenlio will retain the non-refundable deposit and invoice for all pro-rated work completed up to the date of termination. Zenlio reserves the right to terminate services immediately without notice if the client breaches any material term of this agreement, including non-payment.
              </p>
            </section>

            {/* 9. Governing Law */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">9. Governing Law</h2>
              <p className="text-sm text-neutral-400">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding related to this website or services shall be brought exclusively in a competent court located in India.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">10. Contact Information</h2>
              <p className="text-sm text-neutral-400">
                If you have any questions about these Terms, please contact our legal team:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 backdrop-blur-md">
                <p className="text-sm font-semibold text-white">Contact Information:</p>
                <p className="text-sm"><span className="text-neutral-400">Email:</span> <a href="mailto:contact@zenlio.agency" className="text-white underline hover:text-[#ccff00]">contact@zenlio.agency</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
