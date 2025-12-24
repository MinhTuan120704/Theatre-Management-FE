// Giao diện đăng ký gồm: nút tabs để chuyển sang mục đăng nhập, các trường nhập liệu như Họ và tên, số điện thoại, email, mật khẩu, xác nhận mật khẩu; nút đăng ký
// Khi nhấn nút đăng ký, hãy validate nôi dung các trường trước khi request api

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../../contexts";
import type { AuthRegisterDto } from "../../../types";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "", // Required
    identifyCode: "", // Required
  });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    dob?: string;
    identifyCode?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    // Validate dob
    if (!formData.dob) {
      newErrors.dob = "Vui lòng nhập ngày sinh";
    }

    // Validate identifyCode
    if (!formData.identifyCode) {
      newErrors.identifyCode = "Vui lòng nhập mã định danh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) {
      return;
    }
    try {
      // Map form fields to API, all required fields are validated and non-empty
      const payload: AuthRegisterDto = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        identifyCode: formData.identifyCode,
        role: "customer",
      };
      await register(payload);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/auth?tab=login");
    } catch (error: unknown) {
      let msg = "Đăng ký thất bại. Vui lòng thử lại.";
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      ) {
        msg = (error as { message: string }).message;
      }
      setSubmitError(msg);
      toast.error(msg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitError(null);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name Input */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Họ và tên"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Số điện thoại"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
              placeholder="Mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Xác thực mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
              placeholder="Xác thực mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Date of Birth Input */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium mb-2">
            Ngày sinh <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ngày sinh"
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
          )}
        </div>

        {/* Identify Code Input */}
        <div>
          <label
            htmlFor="identifyCode"
            className="block text-sm font-medium mb-2"
          >
            Mã định danh <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="identifyCode"
            name="identifyCode"
            value={formData.identifyCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Mã định danh"
          />
          {errors.identifyCode && (
            <p className="mt-1 text-sm text-red-500">{errors.identifyCode}</p>
          )}
        </div>

        {/* Submit Button */}
        {submitError && (
          <p className="text-sm text-red-500 text-center">{submitError}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-brand-yellow-dark text-black font-bold rounded-lg hover:bg-brand-yellow-light transition uppercase"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
