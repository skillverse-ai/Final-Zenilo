interface AdminEmailProps {
  name: string;
  email: string;
  phone: string;
  plan: string;
  selectionDetails: string;
  message: string;
  submissionDate: string;
  consentPurpose: string;
  consentVersion: string;
  consentTimestamp: string;
}

interface VisitorEmailProps {
  name: string;
  email: string;
  phone: string;
  plan: string;
  selectionDetails: string;
  message: string;
}

const theme = {
  bg: '#111111',
  cardBg: '#1a1a1a',
  text: '#ffffff',
  textMuted: '#888888',
  accent: '#ccff00',
  border: '#333333'
};

export function generateAdminEmailHtml(props: AdminEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${theme.bg}; color: ${theme.text}; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background-color: ${theme.cardBg}; border: 1px solid ${theme.border}; border-radius: 12px; overflow: hidden; }
    .header { background-color: ${theme.accent}; padding: 24px; text-align: center; }
    .header h1 { color: #000000; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${theme.textMuted}; margin-bottom: 4px; display: block; }
    .value { font-size: 16px; margin: 0; color: ${theme.text}; }
    .message-box { background-color: #222222; border-left: 4px solid ${theme.accent}; padding: 16px; border-radius: 4px; margin-top: 8px; font-style: italic; color: #eeeeee; white-space: pre-wrap; }
    .footer { padding: 24px; border-top: 1px solid ${theme.border}; text-align: center; font-size: 12px; color: ${theme.textMuted}; background-color: #151515; }
    .footer p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Lead: Zenlio Agency</h1>
    </div>
    <div class="content">
      <div class="section">
        <span class="label">Date Submitted</span>
        <p class="value">${props.submissionDate}</p>
      </div>
      
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
        <tr>
          <td width="50%" valign="top">
            <span class="label">Name</span>
            <p class="value">${props.name}</p>
          </td>
          <td width="50%" valign="top">
            <span class="label">Email</span>
            <p class="value"><a href="mailto:${props.email}" style="color: ${theme.accent}; text-decoration: none;">${props.email}</a></p>
          </td>
        </tr>
      </table>

      <div class="section">
        <span class="label">Phone</span>
        <p class="value">${props.phone || 'Not provided'}</p>
      </div>

      ${props.plan ? `
      <div class="section">
        <span class="label">Plan & Selection Details</span>
        <div class="message-box" style="font-style: normal; font-family: monospace; font-size: 14px;">${props.selectionDetails.replace(/\n/g, '<br/>')}</div>
      </div>
      ` : ''}

      <div class="section">
        <span class="label">Message</span>
        <div class="message-box">${props.message}</div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>DPDP Act 2023 Consent Audit Record</strong></p>
      <p>Explicit Consent Given: YES (Opt-In Checkbox)</p>
      <p>Purpose: ${props.consentPurpose}</p>
      <p>Version: ${props.consentVersion}</p>
      <p>Timestamp (UTC): ${props.consentTimestamp}</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateVisitorEmailHtml(props: VisitorEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; color: #111111; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { padding: 32px 32px 16px 32px; text-align: center; }
    .header h1 { color: #111111; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .content { padding: 0 32px 32px 32px; }
    .greeting { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
    .text { color: #444444; font-size: 16px; margin-bottom: 24px; }
    .summary-card { background-color: #f9f9f9; border: 1px solid #eeeeee; border-radius: 8px; padding: 24px; margin-bottom: 24px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin-bottom: 4px; display: block; }
    .value { font-size: 16px; margin: 0 0 16px 0; color: #111111; }
    .value:last-child { margin-bottom: 0; }
    .button { display: inline-block; background-color: #111111; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
    .footer { padding: 32px; text-align: center; font-size: 14px; color: #888888; }
    .accent-text { color: #99bf00; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Zenlio Agency</h1>
    </div>
    <div class="content">
      <p class="greeting">Hi ${props.name},</p>
      <p class="text">Thank you for reaching out to us! We have received your inquiry and our team will get back to you shortly to discuss your project.</p>
      
      <p class="text">For your records, here is a copy of the information you submitted:</p>

      <div class="summary-card">
        <span class="label">Email</span>
        <p class="value">${props.email}</p>
        
        ${props.phone ? `
        <span class="label">Phone</span>
        <p class="value">${props.phone}</p>
        ` : ''}

        ${props.plan ? `
        <span class="label">Selection Details</span>
        <p class="value" style="font-family: monospace; font-size: 14px;">${props.selectionDetails.replace(/\n/g, '<br/>')}</p>
        ` : ''}

        <span class="label">Your Message</span>
        <p class="value" style="white-space: pre-wrap; font-style: italic; color: #555555;">"${props.message}"</p>
      </div>

      <p class="text">We look forward to speaking with you soon!</p>
      <p class="text" style="margin-bottom: 0;"><strong>Best regards,</strong><br>The Zenlio Team</p>
    </div>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Zenlio Agency. All rights reserved.</p>
    <p><a href="https://zenlio.agency" style="color: #888888; text-decoration: underline;">zenlio.agency</a></p>
  </div>
</body>
</html>
  `;
}
