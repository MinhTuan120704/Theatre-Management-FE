// Gồm Thông tin cá nhân: Họ và tên, số điện thoại, email
// Có thể thay đổi và lưu thay đổi
import { useState } from "react";
import { useAuth } from "../../../../contexts";
import { toast } from "sonner";

const UserInfo = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Call user update service here
      // await UserService.updateProfile(form);
      if (user) {
        setUser({
          ...user,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
        });
      }
      toast.success("Cập nhật thông tin thành công!");
    } catch {
      setError("Cập nhật thất bại. Vui lòng thử lại.");
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-brand-yellow-dark text-black font-bold px-6 py-2 rounded-lg hover:bg-brand-yellow-light transition disabled:opacity-60"
      >
        {loading ? "Đang lưu..." : "LƯU THÔNG TIN"}
      </button>
    </div>
  );
};

export default UserInfo;
