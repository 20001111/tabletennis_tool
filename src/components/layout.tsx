import React from 'react'
import Link from 'next/link'

export function NavBar() {
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
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              カテゴリー
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">卓球用具レビュー</h3>
            <p className="text-gray-300">
              信頼できる用具レビュー情報を集約し、製品選びをサポートします。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <p className="text-gray-300">
              ご質問やご要望がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">© 2025 卓球用具レビュー. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
