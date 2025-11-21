import { NewsItem } from '@/types/news';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json');

// Ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getAllNews(): NewsItem[] {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export function addNews(news: Omit<NewsItem, 'id'>): NewsItem {
  ensureDataFile();
  const allNews = getAllNews();
  const newItem: NewsItem = {
    ...news,
    id: Date.now().toString(),
    pubDate: news.pubDate || new Date().toISOString(),
  };
  allNews.unshift(newItem); // Add to beginning for most recent first
  fs.writeFileSync(DATA_FILE, JSON.stringify(allNews, null, 2));
  return newItem;
}

export function updateNews(id: string, updates: Partial<NewsItem>): NewsItem | null {
  ensureDataFile();
  const allNews = getAllNews();
  const index = allNews.findIndex(item => item.id === id);
  if (index === -1) return null;

  allNews[index] = { ...allNews[index], ...updates };
  fs.writeFileSync(DATA_FILE, JSON.stringify(allNews, null, 2));
  return allNews[index];
}

export function deleteNews(id: string): boolean {
  ensureDataFile();
  const allNews = getAllNews();
  const filtered = allNews.filter(item => item.id !== id);
  if (filtered.length === allNews.length) return false;

  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
