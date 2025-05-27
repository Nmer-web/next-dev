import { Client, Functions, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('fra-6835a93d0010f6e0aca1');

const functions = new Functions(client);

export interface EmailData {
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
}

interface EmailFunctionResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const sendEmail = async (data: EmailData) => {
    try {
        // Validate required fields
        if (!data.to || !data.subject || !data.text) {
            throw new Error('Missing required email fields: to, subject, or text');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.to)) {
            throw new Error('Invalid recipient email format');
        }
        if (data.replyTo && !emailRegex.test(data.replyTo)) {
            throw new Error('Invalid reply-to email format');
        }

        console.log('Sending email with data:', {
            to: data.to,
            subject: data.subject,
            hasText: !!data.text,
            hasHtml: !!data.html,
            replyTo: data.replyTo
        });

        const response = await functions.createExecution(
            'send-email',
            JSON.stringify(data)
        );

        console.log('Email function response:', response);

        if (!response || !response.responseBody) {
            throw new Error('No response from email function');
        }

        const result = JSON.parse(response.responseBody) as EmailFunctionResponse;
        if (!result.success) {
            throw new Error(result.error || 'Failed to send email');
        }

        return result;
    } catch (error) {
        console.error('Error in sendEmail:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        throw new Error('Failed to send email');
    }
}; 