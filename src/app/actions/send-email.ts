
'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import ContactEmailTemplate from '@/components/emails/contact-email-template';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not set. Email sending will fail. Please set this environment variable.");
}

const resend = new Resend(resendApiKey);

const sendEmailSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type SendEmailFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function sendEmailAction(
  prevState: SendEmailFormState,
  data: FormData
): Promise<SendEmailFormState> {
  if (!resendApiKey) {
     return {
      message: 'Email service is not configured. Please contact support.',
      success: false,
    };
  }
  
  const formData = Object.fromEntries(data);
  const parsed = sendEmailSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    const issues: string[] = [];
    parsed.error.issues.forEach(issue => {
      if (issue.path.length > 0) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      issues.push(issue.message);
    });
    return {
      message: 'Invalid form data. Please check the fields below.',
      fields: formData as Record<string, string>,
      issues: issues,
      success: false,
    };
  }

  const { name, email, message } = parsed.data;
  const recipientEmail = 'meh538416@gmail.com';
  // IMPORTANT: Replace 'noreply@yourdomain.com' with an email address from a domain you have verified with Resend.
  // Using 'onboarding@resend.dev' is for testing purposes and might not work in production for all Resend features.
  const fromEmail = 'Asto Eterna Contact <onboarding@resend.dev>';


  try {
    await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: email, // Set the sender's email as reply_to
      subject: `New Contact Form Submission from ${name} via Asto Eterna`,
      react: ContactEmailTemplate({ name, email, message }),
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    return { message: 'Message sent successfully! We will get back to you soon.', success: true };
  } catch (error) {
    console.error('Resend API Error:', error);
    // Check for specific Resend error structure if available
    let errorMessage = 'Failed to send message due to a server error. Please try again later.';
    if (error instanceof Error) {
        // For more specific error handling, you might inspect error.name or error.message if Resend provides structured errors
        // e.g. if (error.name === 'ResendAPIError' && error.message.includes('KnownErrorType')) { ... }
    }
    return { message: errorMessage, success: false };
  }
}
