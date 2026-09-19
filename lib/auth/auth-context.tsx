'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
} from '@/lib/api/auth';

import { getToken, setToken, clearToken } from './token-storage';
import { isTokenExpired, getTokenTimeRemaining, getTokenRole } from './jwt';

import type { LoginDto, RegisterDto, UserDto } from '@/types/api';

interface AuthContextValue {
  user: UserDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  sessionWarning: boolean;
  login: (payload: LoginDto) => Promise<void>;
  register: (payload: RegisterDto) => Promise<void>;
  logout: () => void;
  dismissSessionWarning: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Warn the user 2 minutes before their session actually expires.
const WARNING_LEAD_TIME_MS = 2 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionWarning, setSessionWarning] = useState(false);

  const expiryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSessionTimers = useCallback(() => {
    if (expiryTimeoutRef.current) {
      clearTimeout(expiryTimeoutRef.current);
      expiryTimeoutRef.current = null;
    }

    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearSessionTimers();
    clearToken();
    setUser(null);
    setIsAdmin(false);
    setSessionWarning(false);
  }, [clearSessionTimers]);

  const scheduleSessionTimers = useCallback(
    (token: string) => {
      clearSessionTimers();

      const remainingMs = getTokenTimeRemaining(token);

      if (remainingMs <= 0) {
        logout();
        return;
      }

      const warningDelay = Math.max(0, remainingMs - WARNING_LEAD_TIME_MS);

      warningTimeoutRef.current = setTimeout(() => {
        setSessionWarning(true);
      }, warningDelay);

      expiryTimeoutRef.current = setTimeout(() => {
        logout();
      }, remainingMs);
    },
    [clearSessionTimers, logout],
  );

  useEffect(() => {
    let cancelled = false;

    const initializeAuth = async () => {
      const token = getToken();

      if (!token || isTokenExpired(token)) {
        clearToken();

        // Defer the state update so it doesn't happen
        // synchronously inside the effect body.
        setTimeout(() => {
          if (!cancelled) {
            setIsLoading(false);
          }
        }, 0);

        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (cancelled) return;

        setUser(currentUser);
        setIsAdmin(getTokenRole(token) === 'Admin');
        scheduleSessionTimers(token);
      } catch {
        if (cancelled) return;

        clearToken();
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      cancelled = true;
      clearSessionTimers();
    };
  }, [clearSessionTimers, scheduleSessionTimers]);

  const login = useCallback(
    async (payload: LoginDto) => {
      const result = await loginApi(payload);

      setToken(result.token);
      setUser(result);
      setIsAdmin(getTokenRole(result.token) === 'Admin');
      setSessionWarning(false);

      scheduleSessionTimers(result.token);
    },
    [scheduleSessionTimers],
  );

  const register = useCallback(
    async (payload: RegisterDto) => {
      const result = await registerApi(payload);

      setToken(result.token);
      setUser(result);
      setIsAdmin(getTokenRole(result.token) === 'Admin');
      setSessionWarning(false);

      scheduleSessionTimers(result.token);
    },
    [scheduleSessionTimers],
  );

  const dismissSessionWarning = useCallback(() => {
    setSessionWarning(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isAdmin,
      sessionWarning,
      login,
      register,
      logout,
      dismissSessionWarning,
    }),
    [
      user,
      isLoading,
      isAdmin,
      sessionWarning,
      login,
      register,
      logout,
      dismissSessionWarning,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
