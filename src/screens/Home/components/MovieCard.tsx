// Thẻ phim gồm: Tiêu đề phim ở trên cùng, ảnh poster của phim, 1 link xem trailer của phim được đặt cạnh nút đặt vé (với id phim tương ứng và chuyển sang màn hình MovieDetailAndBooking và scroll xuống phần Booking)

import { useNavigate } from "react-router-dom";
import { Play, Ticket } from "lucide-react";
import type { MovieResponseDto } from "../../../types";

type MovieCardProps = MovieResponseDto;

const MovieCard = ({ id, title, posterUrl, trailerUrl }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/movie/${id}#booking`);
  };

  const handleTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="flex-shrink-0 cursor-pointer"
      style={{ width: "280px" }}
      onClick={handleCardClick}
    >
      {/* Movie Title */}
      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 min-h-[56px] uppercase text-center flex items-center justify-center">
        {title}
      </h3>

      {/* Movie Poster */}
      <div className="relative rounded-lg overflow-hidden mb-3">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTrailer(e);
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-white/30 text-white rounded-md hover:bg-white/10 transition font-medium text-sm"
        >
          <Play size={16} />
          Xem Trailer
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBooking();
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-yellow-dark text-black rounded-md hover:bg-brand-yellow-light transition font-bold text-sm uppercase"
        >
          <Ticket size={16} />
          Đặt vé
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
