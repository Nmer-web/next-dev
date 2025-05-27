import { setupEmailFunction } from './emailFunction';

export const setupAppwrite = async () => {
    try {
        console.log('Starting Appwrite setup...');

        // Setup email function
        await setupEmailFunction();

        console.log('Appwrite setup completed successfully!');
    } catch (error) {
        console.error('Error during Appwrite setup:', error);
        throw error;
    }
}; 