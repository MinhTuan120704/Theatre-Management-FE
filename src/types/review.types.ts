// Review Types
export interface Review {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ReviewCreateDto {
  userId: number;
  movieId: number;
  rating: number;
  comment: string;
}

export interface ReviewUpdateDto {
  userId?: number;
  movieId?: number;
  rating?: number;
  comment?: string;
}

export interface ReviewResponseDto {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}
