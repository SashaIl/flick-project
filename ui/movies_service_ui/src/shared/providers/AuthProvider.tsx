import React, { useCallback, useMemo, useState } from 'react';
import type { UserType } from '../types/UserType';
import { getUserByToken, removeToken, setToken } from '@/features/auth/services/authService';
import { AuthContext } from '../contexts/AuthContext';

const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [user, setUser] = useState<UserType | null>(() => getUserByToken())
    


    const login = useCallback((token: string) => {
        setToken(token);
        setUser(getUserByToken());
    },[])

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    },[])

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user,login,logout])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
