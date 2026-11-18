"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { clearUser, getUser, saveUser } from "@/lib/storage";
import type { LoginResponse } from "@/types/auth";

type AuthContextValue = {
  user: LoginResponse | null;
  isReady: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
  updateUser: (changes: Partial<LoginResponse>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Shares the logged in user with the whole app.
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setIsReady(true);
  }, []);

  function login(newUser: LoginResponse) {
    saveUser(newUser);
    setUser(newUser);
  }

  function logout() {
    clearUser();
    setUser(null);
  }

  function updateUser(changes: Partial<LoginResponse>) {
    if (!user) return;
    const updatedUser = { ...user, ...changes };
    saveUser(updatedUser);
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider value={{ user, isReady, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Gices any component the logged in user plus login/logout
 * @throws If used outside AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
