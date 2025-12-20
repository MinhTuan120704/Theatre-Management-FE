// Hiển thị danh sách các button tương ứng với layout ghế ở trong rạp
// có thể chọn nhiều ghế cùng 1 lúc, ghế đang được chọn phải được highlight, ghế đã đặt phải disable

import type { SeatResponseDto } from "../../../../types";

interface SeatListProps {
  seats: SeatResponseDto[];
  selectedSeats: number[];
  onSelectSeat: (seatId: number) => void;
  theaterName: string;
}

const SeatList = ({
  seats,
  selectedSeats,
  onSelectSeat,
  theaterName,
}: SeatListProps) => {
  // Extract row and number from seatNumber (e.g., "A1" -> row: "A", number: 1)
  const seatsWithRowNumber = seats.map((seat) => {
    const match = seat.seatNumber.match(/^([A-Z]+)(\d+)$/);
    return {
      ...seat,
      row: match ? match[1] : "",
      number: match ? parseInt(match[2]) : 0,
    };
  });

  // Group seats by row
  const seatsByRow = seatsWithRowNumber.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, typeof seatsWithRowNumber>);

  const rows = Object.keys(seatsByRow).sort();

  const getSeatClass = (seat: (typeof seatsWithRowNumber)[0]) => {
    if (seat.isReserved) {
      return "bg-gray-500 cursor-not-allowed text-white";
    }
    if (selectedSeats.includes(seat.id)) {
      return "bg-brand-yellow-dark text-black font-bold";
    }
    return "bg-white text-black hover:bg-gray-200";
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        CHỌN GHẾ - {theaterName}
      </h2>

      {/* Screen */}
      <div className="mb-8">
        <div className="w-full max-w-4xl mx-auto">
          <svg viewBox="0 0 600 40" className="w-full">
            <path
              d="M 50 40 Q 300 0 550 40"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <p className="text-center text-white font-bold mt-2">Màn hình</p>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="max-w-5xl mx-auto space-y-2 mb-6">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="text-white font-bold w-8 text-center">{row}</span>
            <div className="flex gap-2">
              {seatsByRow[row].map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => !seat.isReserved && onSelectSeat(seat.id)}
                  disabled={seat.isReserved}
                  className={`w-10 h-10 rounded text-xs font-semibold transition ${getSeatClass(
                    seat
                  )}`}
                >
                  {seat.seatNumber}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded" />
          <span className="text-white">Ghế còn trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-yellow-dark rounded" />
          <span className="text-white">Ghế đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-500 rounded" />
          <span className="text-white">Ghế đã đặt</span>
        </div>
      </div>
    </div>
  );
};

export default SeatList;
