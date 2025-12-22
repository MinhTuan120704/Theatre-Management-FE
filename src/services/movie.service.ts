import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  MovieResponseDto,
  MovieCreateDto,
  MovieUpdateDto,
  PaginatedMoviesResponse,
  ApiSuccess,
  MoviesByCinemaResponse,
} from "../types";

export interface GetAllMoviesParams {
  limit?: number;
  page?: number;
}

class MovieService {
  /**
   * Get all movies with pagination
   */
  async getAll(params?: GetAllMoviesParams): Promise<PaginatedMoviesResponse> {
    const response: AxiosResponse<PaginatedMoviesResponse> =
      await axiosInstance.get(ENDPOINTS.MOVIES.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get movie by ID
   */
  async getById(id: number): Promise<MovieResponseDto> {
    const response: AxiosResponse<MovieResponseDto> = await axiosInstance.get(
      ENDPOINTS.MOVIES.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get movies by cinema ID with incoming showtimes
   */
  async getByCinemaId(cinemaId: number): Promise<MoviesByCinemaResponse> {
    const response: AxiosResponse<MoviesByCinemaResponse> = await axiosInstance.get(
      ENDPOINTS.MOVIES.GET_BY_CINEMA_ID(cinemaId)
    );
    return response.data;
  }

  /**
   * Create new movie
   */
  async create(data: MovieCreateDto): Promise<MovieResponseDto> {
    const response: AxiosResponse<MovieResponseDto> = await axiosInstance.post(
      ENDPOINTS.MOVIES.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update movie
   */
  async update(id: number, data: MovieUpdateDto): Promise<MovieResponseDto> {
    const response: AxiosResponse<MovieResponseDto> = await axiosInstance.patch(
      ENDPOINTS.MOVIES.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete movie
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.MOVIES.DELETE(id)
    );
    return response.data;
  }
}

export default new MovieService();
