import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  ShowtimeResponseDto,
  ShowtimeCreateDto,
  ShowtimeUpdateDto,
  PaginatedShowtimesResponse,
  ApiSuccess,
} from "../types";

export interface GetAllShowtimesParams {
  limit?: number;
  page?: number;
}

class ShowtimeService {
  /**
   * Get all showtimes with pagination
   */
  async getAll(
    params?: GetAllShowtimesParams
  ): Promise<PaginatedShowtimesResponse> {
    const response: AxiosResponse<PaginatedShowtimesResponse> =
      await axiosInstance.get(ENDPOINTS.SHOWTIMES.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get showtime by ID
   */
  async getById(id: number): Promise<ShowtimeResponseDto> {
    const response: AxiosResponse<ShowtimeResponseDto> =
      await axiosInstance.get(ENDPOINTS.SHOWTIMES.GET_BY_ID(id));
    return response.data;
  }

  /**
   * Create new showtime
   */
  async create(data: ShowtimeCreateDto): Promise<ShowtimeResponseDto> {
    const response: AxiosResponse<ShowtimeResponseDto> =
      await axiosInstance.post(ENDPOINTS.SHOWTIMES.CREATE, data);
    return response.data;
  }

  /**
   * Update showtime
   */
  async update(
    id: number,
    data: ShowtimeUpdateDto
  ): Promise<ShowtimeResponseDto> {
    const response: AxiosResponse<ShowtimeResponseDto> =
      await axiosInstance.patch(ENDPOINTS.SHOWTIMES.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete showtime
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.SHOWTIMES.DELETE(id)
    );
    return response.data;
  }
}

export default new ShowtimeService();
