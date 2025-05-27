import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS } from '../appwrite';
import { sendEmail, EmailData } from '../functions/sendEmail';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    service?: string;
    pricing?: string;
    status: 'new' | 'read' | 'replied';
    createdAt: Date;
    updatedAt: Date;
}

export const contactService = {
    async createMessage(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
        try {
            console.log('Creating message in database...');
            const newMessage = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                ID.unique(),
                {
                    ...message,
                    status: 'new',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
            console.log('Message created successfully:', newMessage);

            // Send email notification
            console.log('Attempting to send email notification...');
            await this.sendEmailNotification(newMessage);
            console.log('Email notification sent successfully');

            return newMessage;
        } catch (error) {
            console.error('Error in createMessage:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to create message: ${error.message}`);
            }
            throw new Error('Failed to create message');
        }
    },

    async sendEmailNotification(message: ContactMessage) {
        try {
            console.log('Preparing email content...');
            const plainText = `
New Contact Form Submission

From: ${message.name}
Email: ${message.email}
${message.phone ? `Phone: ${message.phone}` : ''}
Subject: ${message.subject}
${message.service ? `Service: ${message.service}` : ''}
${message.pricing ? `Pricing Plan: ${message.pricing}` : ''}

Message:
${message.message}

Submitted on: ${new Date(message.createdAt).toLocaleString()}
            `.trim();

            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6B46C1; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #6B46C1; }
        .message { background-color: white; padding: 15px; border-left: 4px solid #6B46C1; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">From:</span> ${message.name}
            </div>
            <div class="field">
                <span class="label">Email:</span> ${message.email}
            </div>
            ${message.phone ? `
            <div class="field">
                <span class="label">Phone:</span> ${message.phone}
            </div>
            ` : ''}
            <div class="field">
                <span class="label">Subject:</span> ${message.subject}
            </div>
            ${message.service ? `
            <div class="field">
                <span class="label">Service:</span> ${message.service}
            </div>
            ` : ''}
            ${message.pricing ? `
            <div class="field">
                <span class="label">Pricing Plan:</span> ${message.pricing}
            </div>
            ` : ''}
            <div class="field">
                <span class="label">Message:</span>
                <div class="message">${message.message.replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        <div class="footer">
            <p>Submitted on: ${new Date(message.createdAt).toLocaleString()}</p>
            <p>This is an automated message from your website's contact form.</p>
        </div>
    </div>
</body>
</html>
            `.trim();

            console.log('Creating email data...');
            const emailData: EmailData = {
                to: 'nmertechh@gmail.com',
                subject: `New Contact Form Submission from ${message.name}`,
                text: plainText,
                html: htmlContent,
                replyTo: message.email
            };

            console.log('Sending email...');
            const response = await sendEmail(emailData);
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.error('Error in sendEmailNotification:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to send email notification: ${error.message}`);
            }
            throw new Error('Failed to send email notification');
        }
    },

    async getMessages(limit = 10, offset = 0) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                [
                    Query.limit(limit),
                    Query.offset(offset),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting messages:', error);
            throw error;
        }
    },

    async getUnreadMessages() {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                [
                    Query.equal('status', 'new'),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting unread messages:', error);
            throw error;
        }
    },

    async getMessageById(id: string) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                id
            );
        } catch (error) {
            console.error('Error getting message:', error);
            throw error;
        }
    },

    async updateMessageStatus(id: string, status: ContactMessage['status']) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                id,
                {
                    status,
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating message status:', error);
            throw error;
        }
    },

    async deleteMessage(id: string) {
        try {
            return await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                id
            );
        } catch (error) {
            console.error('Error deleting message:', error);
            throw error;
        }
    }
}; 