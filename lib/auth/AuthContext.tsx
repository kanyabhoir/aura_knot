"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearSession,
  loginAccount,
  readSessionUser,
  registerAccount,
  startPhoneOtp,
  verifyPhoneOtp,
  type AuthUser,
} from "./authStorage";

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  startPhoneLogin: (
    phone: string
  ) => Promise<{ error?: string; demoOtp?: string }>;
  verifyPhoneLogin: (phone: string, otp: string) => Promise<{ error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readSessionUser());
    setHydrated(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = loginAccount(email, password);
    if (!result.ok) {
      return { error: result.error };
    }
    setUser(result.user);
    return {};
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = registerAccount(name, email, password);
      if (!result.ok) {
        return { error: result.error };
      }
      setUser(result.user);
      return {};
    },
    []
  );

  const startPhoneLogin = useCallback(async (phone: string) => {
    const result = startPhoneOtp(phone);
    if (!result.ok) {
      return { error: result.error };
    }
    return { demoOtp: result.demoOtp };
  }, []);

  const verifyPhoneLogin = useCallback(async (phone: string, otp: string) => {
    const result = verifyPhoneOtp(phone, otp);
    if (!result.ok) {
      return { error: result.error };
    }
    setUser(result.user);
    return {};
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      login,
      register,
      startPhoneLogin,
      verifyPhoneLogin,
      logout,
    }),
    [user, hydrated, login, register, startPhoneLogin, verifyPhoneLogin, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
