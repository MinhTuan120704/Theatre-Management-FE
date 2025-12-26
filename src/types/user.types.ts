// User Types
export type UserRole = "customer" | "admin" | "employee";

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  dob: Date;
  identifyCode: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateDto {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  dob: Date;
  identifyCode: string;
  role: UserRole;
}

export interface UserUpdateDto {
  fullName?: string;
  email?: string;
  phone?: string;
  passwordHash?: string;
  dob?: Date;
  identifyCode?: string;
  role?: UserRole;
}

export interface UserResponseDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: Date;
  identifyCode: string;
  role: UserRole;
  createdAt: Date;
}

// Public user type safe for client-side usage (no passwordHash)
export type UserPublic = UserResponseDto;
