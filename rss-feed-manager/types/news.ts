export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  author?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  items: NewsItem[];
}
