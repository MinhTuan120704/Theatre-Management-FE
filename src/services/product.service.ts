import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  ProductResponseDto,
  ProductCreateDto,
  ProductUpdateDto,
  PaginatedProductsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllProductsParams {
  limit?: number;
  page?: number;
}

class ProductService {
  /**
   * Get all products with pagination
   */
  async getAll(
    params?: GetAllProductsParams
  ): Promise<PaginatedProductsResponse> {
    const response: AxiosResponse<PaginatedProductsResponse> =
      await axiosInstance.get(ENDPOINTS.PRODUCTS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get product by ID
   */
  async getById(id: number): Promise<ProductResponseDto> {
    const response: AxiosResponse<ProductResponseDto> = await axiosInstance.get(
      ENDPOINTS.PRODUCTS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new product
   */
  async create(data: ProductCreateDto): Promise<ProductResponseDto> {
    const response: AxiosResponse<ProductResponseDto> =
      await axiosInstance.post(ENDPOINTS.PRODUCTS.CREATE, data);
    return response.data;
  }

  /**
   * Update product
   */
  async update(
    id: number,
    data: ProductUpdateDto
  ): Promise<ProductResponseDto> {
    const response: AxiosResponse<ProductResponseDto> =
      await axiosInstance.patch(ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete product
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.PRODUCTS.DELETE(id)
    );
    return response.data;
  }
}

export default new ProductService();
