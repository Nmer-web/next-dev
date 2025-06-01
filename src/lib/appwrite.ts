import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTIONS = {
    USERS: 'users',
    PROJECTS: 'projects',
    TESTIMONIALS: import.meta.env.VITE_APPWRITE_TESTIMONIALS_COLLECTION_ID,
    CONTACT_MESSAGES: 'contact_messages'
};

// Storage Bucket IDs
export const BUCKETS = {
    PROJECT_IMAGES: 'project_images',
    PROFILE_IMAGES: 'profile_images'
};

// Helper function to handle Appwrite errors
export const handleAppwriteError = (error: any) => {
    console.error('Appwrite Error:', error);
    throw new Error(error.message || 'An error occurred with Appwrite');
};

export default client; 