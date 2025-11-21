import { NextResponse } from 'next/server';
import { getAllNews } from '@/lib/storage';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRFC822Date(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toUTCString();
}

export async function GET(request: Request) {
  try {
    const news = getAllNews();
    const { origin } = new URL(request.url);

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>VIB News Feed - Testing</title>
    <link>${origin}</link>
    <description>RSS feed for VIB customer news sentiment analysis - Testing Environment</description>
    <language>vi</language>
    <lastBuildDate>${formatRFC822Date(new Date().toISOString())}</lastBuildDate>
    <generator>VIB RSS Feed Manager</generator>
${news.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.link ? escapeXml(item.link) : `${origin}/news/${item.id}`}</link>
      <pubDate>${formatRFC822Date(item.pubDate)}</pubDate>
      <guid isPermaLink="false">${item.id}</guid>${item.category ? `
      <category>${escapeXml(item.category)}</category>` : ''}${item.author ? `
      <dc:creator>${escapeXml(item.author)}</dc:creator>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
