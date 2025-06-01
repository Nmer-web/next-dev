// import { ID } from 'appwrite'; // Removed Appwrite import
// import { databases, DATABASE_ID, COLLECTIONS } from '../appwrite'; // Removed Appwrite imports

export interface NewTestimonial {
    clientName: string;
    clientRole?: string;
    clientCompany?: string;
    content: string;
    rating: number;
}

// Simplified interface for frontend use
// export interface SubmittedTestimonial extends NewTestimonial {
//     id: string;
//     status: 'pending' | 'approved' | 'rejected'; // Add a status field
//     createdAt: Date;
//     updatedAt: Date;
// }

export const submitTestimonialService = {
    async submitTestimonial(testimonial: NewTestimonial): Promise<void> { // Changed return type to void
        try {
            console.log('Sending testimonial to backend...', testimonial);

            const response = await fetch('/api/testimonials', { // Use the new backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testimonial),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to submit testimonial to backend');
            }

            console.log('Testimonial sent successfully to backend');
            // No need to return the submitted testimonial object from the frontend
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            if (error instanceof Error) {
                 throw new Error(`Failed to submit testimonial: ${error.message}`);
            }
            throw new Error('Failed to submit testimonial');
        }
    }
}; 