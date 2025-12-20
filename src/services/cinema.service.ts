import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  CinemaResponseDto,
  CinemaCreateDto,
  CinemaUpdateDto,
  PaginatedCinemasResponse,
  ApiSuccess,
} from "../types";

export interface GetAllCinemasParams {
  limit?: number;
  page?: number;
}

class CinemaService {
  /**
   * Get all cinemas with pagination
   */
  async getAll(
    params?: GetAllCinemasParams
  ): Promise<PaginatedCinemasResponse> {
    const response: AxiosResponse<PaginatedCinemasResponse> =
      await axiosInstance.get(ENDPOINTS.CINEMAS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get cinema by ID
   */
  async getById(id: number): Promise<CinemaResponseDto> {
    const response: AxiosResponse<CinemaResponseDto> = await axiosInstance.get(
      ENDPOINTS.CINEMAS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new cinema
   */
  async create(data: CinemaCreateDto): Promise<CinemaResponseDto> {
    const response: AxiosResponse<CinemaResponseDto> = await axiosInstance.post(
      ENDPOINTS.CINEMAS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update cinema
   */
  async update(id: number, data: CinemaUpdateDto): Promise<CinemaResponseDto> {
    const response: AxiosResponse<CinemaResponseDto> =
      await axiosInstance.patch(ENDPOINTS.CINEMAS.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete cinema
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.CINEMAS.DELETE(id)
    );
    return response.data;
  }
}

export default new CinemaService();
