'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdvancedSearch, SearchFilters } from '@/components/AdvancedSearch';
import { StarRating } from '@/components/ui/StarRating';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    manufacturer: '',
    minPrice: 0,
    maxPrice: 0,
    minRating: 0,
    category: '',
  });
  const [sortBy, setSortBy] = useState('rating');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch('/api/equipment');
        const data = await response.json();
        setEquipment(data);
      } catch {
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const manufacturers = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.manufacturer))),
    [equipment]
  );
  const categories = useMemo(
    () =>
      Array.from(new Set(equipment.flatMap((e) => e.categories.map((c) => c.name)))),
    [equipment]
  );

  const filtered = useMemo(() => {
    const result = equipment.filter((item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(filters.query.toLowerCase());
      const matchesType = filters.type ? item.type === filters.type : true;
      const matchesManufacturer = filters.manufacturer
        ? item.manufacturer === filters.manufacturer
        : true;
      const matchesCategory = filters.category
        ? item.categories.some((c) => c.name === filters.category)
        : true;
      const matchesMinPrice = filters.minPrice ? item.price >= filters.minPrice : true;
      const matchesMaxPrice = filters.maxPrice ? item.price <= filters.maxPrice : true;
      const matchesMinRating = filters.minRating
        ? item.avgRating >= filters.minRating
        : true;
      return (
        matchesQuery &&
        matchesType &&
        matchesManufacturer &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinRating
      );
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.avgRating - a.avgRating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [equipment, filters, sortBy]);

  if (loading) return <LoadingSpinner message="読み込み中..." />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">用具一覧</h1>

      <AdvancedSearch
        onChange={setFilters}
        manufacturers={manufacturers}
        categories={categories}
      />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label>表示形式:</label>
          <button
            onClick={() => setView('grid')}
            className={`px-2 ${view === 'grid' ? 'font-bold' : ''}`}
          >
            グリッド
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-2 ${view === 'list' ? 'font-bold' : ''}`}
          >
            リスト
          </button>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="rating">評価が高い順</option>
          <option value="price-asc">価格が安い順</option>
          <option value="price-desc">価格が高い順</option>
          <option value="name">名前順</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">該当する用具がありません。</p>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow overflow-hidden"
            >
              {item.imageUrl && (
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-gray-600 mb-1">{item.manufacturer}</p>
                <p className="text-gray-600 mb-1">
                  ¥{item.price.toLocaleString()}
                </p>
                <div className="flex items-center">
                  <StarRating rating={item.avgRating} />
                  <span className="ml-2">{item.avgRating.toFixed(1)}</span>
                </div>
                {item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.categories.map((category) => (
                      <span
                        key={category.name}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/equipment/${item.id}`}
                  className="block mt-4 text-blue-600 hover:underline"
                >
                  詳細を見る →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="flex bg-white rounded shadow overflow-hidden">
              {item.imageUrl && (
                <div className="relative h-32 w-32 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              )}
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-1">{item.manufacturer}</p>
                <p className="text-gray-600 mb-1">
                  ¥{item.price.toLocaleString()}
                </p>
                <div className="flex items-center">
                  <StarRating rating={item.avgRating} />
                  <span className="ml-2">{item.avgRating.toFixed(1)}</span>
                </div>
                <Link
                  href={`/equipment/${item.id}`}
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                  詳細を見る →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
