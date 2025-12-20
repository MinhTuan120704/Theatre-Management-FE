// Bên trái là ảnh poster của phim
// Bên phải là thông tin phim: Tiêu đề phim, thể loại, độ dài phim, xuất xứ phim, thông tin ghi công (đạo diễn, diễn viên,...), nội dung phim (mô tả), nút xem trailer.

import { Film, Clock, Globe, Play } from "lucide-react";
import type { MovieResponseDto } from "../../../../types";

interface MovieInfoProps {
  movie: MovieResponseDto;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const handleTrailer = () => {
    if (movie.trailerUrl) {
      window.open(movie.trailerUrl, "_blank");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Movie Poster */}
      <div className="lg:col-span-1">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full rounded-lg shadow-2xl"
        />
      </div>

      {/* Movie Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase">
          {movie.title}
        </h1>

        {/* Quick Info Icons */}
        <div className="flex flex-wrap gap-4 text-brand-yellow-dark">
          <div className="flex items-center gap-2">
            <Film size={20} />
            <span className="text-white text-sm">
              {movie.genres.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span className="text-white text-sm">{movie.durationMinutes}'</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={20} />
            <span className="text-white text-sm">{movie.country}</span>
          </div>
        </div>

        {/* Mô tả Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Mô tả</h3>
          <div className="space-y-2 text-white text-sm">
            <p>
              <span className="font-semibold">Đạo diễn:</span> {movie.director}
            </p>
            <p>
              <span className="font-semibold">Diễn viên:</span>{" "}
              {movie.actors.join(", ")}
            </p>
          </div>
        </div>

        {/* Nội dung phim */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Nội dung phim</h3>
          <p className="text-white text-sm leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Trailer Button */}
        <button
          onClick={handleTrailer}
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-brand-yellow-dark text-brand-yellow-dark rounded-lg hover:bg-brand-yellow-dark hover:text-black transition font-bold"
        >
          <Play size={20} fill="currentColor" />
          Xem Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieInfo;
