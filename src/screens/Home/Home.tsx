// Gồm các component sau: Carousel, QuickBooking, một list các MovieCard được sắp xếp theo chiều ngang và có thể swipe theo chiều ngang để xem thêm.

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "./components/Carousel";
import QuickBooking from "./components/QuickBooking";
import MovieCard from "./components/MovieCard";

// Mock data - TODO: Replace with API
const mockNowShowingMovies = [
  {
    id: 1,
    title: "Cục Vàng Của Ngoại",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 8.5,
  },
  {
    id: 2,
    title: "Avatar: The Way of Water",
    poster:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 9.0,
  },
  {
    id: 3,
    title: "Fast & Furious 11",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 7.8,
  },
  {
    id: 4,
    title: "The Marvels",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 8.2,
  },
  {
    id: 5,
    title: "Wonka",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 8.7,
  },
];

const mockComingSoonMovies = [
  {
    id: 6,
    title: "Dune: Part Three",
    poster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 9.2,
  },
  {
    id: 7,
    title: "Spider-Man: Beyond",
    poster:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 8.9,
  },
  {
    id: 8,
    title: "The Batman 2",
    poster:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    trailerUrl: "https://youtube.com",
    rating: 9.1,
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
