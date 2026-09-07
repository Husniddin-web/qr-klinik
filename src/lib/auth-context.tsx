"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "./api-client";

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, admin: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on initial client mount
    const savedToken = localStorage.getItem("clinic_admin_token");
    const savedAdmin = localStorage.getItem("clinic_admin_user");

    if (savedToken && savedAdmin) {
      try {
        setToken(savedToken);
        setAdmin(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem("clinic_admin_token");
        localStorage.removeItem("clinic_admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newAdmin: AdminUser) => {
    setToken(newToken);
    setAdmin(newAdmin);
    localStorage.setItem("clinic_admin_token", newToken);
    localStorage.setItem("clinic_admin_user", JSON.stringify(newAdmin));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("clinic_admin_token");
    localStorage.removeItem("clinic_admin_user");
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
