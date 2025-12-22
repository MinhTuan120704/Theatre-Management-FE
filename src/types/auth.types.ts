// Authentication Types
export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user_id: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}
