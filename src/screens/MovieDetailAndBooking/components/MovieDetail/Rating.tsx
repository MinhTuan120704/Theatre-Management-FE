// gồm nút đánh giá, nút bình luận

import { useState } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  onSubmit: (rating: number, comment: string) => void;
}

const Rating = ({ onSubmit }: RatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 mb-8">
      {/* Rating Stars */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Đánh giá</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={
                  star <= (hoverRating || rating)
                    ? "fill-brand-yellow-dark text-brand-yellow-dark"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">
          Nhập đánh giá của bạn
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bình luận"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow-dark resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className="w-full px-6 py-3 bg-brand-yellow-dark text-black font-bold rounded-md hover:bg-brand-yellow-light transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Bình luận
      </button>
    </div>
  );
};

export default Rating;
