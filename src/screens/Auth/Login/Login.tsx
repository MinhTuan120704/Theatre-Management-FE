// Giao diện đăng nhập gồm: Nút tabs để có thể chuyển sang phần đăng ký, Một trường cho phép nhập Tài khoản, email hoặc số điện thoại; một trường cho phép nhập mật khẩu (có nút toggle visibility), một nút lưu mật khẩu khi đăng nhập, một link để chuyển sang phần forgotpassword, nút đăng nhập.
// Khi ấn nút đăng nhập, hãy validate các trường trước khi gửi request api

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login = ({ onSwitchToRegister: _onSwitchToRegister }: LoginProps) => {
  const [formData, setFormData] = useState({
    account: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ account?: string; password?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { account?: string; password?: string } = {};

    if (!formData.account.trim()) {
      newErrors.account = "Vui lòng nhập tài khoản, email hoặc số điện thoại";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Call login API
      console.log("Login data:", formData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Account Input */}
        <div>
          <label htmlFor="account" className="block text-sm font-medium mb-2">
            Tài khoản, Email hoặc số điện thoại{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="account"
            name="account"
            value={formData.account}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Nhập tài khoản, email hoặc số điện thoại"
          />
          {errors.account && (
            <p className="mt-1 text-sm text-red-500">{errors.account}</p>
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
              placeholder="Nhập mật khẩu"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm">Lưu mật khẩu khi đăng nhập</span>
          </label>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-brand-yellow-dark text-black font-bold rounded-lg hover:bg-brand-yellow-light transition uppercase"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
