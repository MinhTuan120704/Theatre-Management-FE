import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  OrderResponseDto,
  OrderCreateDto,
  OrderUpdateDto,
  PaginatedOrdersResponse,
  ApiSuccess,
} from "../types";

export interface GetAllOrdersParams {
  limit?: number;
  page?: number;
}

class OrderService {
  /**
   * Get all orders with pagination
   */
  async getAll(params?: GetAllOrdersParams): Promise<PaginatedOrdersResponse> {
    const response: AxiosResponse<PaginatedOrdersResponse> =
      await axiosInstance.get(ENDPOINTS.ORDERS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get order by ID
   */
  async getById(id: number): Promise<OrderResponseDto> {
    const response: AxiosResponse<OrderResponseDto> = await axiosInstance.get(
      ENDPOINTS.ORDERS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Get orders by user ID
   */
  async getByUserId(userId: number): Promise<OrderResponseDto[]> {
    const response: AxiosResponse<OrderResponseDto[]> = await axiosInstance.get(
      ENDPOINTS.ORDERS.GET_BY_USER_ID(userId)
    );
    return response.data;
  }

  /**
   * Create new order
   */
  async create(data: OrderCreateDto): Promise<OrderResponseDto> {
    const response: AxiosResponse<OrderResponseDto> = await axiosInstance.post(
      ENDPOINTS.ORDERS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update order
   */
  async update(id: number, data: OrderUpdateDto): Promise<OrderResponseDto> {
    const response: AxiosResponse<OrderResponseDto> = await axiosInstance.patch(
      ENDPOINTS.ORDERS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Delete order
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.ORDERS.DELETE(id)
    );
    return response.data;
  }
}

export default new OrderService();
