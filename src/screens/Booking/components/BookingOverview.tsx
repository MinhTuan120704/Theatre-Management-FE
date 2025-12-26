// Hiển thị tổng quan thông tin vé và người đặt ở bước 3
import type { BookerInfo } from "./MovieBookerInfo";
import type { Product } from "../../../types";

interface SelectedSeat {
  id: number;
  seatNumber: string;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface BookingOverviewProps {
  movieTitle: string;
  cinema: string;
  room: string;
  showtime: string;
  seats: SelectedSeat[];
  products: SelectedProduct[];
  totalAmount: number;
  bookerInfo: BookerInfo;
}

const BookingOverview = ({
  movieTitle,
  cinema,
  room,
  showtime,
  seats,
  products,
  totalAmount,
  bookerInfo,
}: BookingOverviewProps) => {
  return (
    <div className="bg-bg-light rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-brand-yellow-light text-2xl font-bold mb-2">
          {movieTitle}
        </h2>
      </div>

      {/* Booker Info */}
      <div className="rounded-xl p-6 mb-4 border border-text-white-1">
        <h3 className="text-lg font-bold text-white mb-2">
          Thông tin người đặt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-brand-yellow-dark text-sm">Họ và tên:</span>
            <div className="font-semibold text-white">
              {bookerInfo.fullName}
            </div>
          </div>
          <div>
            <span className="text-brand-yellow-dark text-sm">Số điện thoại:</span>
            <div className="font-semibold text-white">{bookerInfo.phone}</div>
          </div>
          <div>
            <span className="text-brand-yellow-dark text-sm">Email:</span>
            <div className="font-semibold text-white">{bookerInfo.email}</div>
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="rounded-xl p-6 relative border border-text-white-1">
        {/* Reserved time */}
        <div className="bg-brand-yellow-light text-bg-dark px-4 py-2 rounded-lg mb-4 text-center">
          <p className="text-sm font-semibold">
            Thời gian giữ vé: <span className="font-bold text-lg">15:00</span>
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg text-white mb-1">{cinema}</h3>
          <p className="text-sm text-brand-yellow-dark">{cinema}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-brand-yellow-dark">Thời gian</p>
          <p className="font-bold text-white text-lg">{showtime}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-brand-yellow-dark">Phòng chiếu</p>
            <p className="font-bold text-white text-lg">{room}</p>
          </div>
          <div>
            <p className="text-sm text-brand-yellow-dark">Số vé</p>
            <p className="font-bold text-white text-lg">{seats.length}</p>
          </div>
          <div>
            <p className="text-sm text-brand-yellow-dark">Số ghế</p>
            <p className="font-bold text-white text-lg">
              {seats.map((s) => s.seatNumber).join(",")}
            </p>
          </div>
        </div>
        {products.length > 0 && (
          <div className="mb-4 pb-4 border-b border-dashed border-gray-300">
            <p className="text-sm text-white mb-2">Bắp nước</p>
            {products.map((item, index) => (
              <p key={index} className="text-sm text-white">
                {item.quantity} {item.product.name}
              </p>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="text-lg font-bold text-white">SỐ TIỀN CẦN THANH TOÁN</p>
          <p className="text-2xl font-bold text-warning">
            {totalAmount.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
