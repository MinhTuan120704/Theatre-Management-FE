// Gồm các thông tin đang đặt vé ở trên, có nút đặt vé và bộ đếm thời gian giữ vé

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface BookingSummaryPanelProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  selectedSeats: string[];
  totalPrice: number;
  onBooking: () => void;
}

const BookingSummaryPanel = ({
  movieTitle,
  theaterName,
  showtime,
  selectedSeats,
  totalPrice,
  onBooking,
}: BookingSummaryPanelProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (selectedSeats.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedSeats]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-brand-purple-3 text-white p-8 rounded-2xl shadow-2xl border-2 border-brand-purple-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {/* Movie Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold uppercase">{movieTitle}</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Cinema:</span> {theaterName}
              </p>
              <p>
                <span className="font-semibold">Phòng chiếu:</span> {showtime}
              </p>
              {selectedSeats.length > 0 && (
                <p>
                  <span className="font-semibold">Ghế:</span>{" "}
                  {selectedSeats.join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* Timer */}
          {selectedSeats.length > 0 && (
            <div className="bg-brand-yellow-dark text-black px-6 py-4 rounded-lg">
              <div className="text-center space-y-1">
                <span className="font-bold text-sm block">
                  Thời gian giữ vé
                </span>
                <div className="flex items-center justify-center gap-2">
                  <Clock size={24} />
                  <span className="text-3xl font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Total Price */}
          <div className="text-center lg:text-left space-y-1">
            <span className="font-bold text-lg block">Tạm tính</span>
            <span className="text-4xl font-bold text-brand-yellow-dark block">
              {totalPrice.toLocaleString()} VNĐ
            </span>
          </div>

          {/* Booking Button */}
          <button
            onClick={onBooking}
            disabled={selectedSeats.length === 0}
            className="py-5 bg-brand-yellow-dark text-black font-bold text-xl rounded-lg hover:bg-brand-yellow-light transition disabled:bg-gray-400 disabled:cursor-not-allowed uppercase shadow-lg"
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPanel;
