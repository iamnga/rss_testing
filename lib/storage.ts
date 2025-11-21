import { NewsItem } from '@/types/news';

// In-memory storage for Vercel serverless environment
// Note: Data will be lost on serverless function cold starts
// This is acceptable for testing purposes
let newsStore: NewsItem[] = [
  {
    id: '1',
    title: 'Tin mẫu: VIB ra mắt dịch vụ mới',
    description: 'Ngân hàng VIB vừa công bố ra mắt dịch vụ ngân hàng số hoàn toàn mới với nhiều tính năng ưu việt.',
    link: 'https://example.com/news/vib-new-service',
    imageUrl: 'https://i1-vnexpress.vnecdn.net/2025/11/21/Ukraine-1763681903-3747-1763682114.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=CoEuUMjiaL-xo70ZL74SyA',
    pubDate: new Date().toISOString(),
    category: 'Kinh tế',
    author: 'VIB News',
    sentiment: 'positive',
  },
];

export function getAllNews(): NewsItem[] {
  return newsStore;
}

export function addNews(news: Omit<NewsItem, 'id'>): NewsItem {
  const newItem: NewsItem = {
    ...news,
    id: Date.now().toString(),
    pubDate: news.pubDate || new Date().toISOString(),
  };
  newsStore.unshift(newItem); // Add to beginning for most recent first
  return newItem;
}

export function updateNews(id: string, updates: Partial<NewsItem>): NewsItem | null {
  const index = newsStore.findIndex(item => item.id === id);
  if (index === -1) return null;

  newsStore[index] = { ...newsStore[index], ...updates };
  return newsStore[index];
}

export function deleteNews(id: string): boolean {
  const initialLength = newsStore.length;
  newsStore = newsStore.filter(item => item.id !== id);
  return newsStore.length < initialLength;
}
