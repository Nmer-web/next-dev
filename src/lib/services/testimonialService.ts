import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS } from '../appwrite';

export interface Testimonial {
    id: string;
    clientName: string;
    clientRole: string;
    clientCompany: string;
    content: string;
    rating: number;
    projectId?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const testimonialService = {
    async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                ID.unique(),
                {
                    ...testimonial,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error creating testimonial:', error);
            throw error;
        }
    },

    async getTestimonials(limit = 10, offset = 0) {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                [
                    Query.limit(limit),
                    Query.offset(offset),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting testimonials:', error);
            throw error;
        }
    },

    async getFeaturedTestimonials() {
        try {
            return await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                [
                    Query.greaterThan('rating', 4),
                    Query.limit(6),
                    Query.orderDesc('createdAt')
                ]
            );
        } catch (error) {
            console.error('Error getting featured testimonials:', error);
            throw error;
        }
    },

    async getTestimonialById(id: string) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                id
            );
        } catch (error) {
            console.error('Error getting testimonial:', error);
            throw error;
        }
    },

    async updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                id,
                {
                    ...testimonial,
                    updatedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating testimonial:', error);
            throw error;
        }
    },

    async deleteTestimonial(id: string) {
        try {
            return await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.TESTIMONIALS,
                id
            );
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            throw error;
        }
    }
}; 