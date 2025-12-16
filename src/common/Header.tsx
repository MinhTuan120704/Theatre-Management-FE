// Header bao gồm:
// Nút chọn rạp: sau khi chọn thì đây sẽ là rạp mặc định cho tất cả các option ở các screen khác
// Nút lịch chiếu: sau khi đã chọn rạp default thì sẽ cho phép xem lịch chiếu của các phim có trong rạp hiện tại
// link chuyển sang các trang: khuyến mãi, tổ chức sự kiện, dịch vụ giải trí khác, giới thiệu.
// Logo rạp
// Nút đặt vé ngay
// Nút đặt bắp nước
// Thanh tìm kiếm (Phim, rạp)
// Nút đăng nhập để chuyển sang trang đăng nhập (nếu đã đăng nhập thì hiển thị tên người dùng và có thể chuyển sang trang người dùng)
// Chọn ngôn ngữ

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Search,
  User,
  Globe,
  Film,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [selectedTheater] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [language] = useState("VN");
  const [isLoggedIn] = useState(false); // TODO: Get from auth context
  const [userName] = useState(""); // TODO: Get from auth context
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-3 border-b border-white/10">
          {/* Left Section - Theater & Schedule */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm">
              <MapPin size={18} />
              <span className="hidden lg:inline">
                {selectedTheater || "Chọn rạp"}
              </span>
            </button>

            <button
              className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
              disabled={!selectedTheater}
            >
              <Calendar size={18} />
              <span className="hidden lg:inline">Lịch chiếu</span>
            </button>
          </div>

          {/* Right Section - Language & Login */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
              <Globe size={18} />
              <span className="text-sm font-semibold">{language}</span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                <User size={18} />
                <span className="hidden lg:inline text-sm">
                  {userName || "Tài khoản"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                <User size={18} />
                <span className="hidden lg:inline text-sm">Đăng nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-yellow-dark rounded-lg flex items-center justify-center">
              <Film className="text-black" size={24} />
            </div>
            <span className="text-xl lg:text-2xl font-bold">CINEMA</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-8">
            <Link
              to="/promotions"
              className="text-sm font-medium hover:text-yellow-400 transition"
            >
              Khuyến mãi
            </Link>
            <Link
              to="/events"
              className="text-sm font-medium hover:text-yellow-400 transition"
            >
              Tổ chức sự kiện
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium hover:text-yellow-400 transition"
            >
              Dịch vụ giải trí khác
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-yellow-400 transition"
            >
              Giới thiệu
            </Link>
          </nav>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3">
            <button className="px-4 lg:px-6 py-2 bg-brand-yellow-dark text-black font-bold rounded-md hover:bg-brand-yellow-light transition uppercase text-xs lg:text-sm whitespace-nowrap">
              ĐẶT VÉ NGAY
            </button>
            <button className="px-4 lg:px-6 py-2 bg-brand-purple-2 text-white font-bold rounded-md hover:bg-brand-purple-1 transition uppercase text-xs lg:text-sm whitespace-nowrap">
              ĐẶT BẮP NƯỚC
            </button>
          </div>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Tìm phim, rạp"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48 xl:w-64 placeholder:text-gray-400"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm phim, rạp"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>

            {/* Mobile Theater & Schedule */}
            <div className="md:hidden flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm">
                <MapPin size={18} />
                <span>{selectedTheater || "Chọn rạp"}</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
                disabled={!selectedTheater}
              >
                <Calendar size={18} />
                <span>Lịch chiếu</span>
              </button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="lg:hidden flex gap-2">
              <button className="flex-1 px-4 py-2.5 bg-brand-yellow-dark text-black font-bold rounded-md hover:bg-brand-yellow-light transition uppercase text-sm">
                ĐẶT VÉ NGAY
              </button>
              <button className="flex-1 px-4 py-2.5 bg-brand-purple-2 text-white font-bold rounded-md hover:bg-brand-purple-1 transition uppercase text-sm">
                ĐẶT BẮP NƯỚC
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="xl:hidden flex flex-col space-y-2">
              <Link
                to="/promotions"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Khuyến mãi
              </Link>
              <Link
                to="/events"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tổ chức sự kiện
              </Link>
              <Link
                to="/services"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dịch vụ giải trí khác
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Giới thiệu
              </Link>
            </nav>

            {/* Mobile Auth & Language */}
            <div className="md:hidden flex gap-2 pt-2 border-t border-white/10">
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Globe size={18} />
                <span className="text-sm font-semibold">{language}</span>
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <User size={18} />
                  <span className="text-sm">{userName || "Tài khoản"}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <User size={18} />
                  <span className="text-sm">Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
