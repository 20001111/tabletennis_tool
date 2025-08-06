'use client';

import { useState } from 'react';

export type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

interface ReviewFormProps {
  equipmentId: string;
  onSubmit?: (review: Review) => void;
}

export default function ReviewForm({ equipmentId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/equipment/${equipmentId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) {
        throw new Error('Failed to submit review');
      }
      const data: Review = await res.json();
      onSubmit?.(data);
      setRating(5);
      setComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">評価</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5,4,3,2,1].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">コメント</label>
        <textarea
          className="w-full border rounded p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={submitting}
      >
        投稿
      </button>
    </form>
  );
}

