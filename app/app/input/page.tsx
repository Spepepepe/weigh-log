'use client';

import { useState, useEffect } from 'react';
import { upsertWeightLog, getWeightLogByDate } from '../../lib/weight-service';
import { WeightLogInput } from '../../lib/types';

export default function InputPage() {
  const [formData, setFormData] = useState<WeightLogInput>({
    date: new Date().toISOString().split('T')[0],
    sleep_hours: 7,
    weight: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load existing data when date changes
  useEffect(() => {
    async function loadData() {
      if (!formData.date) return;

      const existing = await getWeightLogByDate(formData.date);
      if (existing) {
        setFormData({
          date: existing.date,
          sleep_hours: existing.sleep_hours,
          weight: existing.weight,
        });
        setMessage('既存のデータを読み込みました');
      }
    }
    loadData();
  }, [formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await upsertWeightLog(formData);
      setMessage('✅ 保存しました');
    } catch (error) {
      setMessage(`❌ エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">体重・睡眠時間 入力</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            日付
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="sleep_hours" className="block text-sm font-medium text-gray-700 mb-2">
            睡眠時間（時間）
          </label>
          <input
            type="number"
            id="sleep_hours"
            min="0"
            max="24"
            step="0.5"
            value={formData.sleep_hours}
            onChange={(e) => setFormData({ ...formData, sleep_hours: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            体重（kg）
          </label>
          <input
            type="number"
            id="weight"
            min="0"
            step="0.01"
            value={formData.weight || ''}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? '保存中...' : '保存'}
        </button>

        {message && (
          <div className={`p-3 rounded-md ${message.startsWith('✅') ? 'bg-green-100 text-green-800' : message.startsWith('❌') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
