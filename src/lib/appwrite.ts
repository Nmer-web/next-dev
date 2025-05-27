import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6835a93d0010f6e0aca1');

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = 'vibedesign_db';
export const COLLECTIONS = {
    USERS: 'users',
    PROJECTS: 'projects',
    TESTIMONIALS: 'testimonials',
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