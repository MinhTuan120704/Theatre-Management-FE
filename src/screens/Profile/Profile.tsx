// Gồm profile Sidebar bên tay trái
// Khu vực chính:
// "Thông tin người dùng" : Nửa trên là UserInfo, nửa dưới là ChangePassword
// "Lịch sử mua vé": BookingHistoryGrid
import { useState, useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import UserInfo from "./components/UserInfo/UserInfo";
import ChangePassword from "./components/UserInfo/ChangePassword";
import BookingHistoryGrid from "./components/BookingHistory/BookingHistoryGrid";
import { useAuth } from "../../contexts";
import OrderService from "../../services/order.service";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

  type Ticket = {
    orderId: string;
    orderIdNumber: number;
    movieTitle: string;
    showtime: string;
    total: number;
    status: string;
  };

  const fetchTickets = async (): Promise<Ticket[]> => {
    if (!user) return [];
    try {
      const orders = await OrderService.getByUserId(user.id);
      return orders.map((o) => ({
        orderId: `#${o.id}`,
        orderIdNumber: o.id,
        movieTitle: "",
        showtime: new Date(o.orderedAt).toLocaleString(),
        total: o.totalPrice,
        status: o.status,
      }));
    } catch {
      return [];
    }
  };

  useEffect(() => {
    // nothing to do here for now; fetchTickets uses current `user` when invoked
  }, [user]);

  const cancelTicket = async (orderId: string) => {
    // convert '#id' to number
    const id = Number(orderId.replace(/^#/, ""));
    if (!id) return Promise.reject();
    await OrderService.update(id, { status: "cancelled" });
    return Promise.resolve();
  };

  const handlePay = (orderId: number) => {
    // navigate to booking page to resume payment
    navigate("/booking", { state: { orderId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Thông tin tài khoản
        </h1>
        <div className="flex gap-8 items-start">
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1">
            {activeTab === "info" ? (
              <>
                <UserInfo />
                <ChangePassword />
              </>
            ) : (
              <BookingHistoryGrid
                fetchTickets={fetchTickets}
                onCancel={cancelTicket}
                onPay={handlePay}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
