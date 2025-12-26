// Sau khi đã chọn các thông tin như rạp, phim, suất chiếu, chỗ ngồi, người dùng sẽ được chuyển đến màn hình này để hoàn tất các thông tin còn lại để đặt vé:
// Bên trên sẽ là thanh Progress để người dùng biết mình đã đến bước nào
// Main content bên phải: MovieTicketInfo - Thông tin về vé mà người dùng đang đặt, được lấy từ các trường trước đó
// Main content bên trái - Bước 1 - MovieBookerInfo: Nhập thông tin khách hàng
// Main content bên trái - Bước 2 - PaymentInfo : Người dùng chọn phương thức thanh toán phù hợp và chuyển đến cổng thanh toán.

import { useState, useEffect } from "react";
import OrderService from "../../services/order.service";
import PaymentService from "../../services/payment.service";
import type { OrderCreateDto, OrderResponseDto } from "../../types";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ProgressStepper from "./components/ProgressStepper";
import MovieTicketInfo from "./components/MovieTicketInfo";
import MovieBookerInfo, { type BookerInfo } from "./components/MovieBookerInfo";
import PaymentInfo from "./components/PaymentInfo";
import BookingOverview from "./components/BookingOverview";
import type { ShowtimeWithRoomInfo, Product } from "../../types";
import { useAuth } from "../../contexts";

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
  // const { showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookerInfo, setBookerInfo] = useState<BookerInfo | null>(null);
  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);

  // Lấy user từ context
  const { user: currentUser, isAuthenticated } = useAuth();

  // Get booking data from navigation state
  type LocationState = BookingData | { orderId: number } | null | undefined;
  const state = location.state as LocationState;
  const bookingData =
    state && "movieTitle" in (state as BookingData)
      ? (state as BookingData)
      : null;
  const resumeOrderId =
    state && "orderId" in (state as { orderId: number })
      ? (state as { orderId: number }).orderId
      : undefined;

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData) {
      toast.error("Không tìm thấy thông tin đặt vé. Vui lòng chọn lại.");
      navigate("/");
    }
  }, [bookingData, navigate]);

  // If user navigated to resume an existing order, fetch it
  useEffect(() => {
    const fetchOrder = async (id: number) => {
      try {
        const o = await OrderService.getById(id);
        setOrder(o);
        setCurrentStep(2);
      } catch {
        toast.error("Không thể tải đơn hàng. Vui lòng thử lại.");
      }
    };
    if (resumeOrderId) fetchOrder(resumeOrderId);
  }, [resumeOrderId]);

  // Countdown for payment (15 minutes)
  useEffect(() => {
    if (!order) {
      setTimeLeftSeconds(null);
      return;
    }
    const start = order.orderedAt
      ? new Date(order.orderedAt).getTime()
      : Date.now();
    const expireAt = start + 15 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, Math.floor((expireAt - Date.now()) / 1000));
      setTimeLeftSeconds(diff);
      if (diff <= 0) {
        // expire order
        (async () => {
          try {
            await OrderService.update(order.id, { status: "cancelled" });
            const refreshed = await OrderService.getById(order.id);
            setOrder(refreshed);
            toast.error("Đơn hàng đã hết hạn do quá thời gian giữ vé.");
            setCurrentStep(1);
          } catch (e) {
            console.error(e);
          }
        })();
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [order]);

  // Extract data from bookingData or use defaults
  const movieTitle = bookingData?.movieTitle || "";
  const showtimeData = bookingData?.showtimeData || null;
  const selectedSeats = bookingData?.selectedSeats || [];
  const selectedProducts = bookingData?.selectedProducts || [];
  const totalAmount = bookingData?.totalAmount || 0;

  // Return the total amount passed from previous page
  const calculateTotal = () => totalAmount;

  const handleBookerInfoSubmit = async (data: BookerInfo) => {
    setBookerInfo(data);
    // Tạo order ở đây
    if (!bookingData) return;
    setLoadingOrder(true);
    try {
      // Nếu đã đăng nhập thì dùng userId, nếu không thì để userId = 0 hoặc null (tùy backend)
      const userId = currentUser?.id ?? 0;
      const orderCreate: OrderCreateDto = {
        userId,
        totalPrice: bookingData.totalAmount,
        paymentMethod: "credit_card", // default, sẽ update sau khi chọn phương thức thanh toán
        status: "pending",
        orderedAt: new Date(),
        tickets: bookingData.selectedSeats.map((seat) => ({
          showtimeId: bookingData.showtimeId,
          seatId: seat.id,
        })),
        products:
          Array.isArray(bookingData.selectedProducts) &&
          bookingData.selectedProducts.length > 0
            ? bookingData.selectedProducts.map((item) => ({
                productId: item.product?.id ?? 0,
                quantity: item.quantity,
              }))
            : [],
      };
      const createdOrder = await OrderService.create(orderCreate);
      setOrder(createdOrder);
      setCurrentStep(2);
    } catch {
      toast.error("Không thể tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const handlePaymentBack = () => {
    setCurrentStep(1);
  };

  // Handle payment action from PaymentInfo
  const handlePayment = async (
    paymentMethod: "momo" | "domestic" | "international"
  ) => {
    if (!order) return toast.error("Không tìm thấy đơn hàng để thanh toán.");
    try {
      const map: Record<string, "credit_card" | "paypal" | "cash"> = {
        momo: "paypal",
        domestic: "credit_card",
        international: "credit_card",
      };
      const pm = map[paymentMethod] || "credit_card";
      const payResp = await PaymentService.processPayment(order.id, {
        paymentMethod: pm,
        isSuccess: true,
      });
      if (payResp?.success) {
        toast.success("Thanh toán thành công! Vé đã được đặt.");
        // Backend already updated order status, fetch the latest order
        const refreshed = await OrderService.getById(order.id);
        setOrder(refreshed);
        setCurrentStep(3);
      } else {
        toast.error(
          payResp?.message || "Thanh toán thất bại. Vui lòng thử lại."
        );
      }
    } catch (e) {
      console.error(e);
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
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
          <div
            className={currentStep === 3 ? "lg:col-span-3" : "lg:col-span-2"}
          >
            {currentStep === 1 && (
              <MovieBookerInfo
                onContinue={handleBookerInfoSubmit}
                currentUser={
                  isAuthenticated && currentUser ? currentUser : undefined
                }
                initialData={bookerInfo}
              />
            )}
            {loadingOrder && (
              <div className="text-white text-center py-8">
                Đang tạo đơn hàng...
              </div>
            )}
            {currentStep === 2 && order && (
              <div>
                <div className="mb-4 text-white">
                  <p>
                    Đơn hàng: <span className="font-bold">#{order.id}</span>
                  </p>
                  <p>
                    Trạng thái:{" "}
                    <span className="font-semibold">{order.status}</span>
                  </p>
                  {timeLeftSeconds !== null && timeLeftSeconds > 0 && (
                    <p>
                      Thời gian giữ vé:{" "}
                      <span className="font-bold">{`${Math.floor(
                        timeLeftSeconds / 60
                      )
                        .toString()
                        .padStart(2, "0")}:${(timeLeftSeconds % 60)
                        .toString()
                        .padStart(2, "0")}`}</span>
                    </p>
                  )}
                </div>
                <PaymentInfo
                  onBack={handlePaymentBack}
                  onPayment={handlePayment}
                />
              </div>
            )}
            {currentStep === 3 && bookingData && bookerInfo && order && (
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
                // Có thể truyền thêm orderId nếu cần
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
