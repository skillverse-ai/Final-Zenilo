import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateAdminEmailHtml, generateVisitorEmailHtml } from './emailTemplates';

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple input sanitization function to prevent XSS/HTML injection
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
    const { name, email, phone, message, consent, website, selectedPlan, buildPrice, monthlyPrice, selectedAddOns } = body;

    // Honeypot bot protection
    if (website && typeof website === 'string' && website.trim() !== '') {
      console.warn('[Bot Prevention]: Honeypot field filled by bot. Silently dropping request.');
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
      console.warn(`[Rate Limiting]: Too many requests from IP: ${ip}`);
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

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      );
    }

    // 1b. DPDP Consent Validation
    if (!consent || typeof consent !== 'object' || consent.given !== true) {
      return NextResponse.json(
        { success: false, message: 'Explicit consent is required to process your personal data.' },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPhone = phone && typeof phone === 'string' && phone.trim() !== '' 
      ? sanitizeInput(phone.trim()) 
      : 'Not provided';
    const sanitizedMessage = sanitizeInput(message.trim());

    const sanitizedPlan = selectedPlan && typeof selectedPlan === 'string' ? sanitizeInput(selectedPlan.trim()) : '';
    const sanitizedBuild = buildPrice && typeof buildPrice === 'string' ? sanitizeInput(buildPrice.trim()) : '';
    const sanitizedRecurring = monthlyPrice && typeof monthlyPrice === 'string' ? sanitizeInput(monthlyPrice.trim()) : '';
    const sanitizedAddons = selectedAddOns && Array.isArray(selectedAddOns)
      ? selectedAddOns.map((a: any) => typeof a === 'string' ? sanitizeInput(a.trim()) : '').filter(Boolean)
      : [];

    let selectionDetails = '';
    if (sanitizedPlan) {
      selectionDetails = `Selected Plan: ${sanitizedPlan}
Build Price Range: ${sanitizedBuild}
Monthly Recurring Price: ${sanitizedRecurring}
Selected Add-ons: ${sanitizedAddons.length > 0 ? sanitizedAddons.join(', ') : 'None'}
`;
    }

    // 2. Environment Configuration
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmailRaw = process.env.CONTACT_EMAIL || 'zenlio.agency@gmail.com';
    const contactEmail = contactEmailRaw.split(',').map(email => email.trim()).filter(Boolean);
    const senderEmail = process.env.SENDER_EMAIL || 'Zenlio <contact@zenlio.agency>';

    if (!apiKey) {
      const errorMsg = 'RESEND_API_KEY is not defined in environment variables';
      console.error("CONTACT FORM ERROR:", new Error(errorMsg));
      return NextResponse.json(
        { success: false, message: 'Unable to send message due to missing configuration' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    // Formatting date/time for UTC and a local readable format
    const submissionDate = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long' 
    });

    const consentTimestamp = new Date().toISOString();
    const consentPurpose = sanitizeInput(consent.purpose || 'To respond to user inquiry submitted via contact form');
    const consentVersion = sanitizeInput(consent.version || '1.0-August-2026');

    const emailHtml = generateAdminEmailHtml({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      plan: sanitizedPlan,
      selectionDetails,
      message: sanitizedMessage,
      submissionDate,
      consentPurpose,
      consentVersion,
      consentTimestamp
    });

    // 3. Send Email
    let response = await resend.emails.send({
      from: senderEmail,
      to: contactEmail,
      subject: 'New Contact Form Submission — Zenlio',
      html: emailHtml,
      text: 'Please view this email in an HTML-compatible client.',
      replyTo: sanitizedEmail,
    });

    if (response.error) {
      console.error("CONTACT FORM ERROR:", response.error);
      return NextResponse.json(
        { success: false, message: 'Unable to send message' },
        { status: 500 }
      );
    }

    // 4. Send Confirmation Copy to the Visitor (Auto-Responder)
    try {
      const visitorEmailHtml = generateVisitorEmailHtml({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        plan: sanitizedPlan,
        selectionDetails,
        message: sanitizedMessage
      });

      const visitorResponse = await resend.emails.send({
        from: senderEmail,
        to: sanitizedEmail,
        subject: 'Thank you for contacting Zenlio',
        html: visitorEmailHtml,
        text: 'Thank you for contacting Zenlio! We have received your message and will get back to you soon.',
      });

      if (visitorResponse.error) {
        console.warn('[Resend Warning]: Could not send auto-response email to visitor:', visitorResponse.error.message);
      }
    } catch (visitorErr) {
      console.warn('[Resend Error]: Failed to send auto-response email to visitor:', visitorErr);
    }

    // Log the consent audit record to server stdout
    console.log('[DPDP Consent Record Saved]:', {
      email: sanitizedEmail,
      purpose: consentPurpose,
      version: consentVersion,
      timestamp: consentTimestamp
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (err) {
    console.error("CONTACT FORM ERROR:", err);
    return NextResponse.json(
      { success: false, message: 'Unable to send message' },
      { status: 500 }
    );
  }
}
