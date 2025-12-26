// phần Payment Info gồm: Các nút hình thức thanh toán khác nhau cho người dùng chọn một, nút Quay lại (để trở lại bước trước), nút thanh toán để chuyển sang cổng thanh toán tương ứng

import { useState } from "react";

type PaymentMethodType = "momo" | "domestic" | "international";

interface PaymentInfoProps {
  onBack: () => void;
  onPayment: (paymentMethod: PaymentMethodType, discountCode?: string) => void;
}

const PaymentInfo = ({ onBack, onPayment }: PaymentInfoProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const paymentMethods = [
    {
      id: "momo" as PaymentMethodType,
      name: "Thanh toán qua Momo",
      icon: "💳",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-500",
      textColor: "text-pink-700",
    },
    {
      id: "domestic" as PaymentMethodType,
      name: "Thanh toán qua Thẻ nội địa",
      icon: "🏦",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-500",
      textColor: "text-orange-700",
    },
    {
      id: "international" as PaymentMethodType,
      name: "Thanh toán qua Thẻ quốc tế",
      icon: "🌍",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
      textColor: "text-green-700",
    },
  ];

  const handlePayment = () => {
    if (selectedMethod) {
      onPayment(selectedMethod, discountCode || undefined);
    }
  };

  return (
    <div className="rounded-xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">THANH TOÁN</h2>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
              selectedMethod === method.id
                ? `${method.bgColor} ${method.borderColor} shadow-md`
                : "bg-white/5 border-white/20 hover:border-white/40"
            }`}
          >
            <span className="text-2xl">{method.icon}</span>
            <span
              className={`font-semibold ${
                selectedMethod === method.id ? method.textColor : "text-white"
              }`}
            >
              {method.name}
            </span>
          </button>
        ))}
      </div>

      {/* Discount Code Section */}
      <div className="mb-8">
        {!showDiscountInput ? (
          <button
            onClick={() => setShowDiscountInput(true)}
            className="w-full p-4 bg-blue-500/20 border-2 border-blue-400 rounded-lg text-blue-300 font-semibold hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <span>🎟️</span>
            Chọn hoặc nhập mã Giảm giá
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Nhập mã khuyến mại của bạn"
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow-light"
            />
            {/* Sample discount codes */}
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-sm text-white">
                  CTEN45: 45K phim 2D
                </p>
                <p className="text-xs text-gray-400">Xem phim trước 10h</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-sm text-white">
                  CMEMBER3: 45K phim 2D
                </p>
                <p className="text-xs text-gray-400">
                  Thành viên Cinema vào thứ 3 hàng tuần
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="font-semibold text-sm text-white">
                  CGOLD: 45K phim 2D
                </p>
                <p className="text-xs text-gray-400">Thành viên vàng</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-brand-yellow-light hover:bg-brand-yellow-dark text-bg-dark font-bold py-4 rounded-lg transition-colors"
        >
          QUAY LẠI
        </button>
        <button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className={`flex-1 font-bold py-4 rounded-lg transition-colors ${
            selectedMethod
              ? "bg-brand-yellow-light hover:bg-brand-yellow-dark text-bg-dark"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
