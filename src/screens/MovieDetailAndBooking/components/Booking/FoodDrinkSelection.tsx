// Gồm các card cho phép chọn bắp nước:
// Mỗi card gồm: bên trái là ảnh của món; bên phải là tên, giá tiền; ớ dưới là nút chọn số lượng

import { Minus, Plus } from "lucide-react";
import type { ProductResponseDto } from "../../../../types";

interface FoodDrinkSelectionProps {
  items: ProductResponseDto[];
  selectedItems: Record<number, number>;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
}

const FoodDrinkSelection = ({
  items,
  selectedItems,
  onUpdateQuantity,
}: FoodDrinkSelectionProps) => {
  const handleIncrement = (itemId: number) => {
    const currentQty = selectedItems[itemId] || 0;
    onUpdateQuantity(itemId, currentQty + 1);
  };

  const handleDecrement = (itemId: number) => {
    const currentQty = selectedItems[itemId] || 0;
    if (currentQty > 0) {
      onUpdateQuantity(itemId, currentQty - 1);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        CHỌN BẮP NƯỚC
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 flex flex-col">
            {/* Image and Info */}
            <div className="flex gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900">
                  {item.price.toLocaleString()} VNĐ
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleDecrement(item.id)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold w-12 text-center">
                {selectedItems[item.id] || 0}
              </span>
              <button
                onClick={() => handleIncrement(item.id)}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDrinkSelection;
