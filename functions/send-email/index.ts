// For local development/linting, install: npm install --save-dev @types/nodemailer
import nodemailer from 'nodemailer';

// Define the entrypoint function
module.exports = async function (req: any, res: any) {
    try {
        // Log the incoming request payload
        console.log('Received email request payload:', req.payload);

        // Ensure req.payload is a string before parsing
        if (typeof req.payload !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid payload format'
            });
        }

        // Parse the request payload
        const data = JSON.parse(req.payload);
        const { to, subject, text, html, replyTo } = data;

        // Validate required fields
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: to, subject, or text/html'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid recipient email format'
            });
        }
        if (replyTo && !emailRegex.test(replyTo)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid reply-to email format'
            });
        }

        // Create a transporter using your email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Use the sender email from environment variables
            to,
            replyTo: replyTo || process.env.EMAIL_USER, // Use replyTo or default to sender
            subject,
            text,
            html
        });

        console.log('Email sent successfully');

        // Return a success response
        return res.json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Error in send-email function:', error);

        // Return an error response
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to send email'
        });
    }
}; 