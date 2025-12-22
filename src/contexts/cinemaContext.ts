import { createContext } from "react";
import type { CinemaResponseDto } from "../types";

export interface CinemaContextType {
  selectedCinema: CinemaResponseDto | null;
  setSelectedCinema: (cinema: CinemaResponseDto | null) => void;
  allCinemas: CinemaResponseDto[];
  setAllCinemas: (cinemas: CinemaResponseDto[]) => void;
}

export const CinemaContext = createContext<CinemaContextType | undefined>(undefined);
