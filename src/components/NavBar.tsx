'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { LoginModal } from './LoginModal';

export function NavBar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            卓球用具レビュー
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/equipment" className="text-gray-600 hover:text-gray-900">
              用具一覧
            </Link>
            {user ? (
              <>
                <span className="text-gray-600">こんにちは、{user}さん</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                ログイン
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/equipment"
              className="block text-gray-600 hover:text-gray-900"
            >
              用具一覧
            </Link>
            {user ? (
              <>
                <span className="block text-gray-600">こんにちは、{user}さん</span>
                <button
                  onClick={logout}
                  className="block text-gray-600 hover:text-gray-900"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block text-gray-600 hover:text-gray-900"
              >
                ログイン
              </button>
            )}
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}
