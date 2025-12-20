// Gồm các component sau: Carousel, QuickBooking, một list các MovieCard được sắp xếp theo chiều ngang và có thể swipe theo chiều ngang để xem thêm.

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "./components/Carousel";
import QuickBooking from "./components/QuickBooking";
import MovieCard from "./components/MovieCard";
import type { MovieResponseDto } from "../../types";

// Mock data - TODO: Replace with API
const mockNowShowingMovies: MovieResponseDto[] = [
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
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 2,
    title: "Avatar: The Way of Water",
    genres: ["Hành động", "Khoa học viễn tưởng"],
    description: "Phần tiếp theo của bộ phim Avatar huyền thoại.",
    director: "James Cameron",
    actors: ["Sam Worthington", "Zoe Saldana"],
    country: "Mỹ",
    durationMinutes: 192,
    releaseDate: new Date("2024-12-10"),
    posterUrl:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 3,
    title: "Fast & Furious 11",
    genres: ["Hành động", "Phiêu lưu"],
    description: "Cuộc đua tốc độ mới với nhiều màn hành động nóng bỏng.",
    director: "Justin Lin",
    actors: ["Vin Diesel", "Michelle Rodriguez"],
    country: "Mỹ",
    durationMinutes: 150,
    releaseDate: new Date("2024-12-15"),
    posterUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 4,
    title: "The Marvels",
    genres: ["Hành động", "Siêu anh hùng"],
    description:
      "Các siêu anh hùng Marvel tập hợp để đối đầu với thế lực đen tối.",
    director: "Nia DaCosta",
    actors: ["Brie Larson", "Teyonah Parris"],
    country: "Mỹ",
    durationMinutes: 135,
    releaseDate: new Date("2024-12-08"),
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 5,
    title: "Wonka",
    genres: ["Phiêu lưu", "Gia đình"],
    description:
      "Hành trình trở thành nhà sản xuất sô-cô-la vĩ đại của Willy Wonka.",
    director: "Paul King",
    actors: ["Timothée Chalamet", "Hugh Grant"],
    country: "Anh",
    durationMinutes: 116,
    releaseDate: new Date("2024-12-12"),
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
];

const mockComingSoonMovies: MovieResponseDto[] = [
  {
    id: 6,
    title: "Dune: Part Three",
    genres: ["Khoa học viễn tưởng", "Phiêu lưu"],
    description: "Phần tiếp theo của series Dune đình đám.",
    director: "Denis Villeneuve",
    actors: ["Timothée Chalamet", "Zendaya"],
    country: "Mỹ",
    durationMinutes: 165,
    releaseDate: new Date("2025-03-15"),
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 7,
    title: "Spider-Man: Beyond",
    genres: ["Hoạt hình", "Hành động"],
    description: "Spider-Man tiếp tục cuộc phiêu lưu xuyên đa vũ trụ.",
    director: "Joaquim Dos Santos",
    actors: ["Shameik Moore", "Hailee Steinfeld"],
    country: "Mỹ",
    durationMinutes: 140,
    releaseDate: new Date("2025-02-20"),
    posterUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
  {
    id: 8,
    title: "The Batman 2",
    genres: ["Hành động", "Tâm lý"],
    description: "Batman đối đầu với kẻ thù mới nguy hiểm hơn.",
    director: "Matt Reeves",
    actors: ["Robert Pattinson", "Zoë Kravitz"],
    country: "Mỹ",
    durationMinutes: 170,
    releaseDate: new Date("2025-04-10"),
    posterUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
  },
];

const MovieSection = ({
  title,
  movies,
}: {
  title: string;
  movies: typeof mockNowShowingMovies;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
      {/* Hero Carousel */}
      <Carousel />

      {/* Quick Booking */}
      <div className="container mx-auto">
        <QuickBooking />
      </div>

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-12">
        <MovieSection title="PHIM ĐANG CHIẾU" movies={mockNowShowingMovies} />
        <MovieSection title="PHIM SẮP CHIẾU" movies={mockComingSoonMovies} />
      </div>
    </div>
  );
};

export default Home;
