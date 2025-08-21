/**
 * Authentication context providing login, register, logout and current user.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet, apiPost, setAuthToken } from '../services/api';

const AuthCtx = createContext(null);

export function useAuth() {
  return useContext(AuthCtx);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authenticated user state and actions. */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setInitializing(false);
      return;
    }
    (async () => {
      try {
        const u = await apiGet('/auth/me', true);
        setUser(u);
      } catch (e) {
        setAuthToken(null);
        setUser(null);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const res = await apiPost('/auth/login', { email, password });
    setAuthToken(res.access_token);
    const u = await apiGet('/auth/me', true);
    setUser(u);
    return u;
  };

  const register = async (email, password, full_name) => {
    const res = await apiPost('/auth/register', { email, password, full_name });
    setAuthToken(res.access_token);
    const u = await apiGet('/auth/me', true);
    setUser(u);
    return u;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = { user, initializing, login, register, logout };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
