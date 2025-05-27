import { ID } from 'appwrite';
import { account } from '../appwrite';

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

export const authService = {
    async createAccount(email: string, password: string, name: string) {
        try {
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            
            if (user) {
                // Call login after successful registration
                return this.login(email, password);
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    },

    async login(email: string, password: string) {
        try {
            return await account.createSession(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    async logout() {
        try {
            return await account.deleteSession('current');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    async updateName(name: string) {
        try {
            return await account.updateName(name);
        } catch (error) {
            console.error('Error updating name:', error);
            throw error;
        }
    },

    async updatePassword(password: string, oldPassword: string) {
        try {
            return await account.updatePassword(password, oldPassword);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }
}; 