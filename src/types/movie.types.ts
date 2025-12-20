// Movie Types
export interface Movie {
  id: number;
  title: string;
  description: string;
  genres: string[];
  director: string;
  releaseDate: Date;
  durationMinutes: number;
  country: string;
  actors: string[];
  posterUrl: string;
  trailerUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MovieCreateDto {
  title: string;
  genres: string[];
  description: string;
  director: string;
  actors: string[];
  country: string;
  durationMinutes: number;
  releaseDate: Date;
  posterUrl: string;
  trailerUrl: string;
}

export interface MovieUpdateDto {
  title?: string;
  genres?: string[];
  description?: string;
  director?: string;
  actors?: string[];
  country?: string;
  durationMinutes?: number;
  releaseDate?: Date;
  posterUrl?: string;
  trailerUrl?: string;
}

export interface MovieResponseDto {
  id: number;
  title: string;
  genres: string[];
  description: string;
  director: string;
  actors: string[];
  country: string;
  durationMinutes: number;
  releaseDate: Date;
  posterUrl: string;
  trailerUrl: string;
}
