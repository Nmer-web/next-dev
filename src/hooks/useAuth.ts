import { useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { Models, ID } from 'appwrite';

export const useAuth = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            await account.createSession(email, password);
            await checkUser();
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            setError(null);
            await account.create(ID.unique(), email, password, name);
            await login(email, password);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await account.deleteSession('current');
            setUser(null);
        } catch (err: any) {
            setError(err.message);
            throw err;
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