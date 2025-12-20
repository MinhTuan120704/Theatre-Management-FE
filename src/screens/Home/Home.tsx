// Gồm các component sau: Carousel, QuickBooking, một list các MovieCard được sắp xếp theo chiều ngang và có thể swipe theo chiều ngang để xem thêm.

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "./components/Carousel";
import QuickBooking from "./components/QuickBooking";
import MovieCard from "./components/MovieCard";
import { MovieService } from "../../services";
import type { MovieResponseDto } from "../../types";

const MovieSection = ({
  title,
  movies,
  loading,
}: {
  title: string;
  movies: MovieResponseDto[];
  loading: boolean;
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

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 animate-pulse"
              style={{ width: "280px" }}
            >
              <div className="bg-gray-700 h-[56px] rounded mb-3" />
              <div className="bg-gray-700 h-[400px] rounded mb-3" />
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-700 h-10 rounded" />
                <div className="flex-1 bg-gray-700 h-10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
          ) : (
            <p className="text-white text-center w-full">
              Không có phim nào để hiển thị
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [nowShowingMovies, setNowShowingMovies] = useState<MovieResponseDto[]>(
    []
  );
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieResponseDto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all movies
        const response = await MovieService.getAll({ limit: 50 });
        const allMovies = response.movies;

        // Separate movies by release date
        const now = new Date();
        const nowShowing = allMovies.filter(
          (movie) => new Date(movie.releaseDate) <= now
        );
        const comingSoon = allMovies.filter(
          (movie) => new Date(movie.releaseDate) > now
        );

        setNowShowingMovies(nowShowing);
        setComingSoonMovies(comingSoon);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen">
      {/* Hero Carousel */}
      <Carousel />

      {/* Quick Booking */}
      <div className="container mx-auto">
        <QuickBooking />
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 py-12">
        <MovieSection
          title="PHIM ĐANG CHIẾU"
          movies={nowShowingMovies}
          loading={loading}
        />
        <MovieSection
          title="PHIM SẮP CHIẾU"
          movies={comingSoonMovies}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;
