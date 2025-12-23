// Sau khi đã chọn các thông tin như rạp, phim, suất chiếu, chỗ ngồi, người dùng sẽ được chuyển đến màn hình này để hoàn tất các thông tin còn lại để đặt vé:
// Bên trên sẽ là thanh Progress để người dùng biết mình đã đến bước nào
// Main content bên phải: MovieTicketInfo - Thông tin về vé mà người dùng đang đặt, được lấy từ các trường trước đó
// Main content bên trái - Bước 1 - MovieBookerInfo: Nhập thông tin khách hàng
// Main content bên trái - Bước 2 - PaymentInfo : Người dùng chọn phương thức thanh toán phù hợp và chuyển đến cổng thanh toán.

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ProgressStepper from "./components/ProgressStepper";
import MovieTicketInfo from "./components/MovieTicketInfo";
import MovieBookerInfo, { type BookerInfo } from "./components/MovieBookerInfo";
import PaymentInfo from "./components/PaymentInfo";
import BookingOverview from "./components/BookingOverview";
import type { ShowtimeWithRoomInfo, Product, User } from "../../types";

interface SelectedSeat {
  id: number;
  seatNumber: string;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface BookingData {
  movieTitle: string;
  movieId: number;
  showtimeId: number;
  showtimeData?: ShowtimeWithRoomInfo;
  selectedSeats: SelectedSeat[];
  selectedProducts: SelectedProduct[];
  totalAmount: number;
}

const Booking = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookerInfo, setBookerInfo] = useState<BookerInfo | null>(null);

  // TODO: Get current user from auth context when implemented
  const currentUser: User | null = null;

  // Get booking data from navigation state
  const bookingData = location.state as BookingData | null;

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData) {
      alert("Không tìm thấy thông tin đặt vé. Vui lòng chọn lại.");
      navigate("/");
    }
  }, [bookingData, navigate]);

  // Extract data from bookingData or use defaults
  const movieTitle = bookingData?.movieTitle || "";
  const showtimeData = bookingData?.showtimeData || null;
  const selectedSeats = bookingData?.selectedSeats || [];
  const selectedProducts = bookingData?.selectedProducts || [];
  const totalAmount = bookingData?.totalAmount || 0;

  // Return the total amount passed from previous page
  const calculateTotal = () => totalAmount;

  const handleBookerInfoSubmit = (data: BookerInfo) => {
    setBookerInfo(data);
    setCurrentStep(2);
  };

  const handlePaymentBack = () => {
    setCurrentStep(1);
  };

  const handlePayment = async (
    paymentMethod: string,
    discountCode?: string
  ) => {
    try {
      // TODO: Implement actual payment processing
      console.log("Processing payment:", {
        bookerInfo,
        paymentMethod,
        discountCode,
        showtimeId,
        selectedSeats,
        selectedProducts,
        totalAmount: calculateTotal(),
      });

      toast.success("Thanh toán thành công! Vé đã được đặt.");
      setCurrentStep(3);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra trong quá trình thanh toán");
    }
  };

  return (
    <div className="bg-gradient-to-b from-bg-dark to-bg-light min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white mb-8">TRANG THANH TOÁN</h1>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className={currentStep === 3 ? "lg:col-span-3" : "lg:col-span-2"}>
            {currentStep === 1 && (
              <MovieBookerInfo
                onContinue={handleBookerInfoSubmit}
                currentUser={currentUser}
                initialData={bookerInfo}
              />
            )}
            {currentStep === 2 && (
              <PaymentInfo
                onBack={handlePaymentBack}
                onPayment={handlePayment}
              />
            )}
            {currentStep === 3 && bookingData && bookerInfo && (
              <BookingOverview
                movieTitle={movieTitle || "Đang tải thông tin phim..."}
                cinema={
                  showtimeData?.room.cinema.name || "Đang tải thông tin rạp..."
                }
                room={showtimeData?.room.name || "N/A"}
                showtime={
                  showtimeData
                    ? new Date(showtimeData.showTime).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Đang tải thông tin suất chiếu..."
                }
                seats={selectedSeats}
                products={selectedProducts}
                totalAmount={calculateTotal()}
                bookerInfo={bookerInfo}
              />
            )}
          </div>

          {/* Right Side - Ticket Info */}
          <div className="lg:col-span-1">
            {currentStep !== 3 && bookingData && (
              <MovieTicketInfo
                movieTitle={movieTitle || "Đang tải thông tin phim..."}
                cinema={
                  showtimeData?.room.cinema.name || "Đang tải thông tin rạp..."
                }
                room={showtimeData?.room.name || "N/A"}
                showtime={
                  showtimeData
                    ? new Date(showtimeData.showTime).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Đang tải thông tin suất chiếu..."
                }
                seats={selectedSeats}
                products={selectedProducts}
                totalAmount={calculateTotal()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
