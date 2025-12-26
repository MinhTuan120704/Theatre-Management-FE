// Payment Types
export type PaymentMethod = "credit_card" | "paypal" | "cash";

export interface PaymentProcessDto {
  paymentMethod: PaymentMethod;
  isSuccess?: boolean;
}

export interface PaymentStatusResponse {
  orderId: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  paidAt?: Date;
}
