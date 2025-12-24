import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  AuthLoginDto,
  AuthLoginResponse,
  AuthRegisterDto,
  AuthRegisterResponse,
  AuthRequestPasswordResetDto,
  AuthResetPasswordDto,
  AuthChangePasswordDto,
  AuthVerifyTokenDto,
  AuthVerifyTokenResponse,
  AuthUserInfo,
  AuthRefreshTokenResponse,
} from "../types";

class AuthService {
  // Register user
  async register(data: AuthRegisterDto): Promise<AuthRegisterResponse> {
    const response: AxiosResponse<AuthRegisterResponse> =
      await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  }

  // Login user
  async login(credentials: AuthLoginDto): Promise<AuthLoginResponse> {
    const response: AxiosResponse<AuthLoginResponse> = await axiosInstance.post(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    // Save tokens and user info to localStorage (for now, consider secure storage in future)
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  }

  // Logout user (single device)
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } finally {
      this.clearAuth();
    }
  }

  // Logout from all devices
  async logoutAll(): Promise<void> {
    try {
      await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT_ALL);
    } finally {
      this.clearAuth();
    }
  }

  // Refresh access token
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response: AxiosResponse<AuthRefreshTokenResponse> =
      await axiosInstance.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  }

  // Request password reset
  async requestPasswordReset(
    data: AuthRequestPasswordResetDto
  ): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await axiosInstance.post(ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET, data);
    return response.data;
  }

  // Reset password
  async resetPassword(
    data: AuthResetPasswordDto
  ): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  }

  // Change password (authenticated)
  async changePassword(
    data: AuthChangePasswordDto
  ): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await axiosInstance.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data;
  }

  // Verify JWT token
  async verifyToken(
    data: AuthVerifyTokenDto
  ): Promise<AuthVerifyTokenResponse> {
    const response: AxiosResponse<AuthVerifyTokenResponse> =
      await axiosInstance.post(ENDPOINTS.AUTH.VERIFY_TOKEN, data);
    return response.data;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  }

  // Get current access token
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  // Get current user info
  getUser(): AuthUserInfo | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Clear all auth info
  clearAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new AuthService();
