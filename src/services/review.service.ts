import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  ReviewResponseDto,
  ReviewCreateDto,
  ReviewUpdateDto,
  PaginatedReviewsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllReviewsParams {
  limit?: number;
  page?: number;
}

class ReviewService {
  /**
   * Get all reviews with pagination
   */
  async getAll(
    params?: GetAllReviewsParams
  ): Promise<PaginatedReviewsResponse> {
    const response: AxiosResponse<PaginatedReviewsResponse> =
      await axiosInstance.get(ENDPOINTS.REVIEWS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get review by ID
   */
  async getById(id: number): Promise<ReviewResponseDto> {
    const response: AxiosResponse<ReviewResponseDto> = await axiosInstance.get(
      ENDPOINTS.REVIEWS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new review
   */
  async create(data: ReviewCreateDto): Promise<ReviewResponseDto> {
    const response: AxiosResponse<ReviewResponseDto> = await axiosInstance.post(
      ENDPOINTS.REVIEWS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update review
   */
  async update(id: number, data: ReviewUpdateDto): Promise<ReviewResponseDto> {
    const response: AxiosResponse<ReviewResponseDto> =
      await axiosInstance.patch(ENDPOINTS.REVIEWS.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete review
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.REVIEWS.DELETE(id)
    );
    return response.data;
  }
}

export default new ReviewService();
