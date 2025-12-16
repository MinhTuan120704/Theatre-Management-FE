// Types liên quan đến Booking

export interface ShowtimeDate {
  date: string;
  dayOfWeek: string;
}

export interface Theater {
  id: number;
  name: string;
  address: string;
  showtimes: string[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "booked";
}

export interface FoodDrink {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface BookingSummary {
  movieId: number;
  movieTitle: string;
  theaterId: number;
  theaterName: string;
  showtime: string;
  selectedSeats: string[];
  foodDrinks: Record<number, number>;
  totalPrice: number;
}
