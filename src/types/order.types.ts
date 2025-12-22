// Order Types
export type PaymentMethod = "credit_card" | "paypal" | "cash";
export type OrderStatus = "pending" | "completed" | "failed" | "cancelled";

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paidAt: Date;
  discountId: number | null;
  orderedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderTicketDto {
  showtimeId: number;
  seatId: number;
}

export interface OrderProductDto {
  productId: number;
  quantity: number;
}

export interface OrderCreateDto {
  userId: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paidAt?: Date;
  discountId?: number;
  orderedAt: Date;
  tickets?: OrderTicketDto[];
  products?: OrderProductDto[];
}

export interface OrderUpdateDto {
  userId?: number;
  totalPrice?: number;
  paymentMethod?: PaymentMethod;
  status?: OrderStatus;
  paidAt?: Date;
  discountId?: number;
  orderedAt?: Date;
}

export interface OrderResponseDto {
  id: number;
  userId: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paidAt?: Date;
  discountId?: number;
  orderedAt: Date;
}

// Order Product Details Types
export interface OrderProductDetails {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrderProductDetailCreateDto {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrderProductDetailUpdateDto {
  orderId?: number;
  productId?: number;
  quantity?: number;
}
