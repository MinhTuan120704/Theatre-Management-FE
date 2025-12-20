// Cinema Types
export interface Cinema {
  id: number;
  name: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CinemaCreateDto {
  name: string;
  address: string;
}

export interface CinemaUpdateDto {
  name?: string;
  address?: string;
}

export interface CinemaResponseDto {
  id: number;
  name: string;
  address: string;
}
