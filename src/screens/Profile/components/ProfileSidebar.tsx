// để chuyển đổi giữa "Thông tin khách hàng" và "Lịch sử mua vé"; ngoài ra có 1 nút "Đăng xuất" ở cuối sidebar
// import { useState } from "react";
import { LogOut, User, Clock } from "lucide-react";
import { useAuth } from "../../../contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProfileSidebarProps {
  activeTab: "info" | "history";
  onTabChange: (tab: "info" | "history") => void;
}

const ProfileSidebar = ({ activeTab, onTabChange }: ProfileSidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Đăng xuất thành công!");
    navigate("/auth");
  };

  return (
    <div className="flex flex-col h-full min-h-[300px] w-64 bg-gradient-to-br from-brand-purple-1 to-brand-purple-2 rounded-xl p-6 text-white">
      <div className="flex-1">
        <button
          className={`flex items-center gap-2 w-full py-3 px-4 rounded-lg mb-2 transition font-semibold text-left ${
            activeTab === "info"
              ? "bg-white/20 text-white"
              : "hover:bg-white/10 text-white/80"
          }`}
          onClick={() => onTabChange("info")}
        >
          <User size={20} />
          Thông tin khách hàng
        </button>
        <button
          className={`flex items-center gap-2 w-full py-3 px-4 rounded-lg mb-2 transition font-semibold text-left ${
            activeTab === "history"
              ? "bg-white/20 text-white"
              : "hover:bg-white/10 text-white/80"
          }`}
          onClick={() => onTabChange("history")}
        >
          <Clock size={20} />
          Lịch sử mua hàng
        </button>
      </div>
      <button
        className="flex items-center gap-2 w-full py-3 px-4 rounded-lg mt-4 bg-white/10 hover:bg-white/20 text-white font-semibold transition"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        Đăng xuất
      </button>
    </div>
  );
};

export default ProfileSidebar;
