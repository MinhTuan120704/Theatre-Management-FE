// Màn hình chi tiết thông tin và đặt vé nhanh:
// Nửa trên gồm các component trong Movie Detail được sắp xếp theo layout dọc: Movie Info, Rating, Bình luận.
// Nửa dưới gồm các component trong Booking: MovieShowtimes (lấy theo id của phim), TheaterList (lấy theo id phim), SeatList (theo đúng id của rạp và giờ chiếu được chọn ở TheaterList), FoodDrinkSelection, BookingSummaryPanel (tổng hợp các trường cần thiết sau khi chọn từ các component trên).

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import MovieInfo from "./components/MovieDetail/MovieInfo";
import Rating from "./components/MovieDetail/Rating";
import Comment from "./components/MovieDetail/Comment";
import MovieShowtimes from "./components/Booking/MovieShowtimes";
import TheaterList from "./components/Booking/TheaterList";
import SeatList from "./components/Booking/SeatList";
import FoodDrinkSelection from "./components/Booking/FoodDrinkSelection";
import BookingSummaryPanel from "./components/Booking/BookingSummaryPanel";
import {
  MovieService,
  ReviewService,
  ShowtimeService,
  SeatService,
  ProductService,
} from "../../services";
import type {
  MovieResponseDto,
  ReviewResponseDto,
  SeatResponseDto,
  ProductResponseDto,
  ShowtimeResponseDto,
  ShowtimeWithRoomInfo,
} from "../../types";

const MovieDetailAndBooking = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get booking params from URL if coming from QuickBooking
  const urlDate = searchParams.get("date");
  const urlShowtimeId = searchParams.get("showtimeId");
  const urlRoomId = searchParams.get("roomId");

  // Loading states
  const [loading, setLoading] = useState({
    movie: true,
    reviews: true,
    showtimes: true,
    products: true,
    seats: false,
  });

  // Data states
  const [movie, setMovie] = useState<MovieResponseDto | null>(null);
  const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);
  const [showtimes, setShowtimes] = useState<ShowtimeResponseDto[]>([]);
  const [showtimeSearchData, setShowtimeSearchData] = useState<
    ShowtimeWithRoomInfo[]
  >([]);
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [seats, setSeats] = useState<SeatResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Selection states - initialize with URL params if available
  const [selectedDate, setSelectedDate] = useState<string>(urlDate || "");
  const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(
    urlRoomId ? Number(urlRoomId) : null
  );
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(
    urlShowtimeId ? Number(urlShowtimeId) : null
  );
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedFoodDrinks, setSelectedFoodDrinks] = useState<
    Record<number, number>
  >({});

  // Refs to track if data has been fetched for current movieId
  const fetchedMovieIdRef = useRef<number | null>(null);
  const fetchedProductsRef = useRef(false);

  // Fetch movie details, reviews, and showtimes when movieId changes
  useEffect(() => {
    if (!movieId) return;
    
    // Skip if already fetched for this movieId
    if (fetchedMovieIdRef.current === Number(movieId)) return;

    const fetchMovieData = async () => {
      try {
        setLoading((prev) => ({ ...prev, movie: true, reviews: true, showtimes: true }));
        
        // Fetch all data in parallel
        const [movieResponse, reviewResponse, showtimeResponse] = await Promise.all([
          MovieService.getById(Number(movieId)),
          ReviewService.getAll({ limit: 100 }),
          ShowtimeService.searchByMovieId(Number(movieId)),
        ]);

        // Set movie
        setMovie(movieResponse);

        // Filter and set reviews
        const movieReviews = reviewResponse.reviews.filter(
          (review) => review.movieId === Number(movieId)
        );
        setReviews(movieReviews);

        // Process and set showtimes
        setShowtimeSearchData(showtimeResponse.showtimes);
        const showtimeList = showtimeResponse.showtimes.map((st) => ({
          id: st.id,
          showTime: new Date(st.showTime),
          price: parseFloat(st.price),
          movieId: st.movieId,
          roomId: st.roomId,
        }));
        setShowtimes(showtimeList);

        // Set default date if coming directly (no URL params)
        if (!urlDate && showtimeResponse.showtimes.length > 0) {
          const firstDate = new Date(showtimeResponse.showtimes[0].showTime)
            .toISOString()
            .split("T")[0];
          setSelectedDate(firstDate);
        }
        
        // Mark as fetched
        fetchedMovieIdRef.current = Number(movieId);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Không thể tải thông tin phim");
      } finally {
        setLoading((prev) => ({ ...prev, movie: false, reviews: false, showtimes: false }));
      }
    };

    fetchMovieData();
  }, [movieId, urlDate]);

  // Fetch products (only once)
  useEffect(() => {
    const fetchProducts = async () => {
      // Skip if already fetched
      if (fetchedProductsRef.current) return;

      try {
        setLoading((prev) => ({ ...prev, products: true }));
        const response = await ProductService.getAll({ limit: 50 });
        setProducts(response.products);
        fetchedProductsRef.current = true;
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    fetchProducts();
  }, []);

  // Fetch seats when showtime is selected
  useEffect(() => {
    const fetchSeats = async () => {
      if (!selectedShowtimeId) {
        setSeats([]);
        return;
      }

      const selectedShowtime = showtimes.find(
        (st) => st.id === selectedShowtimeId
      );
      if (!selectedShowtime) return;

      try {
        setLoading((prev) => ({ ...prev, seats: true }));
        const response = await SeatService.getAll({ limit: 200 });
        // Filter seats by roomId on client side
        const roomSeats = response.seats.filter(
          (seat) => seat.roomId === selectedShowtime.roomId
        );
        setSeats(roomSeats);
      } catch (err) {
        console.error("Error fetching seats:", err);
        setError("Không thể tải danh sách ghế");
      } finally {
        setLoading((prev) => ({ ...prev, seats: false }));
      }
    };

    fetchSeats();
  }, [selectedShowtimeId, showtimes]);

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

  // Auto-select first theater and showtime when date changes or showtimes are loaded
  // Only if not coming from QuickBooking (no URL params)
  useEffect(() => {
    // Skip auto-select if we have URL params (already initialized in state)
    if (urlDate && urlShowtimeId && urlRoomId) return;

    if (selectedDate && showtimes.length > 0) {
      // Get showtimes for selected date
      const dateShowtimes = showtimes.filter(
        (st) =>
          new Date(st.showTime).toISOString().split("T")[0] === selectedDate
      );

      if (dateShowtimes.length > 0) {
        const firstRoomId = dateShowtimes[0].roomId;
        const firstShowtime = dateShowtimes.find(
          (st) => st.roomId === firstRoomId
        );

        // Update selections using callback to get latest state
        setSelectedTheaterId((prev) => {
          if (prev !== firstRoomId) return firstRoomId;
          return prev;
        });
        
        if (firstShowtime) {
          setSelectedShowtimeId((prev) => {
            if (prev !== firstShowtime.id) return firstShowtime.id;
            return prev;
          });
        }
      }
    }
  }, [selectedDate, showtimes, urlDate, urlShowtimeId, urlRoomId]);

  // Get unique dates from showtimes
  const availableDates = Array.from(
    new Set(
      showtimes.map((st) => new Date(st.showTime).toISOString().split("T")[0])
    )
  ).map((dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }),
      dayOfWeek: date.toLocaleDateString("vi-VN", { weekday: "long" }),
      isoDate: dateStr,
    };
  });

  // Get showtimes for selected date grouped by room
  const showtimesByRoom = showtimes
    .filter(
      (st) => new Date(st.showTime).toISOString().split("T")[0] === selectedDate
    )
    .reduce((acc, showtime) => {
      const roomKey = showtime.roomId;
      if (!acc[roomKey]) {
        acc[roomKey] = {
          roomId: showtime.roomId,
          showtimes: [],
        };
      }
      acc[roomKey].showtimes.push(showtime);
      return acc;
    }, {} as Record<number, { roomId: number; showtimes: ShowtimeResponseDto[] }>);

  const theaterList = Object.values(showtimesByRoom).map(
    ({ roomId, showtimes: roomShowtimes }) => {
      // Find room info from showtimeSearchData
      const showtimeWithRoom = showtimeSearchData.find(
        (st) => st.roomId === roomId
      );

      return {
        id: roomId,
        cinemaId: showtimeWithRoom?.room.cinemaId || 1,
        name: showtimeWithRoom?.room.name || `Phòng ${roomId}`,
        capacity: showtimeWithRoom?.room.capacity || 140,
        cinema: {
          name: showtimeWithRoom?.room.cinema.name || "Cinema",
          address: showtimeWithRoom?.room.cinema.address || "Địa chỉ rạp",
        },
        showtimes: roomShowtimes.map((st) =>
          new Date(st.showTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        showtimeIds: roomShowtimes.map((st) => st.id),
      };
    }
  );

  const handleRatingSubmit = async (rating: number, comment: string) => {
    if (!movieId) return;

    try {
      await ReviewService.create({
        userId: 1, // TODO: Get from auth context
        movieId: Number(movieId),
        rating,
        comment,
      });

      // Refresh reviews
      const response = await ReviewService.getAll({ limit: 100 });
      const movieReviews = response.reviews.filter(
        (review) => review.movieId === Number(movieId)
      );
      setReviews(movieReviews);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Không thể gửi đánh giá. Vui lòng thử lại sau.");
    }
  };

  const handleTheaterSelect = (theaterId: number) => {
    setSelectedTheaterId(theaterId);

    // Auto-select first showtime of selected theater
    const theater = theaterList.find((t) => t.id === theaterId);
    if (theater && theater.showtimeIds && theater.showtimeIds.length > 0) {
      setSelectedShowtimeId(theater.showtimeIds[0]);
    } else {
      setSelectedShowtimeId(null);
    }

    // Reset seats when theater changes
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (theaterId: number, showtimeIndex: number) => {
    const theater = theaterList.find((t) => t.id === theaterId);
    if (theater && theater.showtimeIds) {
      setSelectedShowtimeId(theater.showtimeIds[showtimeIndex]);
      setSelectedSeats([]);
    }
  };

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleFoodDrinkUpdate = (itemId: number, quantity: number) => {
    setSelectedFoodDrinks((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const calculateTotalPrice = () => {
    const selectedShowtime = showtimes.find(
      (st) => st.id === selectedShowtimeId
    );
    const seatPrice = selectedShowtime?.price || 0;
    const seatsTotal = selectedSeats.length * seatPrice;
    const foodTotal = Object.entries(selectedFoodDrinks).reduce(
      (sum, [itemId, qty]) => {
        const item = products.find((f) => f.id === Number(itemId));
        return sum + (item ? item.price * qty : 0);
      },
      0
    );
    return seatsTotal + foodTotal;
  };

  const handleBooking = () => {
    // TODO: Implement booking API call
    console.log("Booking:", {
      movieId,
      showtimeId: selectedShowtimeId,
      seats: selectedSeats,
      foodDrinks: selectedFoodDrinks,
      total: calculateTotalPrice(),
    });
    navigate("/booking/confirmation");
  };

  const selectedTheater = theaterList.find((t) => t.id === selectedTheaterId);

  if (loading.movie) {
    return (
      <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-700 rounded mb-8" />
            <div className="h-64 bg-gray-700 rounded mb-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded">
            {error || "Không tìm thấy phim"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Movie Detail Section */}
        <div className="mb-16">
          <MovieInfo movie={movie} />
          <Rating onSubmit={handleRatingSubmit} />
          <Comment comments={reviews} loading={loading.reviews} />
        </div>

        {/* Booking Section */}
        <div id="booking-section" className="scroll-mt-20">
          {loading.showtimes ? (
            <div className="text-white text-center py-8">
              Đang tải lịch chiếu...
            </div>
          ) : availableDates.length > 0 ? (
            <>
              <MovieShowtimes
                dates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <TheaterList
                theaters={theaterList}
                selectedTheater={selectedTheaterId}
                selectedShowtimeId={selectedShowtimeId}
                onSelectTheater={handleTheaterSelect}
                onSelectShowtime={handleShowtimeSelect}
              />

              {selectedShowtimeId && (
                <>
                  {loading.seats ? (
                    <div className="text-white text-center py-8">
                      Đang tải danh sách ghế...
                    </div>
                  ) : (
                    <SeatList
                      seats={seats}
                      selectedSeats={selectedSeats}
                      onSelectSeat={handleSeatSelect}
                      theaterName={selectedTheater?.name || ""}
                    />
                  )}

                  {!loading.products && (
                    <FoodDrinkSelection
                      items={products}
                      selectedItems={selectedFoodDrinks}
                      onUpdateQuantity={handleFoodDrinkUpdate}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-white text-center py-8">
              Hiện tại chưa có lịch chiếu cho phim này
            </div>
          )}
        </div>

        {/* Booking Summary - Full Width at Bottom */}
        {selectedShowtimeId && selectedSeats.length > 0 && (
          <div className="mt-8">
            <BookingSummaryPanel
              movieTitle={movie.title}
              theaterName={selectedTheater?.cinema?.name || ""}
              showtime={`Phòng chiếu: ${selectedTheater?.name || ""}`}
              selectedSeats={selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return seat?.seatNumber || "";
              })}
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
