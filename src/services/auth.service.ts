import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type { AuthLoginDto, AuthResponseDto } from "../types";

class AuthService {
  /**
   * Login user
   */
  async login(credentials: AuthLoginDto): Promise<AuthResponseDto> {
    const response: AxiosResponse<AuthResponseDto> = await axiosInstance.post(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Save tokens to localStorage
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response: AxiosResponse<{ accessToken: string }> =
      await axiosInstance.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }
}

export default new AuthService();
