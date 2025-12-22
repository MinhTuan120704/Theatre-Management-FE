import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  RoomResponseDto,
  RoomCreateDto,
  RoomUpdateDto,
  PaginatedRoomsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllRoomsParams {
  limit?: number;
  page?: number;
}

class RoomService {
  /**
   * Get all rooms with pagination
   */
  async getAll(params?: GetAllRoomsParams): Promise<PaginatedRoomsResponse> {
    const response: AxiosResponse<PaginatedRoomsResponse> =
      await axiosInstance.get(ENDPOINTS.ROOMS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get room by ID
   */
  async getById(id: number): Promise<RoomResponseDto> {
    const response: AxiosResponse<RoomResponseDto> = await axiosInstance.get(
      ENDPOINTS.ROOMS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new room
   */
  async create(data: RoomCreateDto): Promise<RoomResponseDto> {
    const response: AxiosResponse<RoomResponseDto> = await axiosInstance.post(
      ENDPOINTS.ROOMS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update room
   */
  async update(id: number, data: RoomUpdateDto): Promise<RoomResponseDto> {
    const response: AxiosResponse<RoomResponseDto> = await axiosInstance.patch(
      ENDPOINTS.ROOMS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete room
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.ROOMS.DELETE(id)
    );
    return response.data;
  }
}

export default new RoomService();
