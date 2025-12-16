// Types liên quan đến Movie

export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  duration: number;
  country: string;
  director: string;
  cast: string;
  description: string;
  trailerUrl?: string;
  rating?: number;
}

export interface MovieCard {
  id: number;
  title: string;
  poster: string;
  trailerUrl?: string;
  rating?: number;
}
