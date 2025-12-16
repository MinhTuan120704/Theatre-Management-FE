// Màn hình chi tiết thông tin và đặt vé nhanh:
// Nửa trên gồm các component trong Movie Detail được sắp xếp theo layout dọc: Movie Info, Rating, Bình luận.
// Nửa dưới gồm các component trong Booking: MovieShowtimes (lấy theo id của phim), TheaterList (lấy theo id phim), SeatList (theo đúng id của rạp và giờ chiếu được chọn ở TheaterList), FoodDrinkSelection, BookingSummaryPanel (tổng hợp các trường cần thiết sau khi chọn từ các component trên).

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieInfo from "./components/MovieDetail/MovieInfo";
import Rating from "./components/MovieDetail/Rating";
import Comment from "./components/MovieDetail/Comment";
import MovieShowtimes from "./components/Booking/MovieShowtimes";
import TheaterList from "./components/Booking/TheaterList";
import SeatList from "./components/Booking/SeatList";
import FoodDrinkSelection from "./components/Booking/FoodDrinkSelection";
import BookingSummaryPanel from "./components/Booking/BookingSummaryPanel";

// Mock data - TODO: Replace with API
const mockMovie = {
  id: 1,
  title: "Lọ Lem Chơi Ngại",
  poster:
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  genre: "Kinh dị",
  duration: 90,
  country: "Việt Nam",
  director: "Tôm",
  cast: "Tuấn, Minh",
  description:
    "Bộ phim xoay quanh Yui - cô gái bị nhốt người lại trong ca nhà của Ambar và mang danh 'tiểu tam'. Từ một người lạ thành lạ, Yui rơi vào chân thành một rắc rối tình yêu bị các tiện lạ một rắc yêu bỏ. Những cảm nhận phức tạp liên tục khiến cô hoảng loạn và cửa nủa thẳm, Yui bất đầu cùng nhìn với những người lại cũ, ám chỉ và theo dõi hoảng...",
  trailerUrl: "https://youtube.com",
};

const mockComments = [
  {
    id: 1,
    userName: "Minh Tuấn",
    rating: 5,
    comment: "Phim đã làm và cần xúc...",
  },
  {
    id: 2,
    userName: "Thái Tuấn",
    rating: 5,
    comment: "Phim thực hay lắm...",
  },
];

const mockDates = [
  { date: "07/11", dayOfWeek: "Thứ Sáu" },
  { date: "08/11", dayOfWeek: "Thứ Bảy" },
  { date: "09/11", dayOfWeek: "Chủ Nhật" },
];

const mockTheaters = [
  {
    id: 1,
    name: "Cinema Bình Dương",
    address: "Nhà văn hóa anh viên - Đồng Hòa, HCM",
    showtimes: ["08:00", "10:00"],
  },
  {
    id: 2,
    name: "Cinema Thủ Đức",
    address: "Khu phố 6, phường Linh Trung, Thủ Đức",
    showtimes: ["14:00", "16:00", "18:00"],
  },
];

const mockSeats = (() => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seats: Array<{
    id: string;
    row: string;
    number: number;
    status: "available" | "selected" | "booked";
  }> = [];
  rows.forEach((row) => {
    for (let num = 1; num <= 14; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        status: (Math.random() > 0.8 ? "booked" : "available") as
          | "available"
          | "booked",
      });
    }
  });
  return seats;
})();

const mockFoodDrinks = [
  {
    id: 1,
    name: "COMBO 1",
    price: 149000,
    image:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "COMBO 2",
    price: 249000,
    image:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "COMBO 3",
    price: 349000,
    image:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=200&h=200&fit=crop",
  },
];

const MovieDetailAndBooking = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // State management
  const [comments, setComments] = useState(mockComments);
  const [selectedDate, setSelectedDate] = useState(mockDates[0].date);
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState(mockSeats);
  const [selectedFoodDrinks, setSelectedFoodDrinks] = useState<
    Record<number, number>
  >({});

  // Scroll to booking section if hash is present
  useEffect(() => {
    if (window.location.hash === "#booking") {
      setTimeout(() => {
        document
          .getElementById("booking-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const handleRatingSubmit = (rating: number, comment: string) => {
    const newComment = {
      id: comments.length + 1,
      userName: "Người dùng mới",
      rating,
      comment,
    };
    setComments([...comments, newComment]);
  };

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );

    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId
          ? {
              ...seat,
              status: selectedSeats.includes(seatId) ? "available" : "selected",
            }
          : seat
      )
    );
  };

  const handleFoodDrinkUpdate = (itemId: number, quantity: number) => {
    setSelectedFoodDrinks((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const calculateTotalPrice = () => {
    const seatPrice = 49000;
    const seatsTotal = selectedSeats.length * seatPrice;
    const foodTotal = Object.entries(selectedFoodDrinks).reduce(
      (sum, [itemId, qty]) => {
        const item = mockFoodDrinks.find((f) => f.id === Number(itemId));
        return sum + (item ? item.price * qty : 0);
      },
      0
    );
    return seatsTotal + foodTotal;
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    console.log("Booking:", {
      movieId,
      theater: selectedTheater,
      showtime: selectedShowtime,
      seats: selectedSeats,
      foodDrinks: selectedFoodDrinks,
      total: calculateTotalPrice(),
    });
    navigate("/booking/confirmation");
  };

  const selectedTheaterData = mockTheaters.find(
    (t) => t.id === selectedTheater
  );

  return (
    <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Movie Detail Section */}
        <div className="mb-16">
          <MovieInfo movie={mockMovie} />
          <Rating onSubmit={handleRatingSubmit} />
          <Comment comments={comments} />
        </div>

        {/* Booking Section */}
        <div id="booking-section" className="scroll-mt-20">
          <MovieShowtimes
            dates={mockDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <TheaterList
            theaters={mockTheaters}
            selectedTheater={selectedTheater}
            selectedShowtime={selectedShowtime}
            onSelectTheater={setSelectedTheater}
            onSelectShowtime={setSelectedShowtime}
          />

          {selectedTheater && selectedShowtime && (
            <>
              <SeatList
                seats={seats}
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatSelect}
                theaterName={selectedTheaterData?.name.split(" ").pop() || "1"}
              />

              <FoodDrinkSelection
                items={mockFoodDrinks}
                selectedItems={selectedFoodDrinks}
                onUpdateQuantity={handleFoodDrinkUpdate}
              />
            </>
          )}
        </div>

        {/* Booking Summary - Full Width at Bottom */}
        {selectedTheater && selectedShowtime && selectedSeats.length > 0 && (
          <div className="mt-8">
            <BookingSummaryPanel
              movieTitle={mockMovie.title}
              theaterName={selectedTheaterData?.name || ""}
              showtime={`Phòng chiếu: ${selectedShowtime}`}
              selectedSeats={selectedSeats}
              totalPrice={calculateTotalPrice()}
              onBooking={handleBooking}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailAndBooking;
