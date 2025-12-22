import axiosInstance from "../config/axios";
import type { AxiosResponse } from "axios";
import { ENDPOINTS } from "../config/endpoints";
import type {
  EmployeeResponseDto,
  EmployeeCreateDto,
  EmployeeUpdateDto,
  PaginatedEmployeesResponse,
  ApiSuccess,
} from "../types";

export interface GetAllEmployeesParams {
  limit?: number;
  page?: number;
}

class EmployeeService {
  /**
   * Get all employees with pagination
   */
  async getAll(
    params?: GetAllEmployeesParams
  ): Promise<PaginatedEmployeesResponse> {
    const response: AxiosResponse<PaginatedEmployeesResponse> =
      await axiosInstance.get(ENDPOINTS.EMPLOYEES.GET_ALL, { params });
    return response.data;
  }

  /**
   * Get employee by ID
   */
  async getById(id: number): Promise<EmployeeResponseDto> {
    const response: AxiosResponse<EmployeeResponseDto> =
      await axiosInstance.get(ENDPOINTS.EMPLOYEES.GET_BY_ID(id));
    return response.data;
  }

  /**
   * Create new employee
   */
  async create(data: EmployeeCreateDto): Promise<EmployeeResponseDto> {
    const response: AxiosResponse<EmployeeResponseDto> =
      await axiosInstance.post(ENDPOINTS.EMPLOYEES.CREATE, data);
    return response.data;
  }

  /**
   * Update employee
   */
  async update(
    id: number,
    data: EmployeeUpdateDto
  ): Promise<EmployeeResponseDto> {
    const response: AxiosResponse<EmployeeResponseDto> =
      await axiosInstance.patch(ENDPOINTS.EMPLOYEES.UPDATE(id), data);
    return response.data;
  }

  /**
   * Delete employee
   */
  async delete(id: number): Promise<ApiSuccess> {
    const response: AxiosResponse<ApiSuccess> = await axiosInstance.delete(
      ENDPOINTS.EMPLOYEES.DELETE(id)
    );
    return response.data;
  }
}

export default new EmployeeService();
