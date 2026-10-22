import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserCredential } from 'firebase/auth';
import {
  subscribeToAuthState,
  registerUser,
  loginUser,
  logoutUser,
} from '../services/auth.service';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, pass: string) => Promise<UserCredential>;
  login: (email: string, pass: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = (email: string, pass: string) => registerUser(email, pass);
  const login = (email: string, pass: string) => loginUser(email, pass);
  const logout = () => logoutUser();

  const value: AuthContextType = {
    currentUser,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
