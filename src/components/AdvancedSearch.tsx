'use client';

import { useState, useEffect } from 'react';

export type SearchFilters = {
  query: string;
  type: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  category: string;
};

type AdvancedSearchProps = {
  onChange: (filters: SearchFilters) => void;
  manufacturers: string[];
  categories: string[];
};

export function AdvancedSearch({ onChange, manufacturers, categories }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    manufacturer: '',
    minPrice: 0,
    maxPrice: 0,
    minRating: 0,
    category: '',
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(filters);
    }, 300);
    return () => clearTimeout(handler);
  }, [filters, onChange]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
      <input
        type="text"
        placeholder="キーワード検索"
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">すべてのタイプ</option>
          <option value="RUBBER">ラバー</option>
          <option value="BLADE">ラケット</option>
          <option value="BALL">ボール</option>
          <option value="TABLE">卓球台</option>
          <option value="ACCESSORIES">アクセサリー</option>
        </select>

        <select
          value={filters.manufacturer}
          onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">メーカー</option>
          {manufacturers.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">カテゴリー</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="最低価格"
          value={filters.minPrice ? filters.minPrice : ''}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="最高価格"
          value={filters.maxPrice ? filters.maxPrice : ''}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="最低評価"
          min={0}
          max={5}
          step={0.1}
          value={filters.minRating ? filters.minRating : ''}
          onChange={(e) =>
            setFilters({ ...filters, minRating: Number(e.target.value) })
          }
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
}
