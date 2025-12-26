// Common API Response Types
import type { CinemaResponseDto } from "./cinema.types";
import type { MovieResponseDto } from "./movie.types";
import type { OrderResponseDto } from "./order.types";
import type { ProductResponseDto } from "./product.types";
import type { ReviewResponseDto } from "./review.types";
import type { UserPublic } from "./user.types";
import type { RoomResponseDto } from "./room.types";
import type { SeatResponseDto } from "./seat.types";
import type { ShowtimeResponseDto } from "./showtime.types";
import type { TicketResponseDto } from "./ticket.types";
import type { DiscountResponseDto } from "./discount.types";
import type { EmployeeResponseDto } from "./employee.types";

// Pagination metadata
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// Standard API error response
export interface ApiError {
  error: string;
}

// Standard success message response
export interface ApiSuccess {
  message: string;
}

// Paginated list responses for each entity
export interface PaginatedCinemasResponse {
  cinemas: CinemaResponseDto[];
  pagination: Pagination;
}

export interface PaginatedMoviesResponse {
  movies: MovieResponseDto[];
  pagination: Pagination;
}

export interface PaginatedOrdersResponse {
  orders: OrderResponseDto[];
  pagination: Pagination;
}

export interface PaginatedProductsResponse {
  products: ProductResponseDto[];
  pagination: Pagination;
}

export interface PaginatedReviewsResponse {
  reviews: ReviewResponseDto[];
  pagination: Pagination;
}

export interface PaginatedUsersResponse {
  users: UserPublic[];
  pagination: Pagination;
}

export interface PaginatedRoomsResponse {
  rooms: RoomResponseDto[];
  pagination: Pagination;
}

export interface PaginatedSeatsResponse {
  seats: SeatResponseDto[];
  pagination: Pagination;
}

export interface PaginatedShowtimesResponse {
  showtimes: ShowtimeResponseDto[];
  pagination: Pagination;
}

export interface PaginatedTicketsResponse {
  tickets: TicketResponseDto[];
  pagination: Pagination;
}

export interface PaginatedDiscountsResponse {
  discounts: DiscountResponseDto[];
  pagination: Pagination;
}

export interface PaginatedEmployeesResponse {
  employees: EmployeeResponseDto[];
  pagination: Pagination;
}
