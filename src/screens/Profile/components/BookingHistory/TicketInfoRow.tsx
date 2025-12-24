// Một hàng thông tin vé gồm: Mã đơn, tên phim, ngày giờ chiếu, tổng tiền, nút tương tác (hủy vé)
import { useState } from "react";
import { toast } from "sonner";

interface TicketInfoRowProps {
  orderId: string;
  movieTitle: string;
  showtime: string;
  total: number;
  onCancel: (orderId: string) => Promise<void>;
}

const TicketInfoRow = ({
  orderId,
  movieTitle,
  showtime,
  total,
  onCancel,
}: TicketInfoRowProps) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await onCancel(orderId);
      toast.success("Hủy vé thành công!");
    } catch {
      toast.error("Hủy vé thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-5 items-center py-3 px-2 border-b border-white/20 text-white">
      <div className="font-bold">{orderId}</div>
      <div>{movieTitle}</div>
      <div>{showtime}</div>
      <div className="font-semibold">{total.toLocaleString()} VND</div>
      <div>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-warning text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
        >
          HỦY VÉ
        </button>
      </div>
    </div>
  );
};

export default TicketInfoRow;
