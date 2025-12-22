import { useState } from "react";
import type { ReactNode } from "react";
import type { CinemaResponseDto } from "../types";
import { CinemaContext } from "./cinemaContext";

export const CinemaProvider = ({ children }: { children: ReactNode }) => {
  // Use lazy initialization to load from localStorage only once on mount
  const [selectedCinema, setSelectedCinemaState] =
    useState<CinemaResponseDto | null>(() => {
      const savedCinema = localStorage.getItem("selectedCinema");
      if (savedCinema) {
        try {
          return JSON.parse(savedCinema);
        } catch (error) {
          console.error("Error parsing saved cinema:", error);
          localStorage.removeItem("selectedCinema");
          return null;
        }
      }
      return null;
    });
  const [allCinemas, setAllCinemas] = useState<CinemaResponseDto[]>([]);

  // Save selected cinema to localStorage whenever it changes
  const setSelectedCinema = (cinema: CinemaResponseDto | null) => {
    setSelectedCinemaState(cinema);
    if (cinema) {
      localStorage.setItem("selectedCinema", JSON.stringify(cinema));
    } else {
      localStorage.removeItem("selectedCinema");
    }
  };

  return (
    <CinemaContext.Provider
      value={{ selectedCinema, setSelectedCinema, allCinemas, setAllCinemas }}
    >
      {children}
    </CinemaContext.Provider>
  );
};
