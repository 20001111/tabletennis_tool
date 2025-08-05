import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthContext'
import { NavBar } from '@/components/NavBar'

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
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
