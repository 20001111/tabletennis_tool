import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '卓球用具レビュー',
  description: '初心者から上級者まで、信頼できる卓球用具のレビュー情報を提供します。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <a href="/" className="flex items-center">
                    <span className="text-xl font-bold text-gray-800">卓球用具レビュー</span>
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/equipment" className="text-gray-600 hover:text-gray-900">
                    用具一覧
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
