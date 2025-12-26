import { createContext } from "react";
import type { UserPublic, AuthRegisterDto } from "../types";

export interface AuthContextType {
  user: UserPublic | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: AuthRegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: UserPublic | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
