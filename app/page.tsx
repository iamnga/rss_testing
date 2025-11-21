'use client';

import { useState, useEffect } from 'react';
import { NewsItem } from '@/types/news';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: '',
    author: '',
    sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
  });
  const [rssUrl, setRssUrl] = useState('');

  useEffect(() => {
    setRssUrl(`${window.location.origin}/api/rss`);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: '',
          description: '',
          link: '',
          category: '',
          author: '',
          sentiment: 'neutral',
        });
        await fetchNews();
      }
    } catch (error) {
      console.error('Error adding news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa tin này?')) return;

    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rssUrl);
    alert('Đã copy RSS feed URL!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">VIB RSS Feed Manager</h1>
          <p className="text-accent mt-2">Quản lý tin tức cho testing Power Automate</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* RSS Feed URL Section */}
        <div className="bg-accent rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-primary mb-3">RSS Feed URL</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={rssUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <button
              onClick={copyToClipboard}
              className="bg-secondary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Copy URL
            </button>
            <a
              href="/api/rss"
              target="_blank"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Xem RSS
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add News Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Thêm Tin Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nhập tiêu đề tin tức"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Nhập mô tả chi tiết"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Link (URL)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/news/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Danh mục</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Kinh tế, Chính trị..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tác giả</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tên tác giả"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Sentiment (cho testing)
                </label>
                <select
                  value={formData.sentiment}
                  onChange={(e) => setFormData({ ...formData, sentiment: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="positive">Tích cực (Positive)</option>
                  <option value="neutral">Trung lập (Neutral)</option>
                  <option value="negative">Tiêu cực (Negative)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang thêm...' : 'Thêm Tin Mới'}
              </button>
            </form>
          </div>

          {/* News List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Danh Sách Tin ({news.length})
            </h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {news.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Chưa có tin nào. Hãy thêm tin mới bên trái.
                </p>
              ) : (
                news.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-primary flex-1">{item.title}</h3>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Xóa tin"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-accent text-primary px-2 py-1 rounded">
                        {formatDate(item.pubDate)}
                      </span>
                      {item.category && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      )}
                      {item.sentiment && (
                        <span
                          className={`px-2 py-1 rounded ${
                            item.sentiment === 'positive'
                              ? 'bg-green-100 text-green-700'
                              : item.sentiment === 'negative'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      )}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline text-sm mt-2 block"
                      >
                        Link: {item.link}
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>VIB RSS Feed Manager - Testing Environment</p>
          <p className="text-accent text-sm mt-2">
            Hỗ trợ testing cho Power Automate flow phân tích sentiment tin tức
          </p>
        </div>
      </footer>
    </div>
  );
}
