'use client';

import { useState, useEffect, useCallback } from 'react';

// Define interfaces for our auth state and user
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock function to simulate fetching user data
const fetchCurrentUser = async (): Promise<User | null> => {
  // In a real implementation, this would make an API call
  // to check the current session and return user data
  
  // For demo purposes, check if we have a stored user in localStorage
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser) as User;
  }
  
  return null;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setAuthState({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to authenticate user',
        });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock login - in a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login for specific credentials
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'student',
        };
        
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid email or password',
        }));
        
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during login',
      }));
      
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // In a real app, this would call an API endpoint to invalidate the session
      // For demo purposes, just remove from localStorage
      localStorage.removeItem('user');
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during logout',
      }));
    }
  }, []);

  // Register function
  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
    role: 'student' | 'teacher' = 'student'
  ): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock registration - in a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const user: User = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        name,
        email,
        role,
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during registration',
      }));
      
      return false;
    }
  }, []);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    register,
  };
} 