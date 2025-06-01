// import { ID } from 'appwrite'; // Removed Appwrite import
// import { account } from '../appwrite'; // Removed Appwrite import

export interface User { // Ensure this matches the structure returned by the Express backend
    id: string;
    email: string;
    name: string;
    createdAt: string; // Assuming Express returns a string date
}

export const authService = {
    async createAccount(email: string, password: string, name: string): Promise<User> {
        try {
            console.log('Sending registration request to backend...');
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create account');
            }

            const data = await response.json();
            console.log('Account created successfully:', data.user);
            // Assuming the backend handles login after registration and returns the user
            return data.user; // Assuming the backend response includes the user object
        } catch (error) {
            console.error('Error creating account:', error);
            if (error instanceof Error) {
                throw new Error(`Failed to create account: ${error.message}`);
            }
            throw new Error('Failed to create account');
        }
    },

    async login(email: string, password: string): Promise<User> {
        try {
            console.log('Sending login request to backend...');
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to login');
            }

            const data = await response.json();
            console.log('Login successful:', data.user);
            return data.user; // Assuming the backend response includes the user object
        } catch (error) {
            console.error('Error logging in:', error);
             if (error instanceof Error) {
                throw new Error(`Failed to login: ${error.message}`);
            }
            throw new Error('Failed to login');
        }
    },

    async logout(): Promise<void> {
        try {
            console.log('Sending logout request to backend...');
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to logout');
            }

            console.log('Logout successful');
        } catch (error) {
            console.error('Error logging out:', error);
             if (error instanceof Error) {
                throw new Error(`Failed to logout: ${error.message}`);
            }
            throw new Error('Failed to logout');
        }
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            console.log('Fetching current user from backend...');
            const response = await fetch('/api/auth/user');

            if (response.status === 404) { // No user logged in
                return null;
            }

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to get current user');
            }

            const data = await response.json();
            console.log('Current user fetched:', data.user);
            return data.user; // Assuming the backend response includes the user object
        } catch (error) {
            console.error('Error getting current user:', error);
            // Return null or re-throw based on desired behavior for fetch errors
             if (error instanceof Error) {
                console.error(`Failed to get current user: ${error.message}`);
            }
            return null; // Return null in case of fetch errors
        }
    },

    async updateName(name: string): Promise<User> {
        try {
            console.log('Sending update name request to backend...');
            const response = await fetch('/api/auth/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to update name');
            }

            const data = await response.json();
            console.log('Name updated successfully:', data.user);
            return data.user; // Assuming the backend returns the updated user
        } catch (error) {
            console.error('Error updating name:', error);
             if (error instanceof Error) {
                throw new Error(`Failed to update name: ${error.message}`);
            }
            throw new Error('Failed to update name');
        }
    },

    async updatePassword(password: string, oldPassword: string): Promise<void> {
        try {
            console.log('Sending update password request to backend...');
            const response = await fetch('/api/auth/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, oldPassword }),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to update password');
            }

            console.log('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
             if (error instanceof Error) {
                throw new Error(`Failed to update password: ${error.message}`);
            }
            throw new Error('Failed to update password');
        }
    }
}; 