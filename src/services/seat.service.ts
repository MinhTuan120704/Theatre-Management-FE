import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  SeatResponseDto,
  SeatCreateDto,
  SeatUpdateDto,
  PaginatedSeatsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllSeatsParams {
  limit?: number;
  page?: number;
}

class SeatService {
  /**
   * Get all seats with pagination
   */
  async getAll(params?: GetAllSeatsParams): Promise<PaginatedSeatsResponse> {
    const response: AxiosResponse<PaginatedSeatsResponse> =
      await axiosInstance.get(ENDPOINTS.SEATS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get seat by ID
   */
  async getById(id: number): Promise<SeatResponseDto> {
    const response: AxiosResponse<SeatResponseDto> = await axiosInstance.get(
      ENDPOINTS.SEATS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new seat
   */
  async create(data: SeatCreateDto): Promise<SeatResponseDto> {
    const response: AxiosResponse<SeatResponseDto> = await axiosInstance.post(
      ENDPOINTS.SEATS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update seat
   */
  async update(id: number, data: SeatUpdateDto): Promise<SeatResponseDto> {
    const response: AxiosResponse<SeatResponseDto> = await axiosInstance.patch(
      ENDPOINTS.SEATS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete seat
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.SEATS.DELETE(id)
    );
    return response.data;
  }
}

export default new SeatService();
