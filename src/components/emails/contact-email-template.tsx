
import * as React from 'react';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h1 style={{ color: '#333' }}>New Contact Form Submission</h1>
    <p>
      You have received a new message from your Asto Eterna website contact form.
    </p>
    <hr style={{ borderColor: '#eee' }} />
    <h2 style={{ color: '#555' }}>Sender Details:</h2>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
    </p>
    <hr style={{ borderColor: '#eee' }} />
    <h2 style={{ color: '#555' }}>Message:</h2>
    <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
      <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message}</p>
    </div>
    <hr style={{ borderColor: '#eee', marginTop: '20px' }} />
    <p style={{ fontSize: '0.9em', color: '#777' }}>
      This email was sent from the contact form on the Asto Eterna website.
    </p>
  </div>
);

export default ContactEmailTemplate;
