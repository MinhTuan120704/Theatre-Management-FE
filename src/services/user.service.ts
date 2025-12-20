import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  UserResponseDto,
  UserCreateDto,
  UserUpdateDto,
  PaginatedUsersResponse,
  ApiSuccess,
} from "../types";

export interface GetAllUsersParams {
  limit?: number;
  page?: number;
}

class UserService {
  /**
   * Get all users with pagination
   */
  async getAll(params?: GetAllUsersParams): Promise<PaginatedUsersResponse> {
    const response: AxiosResponse<PaginatedUsersResponse> =
      await axiosInstance.get(ENDPOINTS.USERS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get user by ID
   */
  async getById(id: number): Promise<UserResponseDto> {
    const response: AxiosResponse<UserResponseDto> = await axiosInstance.get(
      ENDPOINTS.USERS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<UserResponseDto> {
    const response: AxiosResponse<UserResponseDto> = await axiosInstance.get(
      ENDPOINTS.USERS.GET_BY_EMAIL(email)
    );
    return response.data;
  }

  /**
   * Create new user
   */
  async create(data: UserCreateDto): Promise<UserResponseDto> {
    const response: AxiosResponse<UserResponseDto> = await axiosInstance.post(
      ENDPOINTS.USERS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update user
   */
  async update(id: number, data: UserUpdateDto): Promise<UserResponseDto> {
    const response: AxiosResponse<UserResponseDto> = await axiosInstance.patch(
      ENDPOINTS.USERS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete user
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.USERS.DELETE(id)
    );
    return response.data;
  }
}

export default new UserService();
