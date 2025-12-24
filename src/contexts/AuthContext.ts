import { createContext } from "react";
import type { AuthUserInfo, AuthRegisterDto } from "../types";

export interface AuthContextType {
  user: AuthUserInfo | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: AuthRegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: AuthUserInfo | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
