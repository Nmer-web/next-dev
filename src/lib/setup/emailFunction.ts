import { Client, Functions } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6835a93d0010f6e0aca1');

const functions = new Functions(client);

const FUNCTION_ID = 'send-email';
const FUNCTION_NAME = 'Send Email Function';
const FUNCTION_CODE = `
const sdk = require('node-appwrite');
const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
    try {
        // Log the incoming request
        console.log('Received email request:', req.payload);

        // Parse the request payload
        const { to, subject, text, html, replyTo } = JSON.parse(req.payload);

        // Validate required fields
        if (!to || !subject || !text) {
            return res.json({
                success: false,
                error: 'Missing required fields: to, subject, or text'
            }, 400);
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
            from: process.env.EMAIL_USER,
            to: to,
            replyTo: replyTo || process.env.EMAIL_USER,
            subject: subject,
            text: text,
            html: html
        });

        return res.json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Error in send-email function:', error);
        return res.json({
            success: false,
            error: error.message || 'Failed to send email'
        }, 500);
    }
};
`;

export const setupEmailFunction = async () => {
    try {
        console.log('Setting up email function...');

        // Create function
        try {
            await (functions as any).create(FUNCTION_ID, FUNCTION_NAME, ['nodejs-18.0']);
            console.log('Function created successfully');
        } catch (error) {
            console.log('Function already exists or error creating:', error);
        }

        // Create deployment
        try {
            const deployment = await (functions as any).createDeployment(
                FUNCTION_ID,
                'main',
                FUNCTION_CODE
            );
            console.log('Deployment created:', deployment);
        } catch (error) {
            console.error('Error creating deployment:', error);
            throw error;
        }

        // Set environment variables
        try {
            await (functions as any).updateVariables(FUNCTION_ID, [
                {
                    key: 'EMAIL_USER',
                    value: 'nmertechh@gmail.com',
                    required: true
                },
                {
                    key: 'EMAIL_PASSWORD',
                    value: '', // This needs to be set manually for security
                    required: true
                }
            ]);
            console.log('Environment variables set successfully');
        } catch (error) {
            console.error('Error setting environment variables:', error);
            throw error;
        }

        console.log('Email function setup completed successfully!');
        return true;
    } catch (error) {
        console.error('Error setting up email function:', error);
        throw error;
    }
}; 