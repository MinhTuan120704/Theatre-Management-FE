import axiosInstance, { AxiosResponse } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  TicketResponseDto,
  TicketCreateDto,
  TicketUpdateDto,
  PaginatedTicketsResponse,
  ApiSuccess,
} from "../types";

export interface GetAllTicketsParams {
  limit?: number;
  page?: number;
}

class TicketService {
  /**
   * Get all tickets with pagination
   */
  async getAll(
    params?: GetAllTicketsParams
  ): Promise<PaginatedTicketsResponse> {
    const response: AxiosResponse<PaginatedTicketsResponse> =
      await axiosInstance.get(ENDPOINTS.TICKETS.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get ticket by ID
   */
  async getById(id: number): Promise<TicketResponseDto> {
    const response: AxiosResponse<TicketResponseDto> = await axiosInstance.get(
      ENDPOINTS.TICKETS.GET_BY_ID(id)
    );
    return response.data;
  }

  /**
   * Create new ticket
   */
  async create(data: TicketCreateDto): Promise<TicketResponseDto> {
    const response: AxiosResponse<TicketResponseDto> = await axiosInstance.post(
      ENDPOINTS.TICKETS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Update ticket
   */
  async update(id: number, data: TicketUpdateDto): Promise<TicketResponseDto> {
    const response: AxiosResponse<TicketResponseDto> =
      await axiosInstance.patch(ENDPOINTS.TICKETS.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete ticket
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.TICKETS.DELETE(id)
    );
    return response.data;
  }
}

export default new TicketService();
