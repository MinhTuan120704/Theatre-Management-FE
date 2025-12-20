// gồm danh sách các đánh giá từ các người dùng: hiển thị tên + đánh giá của người dùng đó

import { Star } from "lucide-react";
import type { ReviewResponseDto } from "../../../../types";

interface CommentProps {
  comments: ReviewResponseDto[];
}

const Comment = ({ comments }: CommentProps) => {
  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        BÌNH LUẬN
      </h2>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-brand-purple-2 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">
                Người dùng #{comment.userId}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < comment.rating
                        ? "fill-brand-yellow-dark text-brand-yellow-dark"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-white text-sm">{comment.comment}</p>
            <p className="text-gray-400 text-xs">
              {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
