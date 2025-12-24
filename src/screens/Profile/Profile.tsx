// Gồm profile Sidebar bên tay trái
// Khu vực chính:
// "Thông tin người dùng" : Nửa trên là UserInfo, nửa dưới là ChangePassword
// "Lịch sử mua vé": BookingHistoryGrid
import { useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import UserInfo from "./components/UserInfo/UserInfo";
import ChangePassword from "./components/UserInfo/ChangePassword";
import BookingHistoryGrid from "./components/BookingHistory/BookingHistoryGrid";

// Dummy service functions (replace with real service calls)
const fetchTickets = async () => [
  {
    orderId: "AYCWFGD",
    movieTitle: "Quái thú vô hình",
    showtime: "8:00 22/11/2025",
    total: 180000,
  },
  {
    orderId: "DGWHBAQ",
    movieTitle: "Cục vàng của ngoại",
    showtime: "20:00 25/11/2025",
    total: 205000,
  },
];
const cancelTicket = async () => {
  // TODO: Call cancel ticket service
  return Promise.resolve();
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
