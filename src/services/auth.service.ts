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
  AuthRefreshTokenResponse,
  UserPublic,
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
    const resp = response.data as any;
    // Try several common locations for tokens, including `tokens` object used by backend
    let accessToken: string | undefined =
      resp?.tokens?.accessToken ??
      resp?.accessToken ??
      resp?.token ??
      resp?.data?.accessToken ??
      resp?.data?.token;
    let refreshToken: string | undefined =
      resp?.tokens?.refreshToken ??
      resp?.refreshToken ??
      resp?.data?.refreshToken ??
      resp?.data?.refreshTokenToken;

    // Also check Authorization header (some backends return in headers)
    const headerAuth =
      response.headers?.authorization ?? response.headers?.Authorization;
    if (!accessToken && typeof headerAuth === "string") {
      accessToken = headerAuth.startsWith("Bearer ")
        ? headerAuth.slice(7)
        : headerAuth;
    }

    const user = resp?.user ?? resp?.data?.user ?? resp?.userInfo ?? resp?.data;

    // Dev debug: log token extraction result (remove or lower log level in production)
    try {
      // eslint-disable-next-line no-console
      console.debug("AuthService.login: tokens found ->", {
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        user: !!user,
      });
    } catch (e) {
      /* ignore */
    }

    if (accessToken) {
      const normalized = accessToken.startsWith("Bearer ")
        ? accessToken.slice(7)
        : accessToken;
      localStorage.setItem("accessToken", normalized);
    }
    if (refreshToken) {
      const normalizedR = refreshToken.startsWith("Bearer ")
        ? refreshToken.slice(7)
        : refreshToken;
      localStorage.setItem("refreshToken", normalizedR);
    }
    if (user) localStorage.setItem("user", JSON.stringify(user));
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
    const resp = response.data as any;
    const accessToken: string | undefined =
      resp?.accessToken ?? resp?.tokens?.accessToken ?? resp?.data?.accessToken;
    if (!accessToken) throw new Error("No access token returned from refresh");
    const normalized = accessToken.startsWith("Bearer ")
      ? accessToken.slice(7)
      : accessToken;
    localStorage.setItem("accessToken", normalized);
    // Update axios defaults
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (axiosInstance.defaults.headers as any).common =
        (axiosInstance.defaults.headers as any).common || {};
      (axiosInstance.defaults.headers as any).common[
        "Authorization"
      ] = `Bearer ${normalized}`;
    } catch (e) {
      /* ignore */
    }
    return normalized;
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
  getUser(): UserPublic | null {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as UserPublic) : null;
  }

  // Clear all auth info
  clearAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new AuthService();
