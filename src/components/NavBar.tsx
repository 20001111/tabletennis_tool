'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">卓球用具レビュー</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/equipment" className="text-gray-600 hover:text-gray-900">
              用具一覧
            </Link>
            {user && <span className="text-gray-600">こんにちは、{user}さん</span>}
          </div>
        </div>
      </div>
    </nav>
  );
}

