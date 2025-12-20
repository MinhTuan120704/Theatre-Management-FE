// Là một thanh đặt vé nhanh gồm: chọn các rạp, chọn phim có lịch chiếu sẵn sàng ở rạp đã chọn, chọn ngày chiếu có sẵn ở phim và rạp đã chọn, chọn suất chiếu ở rạp + phim + ngày đã chọn, nút đặt vé sẽ chuyển sang màn hình đặt vé với các thông tin đã chọn.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Film, Calendar, Clock } from "lucide-react";
import type {
  CinemaResponseDto,
  MovieResponseDto,
  ShowtimeResponseDto,
} from "../../../types";

// Mock data - TODO: Replace with API
const mockTheaters: CinemaResponseDto[] = [
  { id: 1, name: "CGV Vincom", address: "Tầng 5, Vincom Center, Quận 1" },
  { id: 2, name: "CGV Landmark", address: "Landmark 81, Bình Thạnh" },
  { id: 3, name: "Lotte Cinema", address: "Lotte Mart, Quận 7" },
];

const mockMovies: MovieResponseDto[] = [
  {
    id: 1,
    title: "Cục Vàng Của Ngoại",
    genres: ["Hài", "Gia đình"],
    description: "Một bộ phim hài hước về gia đình và tình yêu thương.",
    director: "Nguyễn Văn A",
    actors: ["Diễn viên A", "Diễn viên B"],
    country: "Việt Nam",
    durationMinutes: 120,
    releaseDate: new Date("2024-12-01"),
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 2,
    title: "Avatar 3",
    genres: ["Hành động", "Khoa học viễn tưởng"],
    description: "Phần tiếp theo của Avatar.",
    director: "James Cameron",
    actors: ["Sam Worthington", "Zoe Saldana"],
    country: "Mỹ",
    durationMinutes: 180,
    releaseDate: new Date("2024-12-15"),
    posterUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 3,
    title: "Fast & Furious 11",
    genres: ["Hành động"],
    description: "Cuộc đua tốc độ.",
    director: "Justin Lin",
    actors: ["Vin Diesel", "Michelle Rodriguez"],
    country: "Mỹ",
    durationMinutes: 150,
    releaseDate: new Date("2024-12-10"),
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    trailerUrl: "https://youtube.com",
  },
];

const mockDates = [
  { value: "2024-12-17", label: "Hôm nay - 17/12" },
  { value: "2024-12-18", label: "Ngày mai - 18/12" },
  { value: "2024-12-19", label: "Thứ 5 - 19/12" },
];

const mockShowtimes: ShowtimeResponseDto[] = [
  {
    id: 1,
    roomId: 1,
    movieId: 1,
    showTime: new Date("2024-12-17T10:00:00"),
    price: 80000,
  },
  {
    id: 2,
    roomId: 1,
    movieId: 1,
    showTime: new Date("2024-12-17T14:30:00"),
    price: 90000,
  },
  {
    id: 3,
    roomId: 2,
    movieId: 1,
    showTime: new Date("2024-12-17T18:45:00"),
    price: 100000,
  },
  {
    id: 4,
    roomId: 2,
    movieId: 1,
    showTime: new Date("2024-12-17T21:00:00"),
    price: 100000,
  },
];

const QuickBooking = () => {
  const navigate = useNavigate();
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const handleBooking = () => {
    if (selectedTheater && selectedMovie && selectedDate && selectedShowtime) {
      navigate(`/booking/${selectedShowtime}`);
    }
  };

  const isBookingEnabled =
    selectedTheater && selectedMovie && selectedDate && selectedShowtime;

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
            value={selectedTheater}
            onChange={(e) => {
              setSelectedTheater(e.target.value);
              setSelectedMovie("");
              setSelectedDate("");
              setSelectedShowtime("");
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="">Chọn rạp</option>
            {mockTheaters.map((theater) => (
              <option key={theater.id} value={theater.id}>
                {theater.name}
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
            disabled={!selectedTheater}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Chọn phim</option>
            {mockMovies.map((movie) => (
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
            {mockDates.map((date) => (
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
            disabled={!selectedDate}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Chọn giờ</option>
            {mockShowtimes.map((showtime) => (
              <option key={showtime.id} value={showtime.id}>
                {new Date(showtime.showTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Button */}
        <div className="flex items-end">
          <button
            onClick={handleBooking}
            disabled={!isBookingEnabled}
            className="w-full px-6 py-3 bg-brand-purple-2 text-white font-bold rounded-md hover:bg-brand-purple-1 transition disabled:bg-disable disabled:cursor-not-allowed uppercase text-sm"
          >
            ĐẶt vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
