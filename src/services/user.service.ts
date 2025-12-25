import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  UserPublic,
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
  async getById(id: number): Promise<UserPublic> {
    const response: AxiosResponse<UserPublic> = await axiosInstance.get(
      ENDPOINTS.USERS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<UserPublic> {
    const response: AxiosResponse<UserPublic> = await axiosInstance.get(
      ENDPOINTS.USERS.GET_BY_EMAIL(email)
    );
    return response.data;
  }

  /**
   * Create new user
   */
  async create(data: UserCreateDto): Promise<UserPublic> {
    const response: AxiosResponse<UserPublic> = await axiosInstance.post(
      ENDPOINTS.USERS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update user
   */
  async update(id: number, data: UserUpdateDto): Promise<UserPublic> {
    const response: AxiosResponse<UserPublic> = await axiosInstance.patch(
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
