// Các nút lịch chiếu, chỉ cho phép chọn 1 nút cùng 1 lúc: nút có ngày chiếu + thứ

import type { ShowtimeDate } from "../../../../types";

interface MovieShowtimesProps {
  dates: ShowtimeDate[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const MovieShowtimes = ({
  dates,
  selectedDate,
  onSelectDate,
}: MovieShowtimesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        LỊCH CHIẾU
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {dates.map((dateItem) => (
          <button
            key={dateItem.date}
            onClick={() => onSelectDate(dateItem.date)}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              selectedDate === dateItem.date
                ? "bg-brand-yellow-dark text-black"
                : "bg-white/10 text-white border-2 border-white/30 hover:bg-white/20"
            }`}
          >
            <div className="text-center">
              <div className="text-lg">{dateItem.date}</div>
              <div className="text-xs">{dateItem.dayOfWeek}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieShowtimes;
