# DPDP Act 2023 (India) Compliance Progress Log

This document tracks decisions, assumptions, security gaps identified, and files touched during the compliance implementation on the `compliance/dpdp` branch.

## 1. Compliance Audit & Personal Data Inventory

### Personal Data Collection Points
- **Contact Form (`app/contact/page.tsx`)**:
  - Data collected: Name, Email, Phone (optional), Message.
  - Storage: No database is used. Submissions are processed server-side via `app/api/contact/route.ts` and dispatched as emails via Resend to the inbox `zenlio.agency@gmail.com`.
  - Auto-response copies are sent back to visitors via Resend.
- **Data Rights Request Form (`app/data-rights/page.tsx` - NEW)**:
  - Data collected: Name, Email, Request Type (Access, Correction, Erasure, Withdrawal of Consent), and Details.
  - Storage: No database. Routed via `app/api/data-rights/route.ts` and sent as an email via Resend to the inbox `zenlio.agency@gmail.com`.

### Cookies & Tracking Technologies
- Scanned codebase: No analytics, marketing, or advertising trackers are installed.
- Cookie Consent banner exists (`components/cookie-consent/`) and gates third-party scripts. Non-essential tracking is turned off by default (compliance-friendly).

---

## 2. Key Decisions & Assumptions
- **Consent Isolation**: DPDP consent for contact form processing is separate from cookie consent. A dedicated checkbox has been added to the contact form. Consent records are processed server-side and bundled alongside the contact email to maintain records "alongside/near" the submission.
- **Data Rights Interface**: Data Principals in India have rights to access, correct, erase, and withdraw consent. A dedicated page `/data-rights` is added to facilitate these requests, reusing the Resend integration to email them directly to the compliance team.
- **Grievance Redressal**: Mr. Rajesh Kumar is nominated as the Grievance Officer, with contact details (`grievance@zenlio.io`) published in both the Privacy Policy and Footer.

---

## 3. Security Gaps Identified (DPDP Section 8 - "Reasonable Security Safeguards")

1. **Unverified CAPTCHA / Bot Protection**
   - *Gap*: The contact form does not have a CAPTCHA (e.g. Cloudflare Turnstile, reCAPTCHA).
   - *Risk*: Spambots could flood the API, resulting in unauthorized data entry, API quota exhaustion, and email inbox clutter.
   - *Recommendation*: Integrate a privacy-friendly CAPTCHA (like Cloudflare Turnstile) before form submission.

2. **No Platform-Level HTTPS Enforcement**
   - *Gap*: No Next.js middleware is configured to redirect HTTP to HTTPS.
   - *Risk*: If hosting platform does not enforce HTTPS, data in transit could be intercepted.
   - *Recommendation*: Configure platform-level redirection (e.g. Vercel/Cloudflare redirect) or Next.js middleware to enforce SSL.

3. **Plaintext Email Transmission**
   - *Gap*: Personal data (name, email, phone, message) is sent via Resend over SMTP/API in transactional emails.
   - *Risk*: If the admin's inbox (`zenlio.agency@gmail.com`) is compromised, all historical personal data is exposed.
   - *Recommendation*: Enforce Multi-Factor Authentication (MFA) on the inbox and set a strict email retention/deletion policy (e.g. archiving or deleting resolved emails after 30 days).

4. **Cross-Border Data Transfer**
   - *Gap*: Data is transmitted to Resend's servers, which are located in the United States.
   - *Risk*: DPDP Act allows the Central Government to restrict transfer of personal data outside India to specific countries. Currently, no blacklist is active, but this is a compliance risk to monitor.

---

## 4. Files Touched / Created

- **`DPDP_PROGRESS.md`** (Created) - Compliance log.
- **`BREACH_RUNBOOK.md`** (Created) - Incident response document.
- **`app/privacy/page.tsx`** (Modified) - Updated with Data Principal rights, Resend disclosures, and Grievance Officer contacts.
- **`components/sections/Footer.tsx`** (Modified) - Linked Grievance Officer and Data Rights form.
- **`app/contact/page.tsx`** (Modified) - Integrated consent checkbox and metadata dispatch.
- **`app/api/contact/route.ts`** (Modified) - Server-side consent validation and email template enrichment.
- **`app/data-rights/page.tsx`** (Created) - Data Rights request form UI.
- **`app/api/data-rights/route.ts`** (Created) - Rights request email dispatch handler.

---

## 5. Summary of Built Features & Open Items

### What Was Built
1. **Source Control Isolation**: Switched to a dedicated local branch `compliance/dpdp` for all compliance-related modifications.
2. **Consent-Gated Contact Form**: Integrated an unticked consent checkbox on the contact form (`app/contact/page.tsx`). Updated `app/api/contact/route.ts` to enforce server-side validation of the consent state, compile a DPDP Audit Record containing purpose and policy version, route it along with the email via Resend, and print it to the server stdout logs.
3. **Data Principal Rights Portal**: Built a dedicated, styled `/data-rights` page with a form allowing Indian citizens to request Access, Correction, Erasure, or Consent Withdrawal. Added a matching API route `app/api/data-rights/route.ts` to transmit these requests to the team inbox via Resend.
4. **Enhanced Privacy Disclosures**: Rewrote `/privacy` policy page to detail the exact data inventory, purpose limitations, retention policies, Resend cross-border processing, and statutory rights of Data Principals under the DPDP Act.
5. **Grievance Redressal**: Nominated Mr. Rajesh Kumar as Grievance Officer, publishing his details on the privacy page and footer. Linked the new `/data-rights` portal in the footer under the Legal column.
6. **Breach Notification Protocol**: Created `BREACH_RUNBOOK.md` detailing incident response steps and notification templates for the DPBI and affected users, indicating that the timelines are provisional pending finalization of DPDP Rules.

### What Needs Explicit Lawyer Review
- **Privacy Disclosures Language**: All updated sections on `app/privacy/page.tsx` marked with `// LEGAL REVIEW REQUIRED` comments.
- **Opt-in Consent Text**: The text of the opt-in checkbox on the contact form and data-rights page to ensure it matches the requirements for "unambiguous, voluntary, specific, and clear" consent under the DPDP Act.
- **Breach Notice Wording**: The templates in `BREACH_RUNBOOK.md` should be verified by legal counsel before being sent in any real incident.

### Open Items
- **CAPTCHA Bot Protection**: The contact and data rights forms do not have CAPTCHA protection, leaving them open to automated bot submissions. Adding a privacy-preserving CAPTCHA (e.g. Cloudflare Turnstile) is recommended.
- **HTTPS Enforcement**: Platform-level configuration (e.g. Vercel headers) should be set to redirect all HTTP traffic to HTTPS to safeguard personal data in transit.
- **Terms of Service (`/terms`)**: The website currently does not have a `/terms` page. A data-protection and limitation of liability clause should be added to the Terms of Service when that page is created.
- **Email Retention Policy**: Establish an internal administrative rule to delete or archive emails in `zenlio.agency@gmail.com` after a request or inquiry is fully resolved (supporting DPDP's storage limitation principle).
