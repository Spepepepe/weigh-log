import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeighLog - 体重管理アプリ",
  description: "体重と睡眠時間を記録・管理するアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 text-white shadow-lg">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                  WeighLog
                </Link>
                <div className="flex gap-4">
                  <Link
                    href="/input"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition"
                  >
                    入力
                  </Link>
                  <Link
                    href="/view"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition"
                  >
                    表示
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition"
                  >
                    設定
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
