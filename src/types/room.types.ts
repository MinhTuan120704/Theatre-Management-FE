// Room Types
export interface Room {
  id: number;
  cinemaId: number;
  name: string;
  capacity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SeatDto {
  seat_name: string;
  seat_column: string;
}

export interface RoomCreateDto {
  cinemaId: number;
  name: string;
  capacity: number;
  seats?: SeatDto[];
}

export interface RoomUpdateDto {
  cinemaId?: number;
  name?: string;
  capacity?: number;
}

export interface RoomResponseDto {
  id: number;
  cinemaId: number;
  name: string;
  capacity: number;
  cinema?: {
    name: string;
    address: string;
  };
}
