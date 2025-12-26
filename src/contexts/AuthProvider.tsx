import { useState } from "react";
import type { ReactNode } from "react";
import AuthService from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import type { UserPublic, AuthRegisterDto } from "../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPublic | null>(AuthService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthService.isAuthenticated()
  );

  const login = async (email: string, password: string) => {
    const res = await AuthService.login({ email, password });
    setUser(res.user);
    setIsAuthenticated(true);
  };

  const register = async (data: AuthRegisterDto) => {
    await AuthService.register(data);
    // Optionally auto-login or redirect
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    await AuthService.refreshToken();
    setIsAuthenticated(AuthService.isAuthenticated());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        refreshToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Only export AuthContext for use in useAuth.ts
