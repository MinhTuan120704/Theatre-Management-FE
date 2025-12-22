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

// Extended types for showtime search responses
export interface ShowtimeCinemaInfo {
  id: number;
  name: string;
  address: string;
}

export interface ShowtimeRoomInfo {
  id: number;
  cinemaId: number;
  name: string;
  capacity: number;
  cinema: ShowtimeCinemaInfo;
}

export interface ShowtimeWithRoomInfo {
  id: number;
  showTime: string;
  price: string;
  movieId: number;
  roomId: number;
  room: ShowtimeRoomInfo;
}

export interface ShowtimeSearchResponse {
  showtimes: ShowtimeWithRoomInfo[];
}
