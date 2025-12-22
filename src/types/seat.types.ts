// Seat Types
export interface Seat {
  id: number;
  roomId: number;
  seatNumber: string;
  isReserved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SeatCreateDto {
  roomId: number;
  seatNumber: string;
  isReserved?: boolean;
}

export interface SeatUpdateDto {
  roomId?: number;
  seatNumber?: string;
  isReserved?: boolean;
}

export interface SeatResponseDto {
  id: number;
  roomId: number;
  seatNumber: string;
  isReserved: boolean;
}
