// Showtime Types
export interface ShowTime {
  id: number;
  showTime: Date;
  price: number;
  movieId: number;
  roomId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShowtimeCreateDto {
  roomId: number;
  movieId: number;
  showTime: Date;
  price: number;
}

export interface ShowtimeUpdateDto {
  roomId?: number;
  movieId?: number;
  showTime?: Date;
  price?: number;
}

export interface ShowtimeResponseDto {
  id: number;
  roomId: number;
  movieId: number;
  showTime: Date;
  price: number;
}
