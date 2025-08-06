'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { StarRating } from '@/components/ui/StarRating';
import Image from 'next/image';
import React from 'react';

type Category = {
  name: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
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

export default function EquipmentDetail() {
  const params = useParams();
  const id = params.id as string;
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const response = await fetch(`/api/equipment/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch equipment');
        }
        const data = await response.json();
        setEquipment(data);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('商品情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEquipment();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">エラー</h1>
          <p className="text-gray-600">{error || '商品が見つかりません'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                      <StarRating rating={equipment.avgRating} />
                      <span className="ml-2">({equipment.avgRating.toFixed(1)})</span>
                    </dd>
                  </dl>
                </div>

                {equipment.categories.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">カテゴリー</h2>
                    <div className="flex flex-wrap gap-2">
                      {equipment.categories.map((category: Category) => (
                        <span key={category.name} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {equipment.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">製品説明</h2>
                <p className="text-gray-600 whitespace-pre-line">{equipment.description}</p>
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

            <div>
              <h2 className="text-xl font-semibold mb-4">レビュー</h2>
              {equipment.reviews.length > 0 ? (
                <div className="space-y-6">
                  {equipment.reviews.map((review: Review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      {review.comment && <p className="text-gray-600">{review.comment}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">まだレビューがありません。</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
