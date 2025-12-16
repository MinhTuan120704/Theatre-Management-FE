// Là một thanh đặt vé nhanh gồm: chọn các rạp, chọn phim có lịch chiếu sẵn sàng ở rạp đã chọn, chọn ngày chiếu có sẵn ở phim và rạp đã chọn, chọn suất chiếu ở rạp + phim + ngày đã chọn, nút đặt vé sẽ chuyển sang màn hình đặt vé với các thông tin đã chọn.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Film, Calendar, Clock } from "lucide-react";

// Mock data - TODO: Replace with API
const mockTheaters = [
  { id: 1, name: "CGV Vincom" },
  { id: 2, name: "CGV Landmark" },
  { id: 3, name: "Lotte Cinema" },
];

const mockMovies = [
  { id: 1, title: "Cục Vàng Của Ngoại" },
  { id: 2, title: "Avatar 3" },
  { id: 3, title: "Fast & Furious 11" },
];

const mockDates = [
  { value: "2024-12-17", label: "Hôm nay - 17/12" },
  { value: "2024-12-18", label: "Ngày mai - 18/12" },
  { value: "2024-12-19", label: "Thứ 5 - 19/12" },
];

const mockShowtimes = [
  { id: 1, time: "10:00" },
  { id: 2, time: "14:30" },
  { id: 3, time: "18:45" },
  { id: 4, time: "21:00" },
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
                {showtime.time}
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
