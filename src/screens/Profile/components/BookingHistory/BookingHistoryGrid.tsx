// Một Grid gồm các TicketInfoRow để render và lazyloading, có các cột: Mã đơn, phim, Ngày, Tổng tiền, [Cột trống chứa các phím tương tác]
import { useState, useEffect } from "react";
import TicketInfoRow from "./TicketInfoRow";

interface Ticket {
  orderId: string;
  orderIdNumber?: number;
  movieTitle?: string;
  showtime: string;
  total: number;
  status?: string;
}

interface BookingHistoryGridProps {
  fetchTickets: () => Promise<Ticket[]>;
  onCancel: (orderId: string) => Promise<void>;
  onPay?: (orderId: number) => void;
}

const BookingHistoryGrid = ({
  fetchTickets,
  onCancel,
  onPay,
}: BookingHistoryGridProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchTickets()
      .then((data) => {
        if (isMounted) setTickets(data);
      })
      .catch(() => {
        if (isMounted) setError("Không thể tải lịch sử vé.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [fetchTickets]);

  return (
    <div className="bg-brand-purple-2 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-white mb-4">LỊCH SỬ MUA VÉ</h2>
      <div className="grid grid-cols-5 gap-4 pb-2 border-b border-white/30 text-white font-semibold">
        <div>Mã đơn</div>
        <div>Phim</div>
        <div>Ngày</div>
        <div>Tổng tiền</div>
        <div></div>
      </div>
      {loading ? (
        <div className="text-white py-6 text-center">Đang tải...</div>
      ) : error ? (
        <div className="text-red-400 py-6 text-center">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="text-white py-6 text-center">Không có vé nào</div>
      ) : (
        tickets.map((ticket) => (
          <TicketInfoRow
            key={ticket.orderId}
            {...ticket}
            onCancel={onCancel}
            onPay={onPay}
          />
        ))
      )}
    </div>
  );
};

export default BookingHistoryGrid;
