// Là một thanh đặt vé nhanh gồm: chọn các rạp, chọn phim có lịch chiếu sẵn sàng ở rạp đã chọn, chọn ngày chiếu có sẵn ở phim và rạp đã chọn, chọn suất chiếu ở rạp + phim + ngày đã chọn, nút đặt vé sẽ chuyển sang màn hình đặt vé với các thông tin đã chọn.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Film, Calendar, Clock } from "lucide-react";
import {
  CinemaService,
  MovieService,
  ShowtimeService,
} from "../../../services";
import type {
  CinemaResponseDto,
  MovieResponseDto,
  ShowtimeResponseDto,
} from "../../../types";

// Generate date options for next 7 days
const generateDates = () => {
  const dates = [];
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayOfWeek = days[date.getDay()];
    const dateStr = date.toISOString().split("T")[0];
    const label =
      i === 0
        ? `Hôm nay - ${date.getDate()}/${date.getMonth() + 1}`
        : i === 1
        ? `Ngày mai - ${date.getDate()}/${date.getMonth() + 1}`
        : `${dayOfWeek} - ${date.getDate()}/${date.getMonth() + 1}`;
    dates.push({ value: dateStr, label });
  }
  return dates;
};

const QuickBooking = () => {
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState<CinemaResponseDto[]>([]);
  const [movies, setMovies] = useState<MovieResponseDto[]>([]);
  const [showtimes, setShowtimes] = useState<ShowtimeResponseDto[]>([]);
  const [dates] = useState(generateDates());

  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const [loading, setLoading] = useState({
    cinemas: true,
    movies: false,
    showtimes: false,
  });

  // Fetch cinemas on mount
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        setLoading((prev) => ({ ...prev, cinemas: true }));
        const response = await CinemaService.getAll({ limit: 50 });
        setCinemas(response.cinemas);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      } finally {
        setLoading((prev) => ({ ...prev, cinemas: false }));
      }
    };

    fetchCinemas();
  }, []);

  // Fetch movies when cinema is selected
  useEffect(() => {
    if (!selectedCinema) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading((prev) => ({ ...prev, movies: true }));
        const response = await MovieService.getAll({ limit: 50 });
        // Filter movies that are currently showing
        const now = new Date();
        const nowShowing = response.movies.filter(
          (movie) => new Date(movie.releaseDate) <= now
        );
        setMovies(nowShowing);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading((prev) => ({ ...prev, movies: false }));
      }
    };

    fetchMovies();
  }, [selectedCinema]);

  // Fetch showtimes when movie and date are selected
  useEffect(() => {
    if (!selectedMovie || !selectedDate) {
      setShowtimes([]);
      return;
    }

    const fetchShowtimes = async () => {
      try {
        setLoading((prev) => ({ ...prev, showtimes: true }));
        const response = await ShowtimeService.getAll({ limit: 100 });
        // Filter showtimes by movie and date
        const filtered = response.showtimes.filter((showtime) => {
          const showtimeDate = new Date(showtime.showTime)
            .toISOString()
            .split("T")[0];
          return (
            showtime.movieId === Number(selectedMovie) &&
            showtimeDate === selectedDate
          );
        });
        setShowtimes(filtered);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setLoading((prev) => ({ ...prev, showtimes: false }));
      }
    };

    fetchShowtimes();
  }, [selectedMovie, selectedDate]);

  const handleBooking = () => {
    if (selectedCinema && selectedMovie && selectedDate && selectedShowtime) {
      // Navigate to movie detail page with showtime
      navigate(`/movie/${selectedMovie}#booking`);
    }
  };

  const isBookingEnabled =
    selectedCinema && selectedMovie && selectedDate && selectedShowtime;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 -mt-8 relative z-10 mx-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">
        ĐẶT VÉ NHANH
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Theater Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <MapPin size={18} className="text-purple-600" />
            1. Chọn rạp
          </label>
          <select
            value={selectedCinema}
            onChange={(e) => {
              setSelectedCinema(e.target.value);
              setSelectedMovie("");
              setSelectedDate("");
              setSelectedShowtime("");
            }}
            disabled={loading.cinemas}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {loading.cinemas ? "Đang tải..." : "Chọn rạp"}
            </option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        {/* Movie Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Film size={18} className="text-purple-600" />
            2. Chọn phim
          </label>
          <select
            value={selectedMovie}
            onChange={(e) => {
              setSelectedMovie(e.target.value);
              setSelectedDate("");
              setSelectedShowtime("");
            }}
            disabled={!selectedCinema || loading.movies}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {loading.movies ? "Đang tải..." : "Chọn phim"}
            </option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Calendar size={18} className="text-purple-600" />
            3. Chọn ngày
          </label>
          <select
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedShowtime("");
            }}
            disabled={!selectedMovie}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Chọn ngày</option>
            {dates.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>

        {/* Showtime Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock size={18} className="text-purple-600" />
            4. Chọn suất
          </label>
          <select
            value={selectedShowtime}
            onChange={(e) => setSelectedShowtime(e.target.value)}
            disabled={!selectedDate || loading.showtimes}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {loading.showtimes ? "Đang tải..." : "Chọn giờ"}
            </option>
            {showtimes.map((showtime) => (
              <option key={showtime.id} value={showtime.id}>
                {new Date(showtime.showTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {showtime.price.toLocaleString()} VNĐ
              </option>
            ))}
          </select>
        </div>

        {/* Booking Button */}
        <div className="flex items-end">
          <button
            onClick={handleBooking}
            disabled={!isBookingEnabled}
            className="w-full px-6 py-3 bg-brand-purple-2 text-white font-bold rounded-md hover:bg-brand-purple-1 transition disabled:bg-gray-300 disabled:cursor-not-allowed uppercase text-sm"
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
