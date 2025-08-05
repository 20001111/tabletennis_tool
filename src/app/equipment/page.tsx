'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Equipment = {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  avgRating: number;
  imageUrl?: string;
  categories: { name: string }[];
};

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const url = selectedType 
          ? `/api/equipment?type=${selectedType}`
          : '/api/equipment';
        const response = await fetch(url);
        const data = await response.json();
        setEquipment(data);
        setLoading(false);
      } catch {
        setError('データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [selectedType]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">用具一覧</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          用具タイプで絞り込み
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">すべて</option>
          <option value="RUBBER">ラバー</option>
          <option value="BLADE">ラケット</option>
          <option value="BALL">ボール</option>
          <option value="TABLE">卓球台</option>
          <option value="ACCESSORIES">アクセサリー</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.imageUrl && (
              <div className="relative h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">メーカー: {item.manufacturer}</p>
              <p className="text-gray-600 mb-2">価格: ¥{item.price.toLocaleString()}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{item.avgRating.toFixed(1)}</span>
              </div>
              {item.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.categories.map((category) => (
                    <span
                      key={category.name}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href={`/equipment/${item.id}`}
                className="text-blue-600 hover:underline"
              >
                詳細を見る →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
