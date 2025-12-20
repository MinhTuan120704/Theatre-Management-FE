import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  DiscountResponseDto,
  DiscountCreateDto,
  DiscountUpdateDto,
  PaginatedDiscountsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllDiscountsParams {
  limit?: number;
  page?: number;
}

class DiscountService {
  /**
   * Get all discounts with pagination
   */
  async getAll(
    params?: GetAllDiscountsParams
  ): Promise<PaginatedDiscountsResponse> {
    const response: AxiosResponse<PaginatedDiscountsResponse> =
      await axiosInstance.get(ENDPOINTS.DISCOUNTS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get discount by ID
   */
  async getById(id: number): Promise<DiscountResponseDto> {
    const response: AxiosResponse<DiscountResponseDto> =
      await axiosInstance.get(ENDPOINTS.DISCOUNTS.GET_BY_ID(id));
    return response.data;
  }

  /**
   * Create new discount
   */
  async create(data: DiscountCreateDto): Promise<DiscountResponseDto> {
    const response: AxiosResponse<DiscountResponseDto> =
      await axiosInstance.post(ENDPOINTS.DISCOUNTS.CREATE, data);
    return response.data;
  }

  /**
   * Update discount
   */
  async update(
    id: number,
    data: DiscountUpdateDto
  ): Promise<DiscountResponseDto> {
    const response: AxiosResponse<DiscountResponseDto> =
      await axiosInstance.patch(ENDPOINTS.DISCOUNTS.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete discount
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.DISCOUNTS.DELETE(id)
    );
    return response.data;
  }
}

export default new DiscountService();
