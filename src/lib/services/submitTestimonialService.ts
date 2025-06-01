import { ID } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS } from '../appwrite';

export interface NewTestimonial {
    clientName: string;
    clientRole?: string;
    clientCompany?: string;
    content: string;
    rating: number;
}

export interface SubmittedTestimonial extends NewTestimonial {
    id: string;
    status: 'pending' | 'approved' | 'rejected'; // Add a status field
    createdAt: Date;
    updatedAt: Date;
}

export const submitTestimonialService = {
    async submitTestimonial(testimonial: NewTestimonial): Promise<SubmittedTestimonial> {
        try {
            const newDoc = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                ID.unique(),
                {
                    ...testimonial,
                    status: 'pending', // Set initial status to pending
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );

            // Convert the document to the SubmittedTestimonial type
            const submittedTestimonial: SubmittedTestimonial = {
                id: newDoc.$id,
                clientName: newDoc.clientName,
                clientRole: newDoc.clientRole,
                clientCompany: newDoc.clientCompany,
                content: newDoc.content,
                rating: newDoc.rating,
                status: newDoc.status,
                createdAt: new Date(newDoc.createdAt),
                updatedAt: new Date(newDoc.updatedAt)
            };

            return submittedTestimonial;
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            if (error instanceof Error) {
                 throw new Error(`Failed to submit testimonial: ${error.message}`);
            }
            throw new Error('Failed to submit testimonial');
        }
    }
}; 