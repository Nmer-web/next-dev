import { useState, useEffect } from 'react';
// import { account } from '../lib/appwrite'; // Removed Appwrite import
// import { Models, ID } from 'appwrite'; // Removed Appwrite import
import { authService, User } from '../lib/services/authService'; // Import the new authService

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null); // Use the new User interface
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            // Use the new authService to get the current user
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (err: any) {
            console.error('Error checking user:', err);
            setUser(null);
            // Optionally set error state here if needed
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            // Use the new authService for login
            const loggedInUser = await authService.login(email, password);
            setUser(loggedInUser);
        } catch (err: any) {
            console.error('Error logging in:', err);
            setError(err.message);
            throw err; // Re-throw to allow component to handle
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            setError(null);
            // Use the new authService for registration
            const registeredUser = await authService.createAccount(email, password, name);
            setUser(registeredUser); // Assuming createAccount also logs the user in
        } catch (err: any) {
            console.error('Error registering:', err);
            setError(err.message);
            throw err; // Re-throw to allow component to handle
        }
    };

    const logout = async () => {
        try {
            setError(null);
            // Use the new authService for logout
            await authService.logout();
            setUser(null);
        } catch (err: any) {
            console.error('Error logging out:', err);
            setError(err.message);
            throw err; // Re-throw to allow component to handle
        }
    };

    return {
        user,
        loading,
        error,
        login,
        register,
        logout
    };
}; 