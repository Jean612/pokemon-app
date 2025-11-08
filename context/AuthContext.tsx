import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    session: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
})

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setSession(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        session,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}