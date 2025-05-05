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
  const recipientEmail = 'meh534816@gmail.com';
  // IMPORTANT: Replace 'noreply@yourdomain.com' with an email address verified with Resend.
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Fallback to Resend default if not set

  if (!process.env.RESEND_API_KEY) {
      console.error("Resend API Key is not configured.");
      return { success: false, message: 'Server configuration error. Could not send email.' };
  }
   if (fromEmail === 'onboarding@resend.dev' && process.env.NODE_ENV === 'production') {
     console.warn("Using default Resend 'from' email. Please configure and verify your own domain in Resend and set the FROM_EMAIL environment variable.");
     // Optionally prevent sending in production with default email
     // return { success: false, message: 'Email sending not configured for production.' };
   }


  try {
    const { data, error } = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`, // Sender name and verified email
      to: [recipientEmail], // Recipient email from user request
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
      console.error('Error sending email:', error);
      return { success: false, message: 'Failed to send message. Please try again later.' };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Message sent successfully!' };

  } catch (exception) {
    console.error('Exception sending email:', exception);
    // Handle potential Resend client errors or other exceptions
     if (exception instanceof Error) {
       return { success: false, message: `An unexpected error occurred: ${exception.message}` };
     }
    return { success: false, message: 'An unexpected error occurred while sending the message.' };
  }
}
