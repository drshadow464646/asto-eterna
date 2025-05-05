'use server';

import { Resend } from 'resend';
import { z } from 'zod';

// Ensure RESEND_API_KEY is set in your environment variables (.env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the schema for the form data
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
});

interface SendEmailResult {
  success: boolean;
  message: string;
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  const parsed = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    // Combine errors into a single message (or handle more granularly)
    const errorMessages = parsed.error.errors.map((e) => e.message).join(', ');
    return { success: false, message: `Invalid form data: ${errorMessages}` };
  }

  const { name, email, message } = parsed.data;
  const recipientEmail = 'meh534816@gmail.com'; // Recipient email as requested
  // IMPORTANT: Replace 'noreply@yourdomain.com' with an email address verified with Resend for production.
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Fallback to Resend default if not set

  if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not configured.");
      // Provide a generic message to the user for server config issues
      return { success: false, message: 'Email service configuration error. Please contact support.' };
  }

  const isUsingDefaultFrom = fromEmail === 'onboarding@resend.dev';

  // Informative log if using default 'from' - useful for debugging sandbox restrictions
  if (isUsingDefaultFrom) {
      console.log(`Using default Resend 'from' address (${fromEmail}). Ensure the recipient (${recipientEmail}) matches the Resend account owner's email if you are on a free/trial tier or haven't verified a domain.`);
      // You might compare recipientEmail with an env var holding the Resend account email for a more specific check
      // if (process.env.RESEND_ACCOUNT_EMAIL && recipientEmail !== process.env.RESEND_ACCOUNT_EMAIL) {
      //    console.warn(`Attempting to send from ${fromEmail} to ${recipientEmail}, which might be restricted. Recipient should typically match the Resend account email: ${process.env.RESEND_ACCOUNT_EMAIL}`);
      // }
  }

   if (isUsingDefaultFrom && process.env.NODE_ENV === 'production') {
     console.warn("Using default Resend 'from' email in production. Please configure and verify your own domain in Resend and set the FROM_EMAIL environment variable.");
     // Consider preventing sending in production with default email for robustness
     // return { success: false, message: 'Email sending configuration incomplete for production.' };
   }


  try {
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`, // Sender name and verified/default email
      to: [recipientEmail], // Recipient email
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email, // Set the sender's email as the reply-to address
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
       // Use text for email clients that don't support HTML
       text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      // Provide a slightly more specific (but still user-safe) message based on common issues
      let userMessage = 'Failed to send message. Please try again later.';
      // Check for common error types/messages from Resend (adjust based on actual Resend error structure)
      if (error.name === 'validation_error') {
          userMessage = 'Failed to send message due to invalid data. Please check your input.';
      } else if (error.message && error.message.toLowerCase().includes('domain that is not verified')) {
           userMessage = 'Email service configuration error. The sending domain is not verified.';
      } else if (error.message && error.message.toLowerCase().includes('sending is restricted')) { // Heuristic for sandbox limits
          userMessage = 'Email sending is currently restricted. This might be due to account limits or recipient restrictions.';
      } else if (error.message && error.message.toLowerCase().includes('must be verified')) { // Another common verification message
           userMessage = 'Email sending requires verification. Please contact support.';
      }
      return { success: false, message: userMessage };
    }

    console.log('Email sent successfully via Resend:', data);
    return { success: true, message: 'Message sent successfully!' };

  } catch (exception) {
    console.error('Exception occurred while sending email:', exception);
     // Provide a generic error message for unexpected issues
     let userMessage = 'An unexpected error occurred while sending the message.';
     // Avoid exposing raw exception details to the client for security
     // if (exception instanceof Error) { // Keep detailed logging server-side
       // userMessage = `An unexpected error occurred: ${exception.message}`;
     // }
    return { success: false, message: userMessage };
  }
}
