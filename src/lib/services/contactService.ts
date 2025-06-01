// import { ID, Query, Models } from "appwrite"; // Removed Appwrite import
// import { databases } from "@/lib/appwrite"; // Removed Appwrite import
// import { sendEmail, EmailData } from '../functions/sendEmail'; // Removed email sending import

// Define the ContactMessage interface (simplified for frontend use)
export interface ContactMessage {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    service?: string;
    pricing?: string;
    // Removed backend-specific fields like id, status, dates
}

// Removed Appwrite constants and helper function
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const CONTACT_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION_ID;
// const convertToContactMessage = (doc: Models.Document): ContactMessage => ({ ... });

export const contactService = {
    async sendMessage(message: ContactMessage): Promise<void> { // Changed return type to void
        try {
            console.log('Sending message to backend...', message);

            const response = await fetch('/api/contact', { // Use the new backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                // Log the status and status text for better debugging
                console.error('Backend response status:', response.status);
                console.error('Backend response status text:', response.statusText);

                try {
                    const errorData = await response.json();
                    console.error('Backend error data:', errorData);
                    throw new Error(errorData.message || `Failed to send message to backend with status ${response.status}`);
                } catch (jsonError) {
                    console.error('Failed to parse backend error response as JSON:', jsonError);
                     // If the response is not JSON, throw an error with status text
                    throw new Error(`Failed to send message to backend: ${response.statusText} (Status: ${response.status})`);
                }
            }

            console.log('Message sent successfully to backend');
            // No need to return the message with backend-specific fields anymore
        } catch (error) {
            console.error('Error in sendMessage:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to send message: ${error.message}`);
            }
            throw new Error('Failed to send message');
        }
    },

    // Removed all other Appwrite-specific functions (getMessages, getUnreadMessages, etc.)
};