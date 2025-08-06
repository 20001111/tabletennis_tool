'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from './AuthProvider';

type ReviewFormProps = {
  equipmentId: string;
  onReviewSubmitted?: () => void;
};

export function ReviewForm({ equipmentId, onReviewSubmitted }: ReviewFormProps) {
  const { user, login } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleLogin = () => {
    const name = prompt('お名前を入力してください');
    if (name) {
      login(name);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const existing = JSON.parse(localStorage.getItem(`reviews_${equipmentId}`) || '[]');
    const review = { user, rating, comment };
    existing.push(review);
    localStorage.setItem(`reviews_${equipmentId}`, JSON.stringify(existing));
    setRating(0);
    setComment('');
    onReviewSubmitted?.();
  };

  if (!user) {
    return (
      <div className="mt-4">
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          ログインしてレビューを書く
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block mb-1">評価</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
          required
        >
          <option value={0} disabled>
            選択してください
          </option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">コメント</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        レビューを送信
      </button>
    </form>
  );
}

