// Carousel gồm các banner movie với id của movie tương ứng, tự động scroll sau vài giây, có thể ấn vào để chuyển sang trang MovieDetailAndBooking tương ứng

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieService } from "../../../services";
import type { MovieResponseDto } from "../../../types";

const Carousel = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await MovieService.getAll({ limit: 5 });
        // Get only movies that are currently showing
        const now = new Date();
        const nowShowing = response.movies.filter(
          (movie) => new Date(movie.releaseDate) <= now
        );
        setMovies(nowShowing.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies for carousel:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleBannerClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-r from-purple-900 to-blue-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Không có phim để hiển thị</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-[0_0_100%] min-w-0 relative cursor-pointer"
              onClick={() => handleBannerClick(movie.id)}
            >
              <div className="relative h-[500px] bg-gradient-to-r from-purple-900 to-blue-900">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="container mx-auto px-4 pb-12">
                    <h2 className="text-5xl font-bold text-white mb-4">
                      {movie.title}
                    </h2>
                    <p className="text-white text-lg mb-2">
                      {movie.genres.join(" • ")}
                    </p>
                    <p className="text-white/80 mb-4 max-w-2xl line-clamp-2">
                      {movie.description}
                    </p>
                    <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition">
                      XEM THÊM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
