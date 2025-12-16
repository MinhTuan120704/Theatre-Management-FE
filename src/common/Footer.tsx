// Logo rạp to
// Các link sang các thành phần khác: Đăng nhập, đăng ký, giới thiệu, liên hệ, phim đang chiếu, phim sắp chiếu,...

import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Film,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-purple-3 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-brand-yellow-dark rounded-lg flex items-center justify-center">
                <Film className="text-black" size={36} />
              </div>
              <span className="text-3xl font-bold">CINEMA</span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Hệ thống rạp chiếu phim hiện đại hàng đầu Việt Nam
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tài khoản</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/auth"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/auth"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Lịch sử đặt vé
                </Link>
              </li>
            </ul>
          </div>

          {/* Movies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Phim</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/movies/now-showing"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Phim đang chiếu
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/coming-soon"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Phim sắp chiếu
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-sm text-white/70 hover:text-yellow-400 transition"
                >
                  Sự kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={18} className="flex-shrink-0" />
                <span>1900 xxxx</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={18} className="flex-shrink-0" />
                <span>support@cinema.vn</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                to="/about"
                className="text-sm text-white/70 hover:text-yellow-400 transition"
              >
                Giới thiệu
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-white/70">
            © 2024 CINEMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
