// Gồm: Mật khẩu cũ, mật khẩu mới, xác thực mật khẩu, nút đổi mật khẩu
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleChangePassword = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác thực không khớp.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // TODO: Call change password service here
      // await UserService.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success("Đổi mật khẩu thành công!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Mật khẩu cũ <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Mật khẩu mới <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Xác thực mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="bg-brand-yellow-dark text-black font-bold px-6 py-2 rounded-lg hover:bg-brand-yellow-light transition disabled:opacity-60"
      >
        {loading ? "Đang đổi..." : "ĐỔI MẬT KHẨU"}
      </button>
    </div>
  );
};

export default ChangePassword;
