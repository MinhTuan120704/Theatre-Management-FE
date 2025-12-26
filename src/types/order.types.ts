// Order Types
import type { PaymentMethod } from "./payment.types";
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

// Detailed order returned by user-facing APIs (includes movie/cinema/showtime/seats/products)
export interface OrderSeatDto {
  seatId: number;
  seatNumber: string;
}

export interface OrderProductDtoResponse {
  productId: number;
  productName: string;
  productPrice: string; // price may come as string from API (e.g. "40000.00")
  quantity: number;
}

export interface OrderDetailResponseDto {
  id: number;
  userId: number;
  totalPrice: string; // API may return string price
  paymentMethod?: PaymentMethod | null;
  status: OrderStatus;
  reservationExpiresAt?: string | null;
  paidAt?: string | null;
  discountId?: number | null;
  orderedAt: string;
  movieId?: number;
  movieTitle?: string;
  cinemaId?: number;
  cinemaName?: string;
  cinemaAddress?: string;
  roomId?: number;
  roomName?: string;
  showTime?: string;
  seats?: OrderSeatDto[];
  products?: OrderProductDtoResponse[];
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
