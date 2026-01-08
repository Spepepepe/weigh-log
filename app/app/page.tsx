import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">WeighLog へようこそ</h1>
        <p className="text-xl text-gray-600">
          体重と睡眠時間を記録・管理するアプリケーション
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Link
          href="/input"
          className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-100 hover:border-blue-300"
        >
          <h2 className="text-2xl font-bold mb-3 text-blue-600">📝 データ入力</h2>
          <p className="text-gray-600">
            日々の体重と睡眠時間を記録します。既存データの編集も可能です。
          </p>
        </Link>

        <Link
          href="/view"
          className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-green-100 hover:border-green-300"
        >
          <h2 className="text-2xl font-bold mb-3 text-green-600">📊 データ表示</h2>
          <p className="text-gray-600">
            記録した体重と睡眠時間を一覧表示します。7日間平均やBMIも確認できます。
          </p>
        </Link>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">機能</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✅ 体重と睡眠時間の記録</li>
          <li>✅ 7日間平均の自動計算</li>
          <li>✅ BMI（体格指数）の自動計算</li>
          <li>✅ データの一覧表示</li>
        </ul>
      </div>
    </div>
  );
}
