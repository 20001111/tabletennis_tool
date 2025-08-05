"use client";
import { useState } from 'react';
import Link from 'next/link';
import equipmentData from '@/data/equipment.json';
import { StarRating } from '@/components/ui/StarRating';

export default function Home() {
  const [query, setQuery] = useState('');

  const filtered = equipmentData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">卓球用具一覧</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="用具名やメーカーで検索"
          className="w-full max-w-md border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Link key={item.id} href={`/equipment/${item.id}`} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.manufacturer}</p>
              <p className="text-lg font-bold text-blue-600 mb-2">¥{item.price.toLocaleString()}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={item.avgRating} />
                <span className="ml-2 text-gray-600">({item.avgRating})</span>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                {item.type === 'RUBBER'
                  ? 'ラバー'
                  : item.type === 'BLADE'
                  ? 'ラケット'
                  : item.type === 'BALL'
                  ? 'ボール'
                  : item.type}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
