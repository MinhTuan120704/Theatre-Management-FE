// Một hàng thông tin vé gồm: Mã đơn, tên phim, ngày giờ chiếu, tổng tiền, nút tương tác (hủy vé)
import { useState } from "react";
import { toast } from "sonner";

interface TicketInfoRowProps {
  orderId: string;
  orderIdNumber?: number;
  movieTitle?: string;
  showtime: string;
  total: number;
  status?: string;
  cinemaName?: string;
  roomName?: string;
  seats?: { seatId: number; seatNumber: string }[];
  products?: { productId: number; productName: string; productPrice: string; quantity: number }[];
  paymentMethod?: string | null;
  paidAt?: string | null;
  onCancel: (orderId: string) => Promise<void>;
  onPay?: (orderId: number) => void;
}

const TicketInfoRow = ({
  orderId,
  orderIdNumber,
  movieTitle,
  showtime,
  total,
  status,
  cinemaName,
  roomName,
  seats,
  products,
  paymentMethod,
  paidAt,
  onCancel,
  onPay,
}: TicketInfoRowProps) => {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  const handlePay = () => {
    if (onPay && orderIdNumber) onPay(orderIdNumber);
  };

  const toggleDetails = () => setShowDetails((s) => !s);

  return (
    <>
      <div className="grid grid-cols-5 items-center py-3 px-2 border-b border-white/20 text-white">
        <div className="font-bold">{orderId}</div>
        <div>{movieTitle || "—"}</div>
        <div>{showtime || "—"}</div>
        <div className="font-semibold">{(typeof total === 'number' ? total : Number(total)).toLocaleString()} VND</div>
        <div className="flex gap-2">
          <button
            onClick={toggleDetails}
            className="bg-white/10 text-white font-semibold px-3 py-2 rounded-lg hover:bg-white/20 transition"
          >
            CHI TIẾT
          </button>
          {status === "pending" && onPay && orderIdNumber && (
            <button
              onClick={handlePay}
              className="bg-brand-yellow-light text-bg-dark font-bold px-4 py-2 rounded-lg hover:bg-brand-yellow-dark transition"
            >
              THANH TOÁN
            </button>
          )}
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-warning text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
          >
            HỦY VÉ
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="bg-white/5 text-white p-4 -mt-2 mb-2 rounded-md">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Phim</div>
              <div>{movieTitle || "—"}</div>
            </div>
            <div>
              <div className="font-semibold">Rạp</div>
              <div>{cinemaName || "—"}</div>
            </div>
            <div>
              <div className="font-semibold">Rạp/Phòng</div>
              <div>{roomName || "—"}</div>
            </div>
            <div>
              <div className="font-semibold">Ngày chiếu</div>
              <div>{showtime || "—"}</div>
            </div>
            <div>
              <div className="font-semibold">Ghế</div>
              <div>{seats && seats.length > 0 ? seats.map((s) => s.seatNumber).join(", ") : "—"}</div>
            </div>
            <div>
              <div className="font-semibold">Tổng tiền</div>
              <div>{(typeof total === 'number' ? total : Number(total)).toLocaleString()} VND</div>
            </div>
            <div>
              <div className="font-semibold">Sản phẩm</div>
              <div>
                {products && products.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {products.map((p) => (
                      <li key={p.productId}>
                        {p.productName} x{p.quantity} 
                      </li>
                    ))}
                  </ul>
                ) : (
                  "—"
                )}
              </div>
            </div>
            <div>
              <div className="font-semibold">Thanh toán</div>
              <div>{paymentMethod || "—"}</div>
              <div className="text-xs text-white/80">{paidAt ? new Date(paidAt).toLocaleString() : ""}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketInfoRow;
