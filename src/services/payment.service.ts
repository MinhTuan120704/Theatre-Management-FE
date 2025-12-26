import axiosInstance from "../config/axios";
import type { PaymentProcessDto, PaymentStatusResponse } from "../types/payment.types";

const PaymentService = {
  /**
   * Process payment for an order
   */
  processPayment: async (orderId: number, data: PaymentProcessDto) => {
    const response = await axiosInstance.post(`/payments/${orderId}/process`, data);
    return response.data;
  },

  /**
   * Check payment status for an order
   */
  checkPaymentStatus: async (orderId: number): Promise<PaymentStatusResponse> => {
    const response = await axiosInstance.get(`/payments/${orderId}/status`);
    return response.data;
  },
};

export default PaymentService;
