// Phần nhập thông tin người dùng gồm: Họ và tên, Số điện thoại, Email và nút tiếp tục
// Nếu người dùng đã đăng nhập, hãy lấy thông tin người dùng đó và nhập sẵn giúp họ
// Khi ấn nút tiếp tục, trước khi chuyển sang bước 2, hãy validate nội dung

import { useState } from "react";
import type { UserPublic } from "../../../types";

interface MovieBookerInfoProps {
  onContinue: (data: BookerInfo) => void;
  // Accept client-safe user type
  currentUser?: UserPublic | null | undefined;
  initialData?: BookerInfo | null;
}

export interface BookerInfo {
  fullName: string;
  phone: string;
  email: string;
}

const MovieBookerInfo = ({
  onContinue,
  currentUser,
  initialData,
}: MovieBookerInfoProps) => {
  // Pre-fill form with: 1) initialData (from previous step) 2) currentUser data 3) empty
  const [formData, setFormData] = useState<BookerInfo>({
    fullName: initialData?.fullName || currentUser?.fullName || "",
    phone: initialData?.phone || currentUser?.phone || "",
    email: initialData?.email || currentUser?.email || "",
  });

  const [errors, setErrors] = useState<Partial<BookerInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BookerInfo> = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
    }

    // Validate phone
    const phoneRegex = /^(0|\+84)(\d{9,10})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onContinue(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof BookerInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="rounded-xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">
        THÔNG TIN KHÁCH HÀNG
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Họ và tên <span className="text-warning">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className={`w-full px-4 py-3 bg-white/10 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.fullName
                ? "border-warning focus:ring-warning"
                : "border-white/20 focus:ring-brand-yellow-light"
            }`}
          />
          {errors.fullName && (
            <p className="text-warning text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Số điện thoại <span className="text-warning">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0912345678"
            className={`w-full px-4 py-3 bg-white/10 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.phone
                ? "border-warning focus:ring-warning"
                : "border-white/20 focus:ring-brand-yellow-light"
            }`}
          />
          {errors.phone && (
            <p className="text-warning text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Email <span className="text-warning">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full px-4 py-3 bg-white/10 border text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? "border-warning focus:ring-warning"
                : "border-white/20 focus:ring-brand-yellow-light"
            }`}
          />
          {errors.email && (
            <p className="text-warning text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-brand-yellow-light hover:bg-brand-yellow-dark text-bg-dark font-bold py-4 rounded-lg transition-colors text-lg"
        >
          TIẾP TỤC
        </button>
      </form>
    </div>
  );
};

export default MovieBookerInfo;
