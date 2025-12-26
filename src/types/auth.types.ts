// Login
export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUserInfo;
}

// Register
export interface AuthRegisterDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dob: string; // ISO date string
  identifyCode: string;
  role: string; // e.g. 'customer'
}

export interface AuthRegisterResponse {
  message: string;
  user: AuthUserInfo;
}

// Logout
export interface AuthLogoutDto {
  refreshToken: string;
}

// Refresh Token
export interface AuthRefreshTokenDto {
  refreshToken: string;
}

export interface AuthRefreshTokenResponse {
  accessToken: string;
}

// Password Reset
export interface AuthRequestPasswordResetDto {
  email: string;
}

export interface AuthResetPasswordDto {
  resetToken: string;
  newPassword: string;
}

// Change Password
export interface AuthChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// Logout All
// No body needed, just authenticated

// Verify Token
export interface AuthVerifyTokenDto {
  token: string;
}

export interface AuthVerifyTokenResponse {
  valid: boolean;
  user?: AuthUserInfo;
}

// User Info
import type { UserPublic } from "./user.types";

// AuthUserInfo is the same as the client-safe UserPublic
export type AuthUserInfo = UserPublic;
