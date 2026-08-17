import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';

// // LEGAL REVIEW REQUIRED: Audit trail and consent logs captured here form the legal basis for processing data-rights requests.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, requestType, details, consent, website } = body;

    // Honeypot bot protection
    if (website && typeof website === 'string' && website.trim() !== '') {
      console.warn('[Bot Prevention]: Honeypot field filled by bot in data rights form. Silently dropping request.');
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully',
      });
    }

    // Rate Limiting (5 requests per minute per IP)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const rateLimitCheck = checkRateLimit(ip, 5, 60000);
    if (!rateLimitCheck.success) {
      console.warn(`[Rate Limiting]: Too many requests on Data Rights Portal from IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again after some time.' },
        { status: 429 }
      );
    }

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!details || typeof details !== 'string' || details.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Request details are required' },
        { status: 400 }
      );
    }

    const validRequestTypes = ['access', 'correction', 'erasure', 'withdrawal'];
    if (!requestType || !validRequestTypes.includes(requestType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request type' },
        { status: 400 }
      );
    }

    // DPDP Consent check for processing request
    if (!consent || typeof consent !== 'object' || consent.given !== true) {
      return NextResponse.json(
        { success: false, message: 'Explicit consent is required to process your rights request.' },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedDetails = sanitizeInput(details.trim());
    const sanitizedType = sanitizeInput(requestType.trim());

    // 2. Resend Setup
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'skillverse0109@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    if (!apiKey) {
      const errorMsg = 'RESEND_API_KEY is not defined in environment variables';
      console.error("DATA RIGHTS PORTAL ERROR:", new Error(errorMsg));
      return NextResponse.json(
        { success: false, message: 'Unable to submit request due to server misconfiguration' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const submissionDate = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long' 
    });

    const consentTimestamp = new Date().toISOString();
    const consentPurpose = sanitizeInput(consent.purpose || 'To process and fulfill Data Principal rights requests under DPDP Act 2023');
    const consentVersion = sanitizeInput(consent.version || '1.0-August-2026');

    // Human-readable request type mapping
    const typeMapping: { [key: string]: string } = {
      access: 'Access my personal data (Summary of Processing)',
      correction: 'Correct inaccurate or outdated personal data',
      erasure: 'Erase my personal data (Right to be Forgotten)',
      withdrawal: 'Withdraw my previously given consent',
    };

    const emailText = `ZENLIO — NEW DATA RIGHTS REQUEST (DPDP Act 2023 Compliance)

A new statutory request has been submitted by a Data Principal from India.

1. REQUEST DETAILS
- Name: ${sanitizedName}
- Registered Email: ${sanitizedEmail}
- Request Type: ${typeMapping[sanitizedType] || sanitizedType}
- Details:
${sanitizedDetails}

- Submitted At: ${submissionDate}

--------------------------------------------------
[DPDP Act 2023 Consent Audit Record]
- Explicit Consent Given to Process Request: YES (Opt-In Checkbox)
- Consent Purpose: ${consentPurpose}
- Consent Version: ${consentVersion}
- Server Logging Timestamp (UTC): ${consentTimestamp}

ACTION REQUIRED: This request must be acknowledged within 48 hours and resolved within 30 days under Zenlio's DPDP policy.`;

    // 3. Send Email
    let response = await resend.emails.send({
      from: senderEmail,
      to: contactEmail,
      subject: `[DPDP Request] ${typeMapping[sanitizedType] || 'Rights Request'} — Zenlio`,
      text: emailText,
      replyTo: sanitizedEmail,
    });

    // Sandbox fallback
    if (response.error) {
      const errorMsg = response.error.message;
      if (
        response.error.name === 'validation_error' &&
        errorMsg.includes('You can only send testing emails to your own email address')
      ) {
        const match = errorMsg.match(/\(([^)]+)\)/);
        if (match && match[1]) {
          const fallbackEmail = match[1];
          console.warn(`[Resend Sandbox Fallback]: Re-routing email to registered address: ${fallbackEmail}`);
          
          response = await resend.emails.send({
            from: senderEmail,
            to: fallbackEmail,
            subject: `[DPDP Request] ${typeMapping[sanitizedType] || 'Rights Request'} — Zenlio (Sandbox Mode)`,
            text: emailText,
            replyTo: sanitizedEmail,
          });
        }
      }
    }

    if (response.error) {
      console.error("DATA RIGHTS PORTAL ERROR:", response.error);
      return NextResponse.json(
        { success: false, message: 'Unable to submit request' },
        { status: 500 }
      );
    }

    // Log the audit trail
    console.log('[DPDP Rights Request Consent Saved]:', {
      email: sanitizedEmail,
      requestType: sanitizedType,
      purpose: consentPurpose,
      version: consentVersion,
      timestamp: consentTimestamp
    });

    return NextResponse.json({
      success: true,
      message: 'Request submitted successfully',
    });

  } catch (err) {
    console.error("DATA RIGHTS PORTAL ERROR:", err);
    return NextResponse.json(
      { success: false, message: 'Unable to submit request' },
      { status: 500 }
    );
  }
}
