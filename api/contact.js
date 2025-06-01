import nodemailer from 'nodemailer';

// This will be your endpoint for contact form submissions
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message, service, pricing } = req.body; // Include all form fields

    if (!name || !email || !subject || !message) { // Adjust required fields
      return res.status(400).json({ error: 'Required fields (name, email, subject, message) are missing.' });
    }

    try {
      // Configure your SMTP transporter (example with Gmail)
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'Gmail', // Allow service to be set by env var
        auth: {
          user: process.env.EMAIL_USER, // Your email address from env var
          pass: process.env.EMAIL_PASS, // Your email password or App Password from env var
        },
      });

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Send from your configured email
        to: process.env.EMAIL_RECEIVER, // Your email to receive the form
        replyTo: email, // Set reply-to to the sender's email
        subject: `New Contact Message from ${name}`, // Use the subject from the form
        text: `
          Name: ${name}
          Email: ${email}
          ${service ? `Service: ${service}` : ''}
          ${pricing ? `Pricing Plan: ${pricing}` : ''}
          Subject: ${subject}

          Message:
          ${message}
        `.trim(),
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          ${pricing ? `<p><strong>Pricing Plan:</strong> ${pricing}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `, // Include service and pricing in HTML, format message with line breaks
      };

      console.log('Attempting to send email with options:', mailOptions);
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 