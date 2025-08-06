'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => void;
};

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('ログインが必要です');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarMouseEnter = (value: number) => {
    setHover(value);
  };

  const handleStarMouseLeave = () => {
    setHover(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={`text-2xl ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarMouseEnter(star)}
            onMouseLeave={handleStarMouseLeave}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="コメントを入力"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        レビュー投稿
      </button>
    </form>
  );
}
