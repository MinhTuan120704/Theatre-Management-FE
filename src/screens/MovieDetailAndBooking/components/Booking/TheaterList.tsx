// một nút để chọn rạp từ danh sách các rạp
// chọn xong sẽ hiển thị 1 card ở dưới hiển thị thông tin rạp kèm các suất chiếu của phim này ở rạp này
// cùng một lúc chỉ có thể chọn 1 suất

import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Theater } from "../../../../types";

interface TheaterListProps {
  theaters: Theater[];
  selectedTheater: number | null;
  selectedShowtime: string | null;
  onSelectTheater: (theaterId: number) => void;
  onSelectShowtime: (showtime: string) => void;
}

const TheaterList = ({
  theaters,
  selectedTheater,
  selectedShowtime,
  onSelectTheater,
  onSelectShowtime,
}: TheaterListProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedTheaterData = theaters.find((t) => t.id === selectedTheater);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">DANH SÁCH RẠP</h2>

        {/* Theater Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-6 py-2 bg-white/10 border-2 border-white/30 text-white rounded-lg hover:bg-white/20 transition"
          >
            <MapPin size={18} />
            <span>Chọn rạp</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {theaters.map((theater) => (
                <button
                  key={theater.id}
                  onClick={() => {
                    onSelectTheater(theater.id);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="font-semibold text-gray-900">
                    {theater.name}
                  </div>
                  <div className="text-xs text-gray-600">{theater.address}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Theater Card */}
      {selectedTheaterData && (
        <div className="bg-brand-purple-2 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-white">
            {selectedTheaterData.name}
          </h3>
          <p className="text-white text-sm">{selectedTheaterData.address}</p>

          {/* Showtimes */}
          <div className="flex flex-wrap gap-3">
            {selectedTheaterData.showtimes.map((time) => (
              <button
                key={time}
                onClick={() => onSelectShowtime(time)}
                className={`px-6 py-2 rounded-lg font-bold transition ${
                  selectedShowtime === time
                    ? "bg-brand-yellow-dark text-black"
                    : "bg-white/10 border-2 border-white/30 text-white hover:bg-white/20"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterList;
