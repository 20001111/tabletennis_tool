'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { StarRating } from '@/components/ui/StarRating';
import ReviewForm, { Review } from '@/components/equipment/ReviewForm';
import React from 'react';
import { StarRating } from '@/components/ui/StarRating';
import { ReviewForm } from '@/components/ReviewForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type Category = {
  name: string;
};

type Equipment = {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string | null;
  avgRating: number;
  specs: Record<string, unknown>;
  categories: Category[];
  reviews: Review[];
};

type SortBy = 'newest' | 'oldest' | 'high' | 'low';

export default function EquipmentDetail() {
  const params = useParams();
  const id = params.id as string;
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchEquipment() {
      try {
        const response = await fetch(`/api/equipment/${id}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        const stored = localStorage.getItem(`reviews-${id}`);
        if (stored) {
          const storedReviews: Review[] = JSON.parse(stored);
          data.reviews = [...data.reviews, ...storedReviews];
          data.avgRating =
            data.reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
            data.reviews.length;
        }
        setEquipment(data);
      } catch {
        setError('商品情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEquipment();
  }, [id]);


    );
  };

  if (loading) {
    return <LoadingSpinner message="読み込み中..." />;
  }

  if (error || !equipment) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || '商品が見つかりません'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{equipment.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {equipment.imageUrl && (
              <div className="relative h-80">
                <Image
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  fill
                  className="object-contain"

                  priority
                />
              </div>
            )}

            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">基本情報</h2>
                <dl className="grid grid-cols-[120px_1fr] gap-2">
                  <dt className="text-gray-600">メーカー</dt>
                  <dd>{equipment.manufacturer}</dd>
                  <dt className="text-gray-600">タイプ</dt>
                  <dd>{equipment.type}</dd>
                  <dt className="text-gray-600">価格</dt>
                  <dd>¥{equipment.price.toLocaleString()}</dd>
                  <dt className="text-gray-600">平均評価</dt>
                  <dd className="flex items-center">

              {equipment.categories.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">カテゴリー</h2>
                  <div className="flex flex-wrap gap-2">

                        {category.name}
                      </span>
                    ))}
                  </div>

          </div>

          {equipment.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">製品説明</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {equipment.description}
              </p>
            </div>
          )}

          {equipment.specs && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">スペック</h2>
              <dl className="grid grid-cols-[200px_1fr] gap-2">
                {Object.entries(equipment.specs).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt className="text-gray-600">{key}</dt>
                    <dd>{String(value)}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">レビュー</h2>
            {equipment.reviews.length > 0 ? (
              <div className="space-y-6 mb-6">
                {equipment.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <StarRating rating={review.rating} />
                      <span className="ml-2 text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-6">まだレビューがありません。</p>
            )}
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

