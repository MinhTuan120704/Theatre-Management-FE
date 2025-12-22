import { useContext } from "react";
import { CinemaContext } from "./cinemaContext";

export const useCinema = () => {
  const context = useContext(CinemaContext);
  if (context === undefined) {
    throw new Error("useCinema must be used within a CinemaProvider");
  }
  return context;
};
