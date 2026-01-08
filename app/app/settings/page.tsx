'use client';

import { useState, useEffect } from 'react';
import { getHeight, updateHeight } from '../../lib/weight-service';

export default function SettingsPage() {
  const [height, setHeight] = useState<number>(170);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadHeight();
  }, []);

  function loadHeight() {
    try {
      setLoading(true);
      const currentHeight = getHeight();
      setHeight(currentHeight);
    } catch (error) {
      setMessage(`❌ 読み込みエラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      updateHeight(height);
      setMessage('✅ 身長を保存しました（LocalStorageに保存）');
    } catch (error) {
      setMessage(`❌ エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">設定</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
            身長（cm）
          </label>
          <input
            type="number"
            id="height"
            min="100"
            max="250"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            BMI計算に使用されます
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {saving ? '保存中...' : '保存'}
        </button>

        {message && (
          <div className={`p-3 rounded-md ${message.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">BMIについて</h3>
        <p className="text-sm text-gray-700">
          BMI（Body Mass Index）は体重と身長から算出される肥満度を表す指標です。
          <br />
          計算式: BMI = 体重(kg) ÷ (身長(m) × 身長(m))
        </p>
        <div className="mt-3 text-sm">
          <p className="font-semibold">BMI基準値（日本）:</p>
          <ul className="ml-4 mt-1 space-y-1">
            <li>18.5未満: 低体重</li>
            <li>18.5〜25未満: 普通体重</li>
            <li>25〜30未満: 肥満（1度）</li>
            <li>30以上: 肥満（2度以上）</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
