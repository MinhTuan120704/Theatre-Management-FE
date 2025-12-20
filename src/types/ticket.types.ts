// Ticket Types
export interface Ticket {
  id: number;
  orderId: number;
  showtimeId: number;
  seatId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketCreateDto {
  orderId: number;
  showtimeId: number;
  seatId: number;
}

export interface TicketUpdateDto {
  orderId?: number;
  showtimeId?: number;
  seatId?: number;
}

export interface TicketResponseDto {
  id: number;
  orderId: number;
  showtimeId: number;
  seatId: number;
}
