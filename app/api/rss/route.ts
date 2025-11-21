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

function createDescription(item: any, origin: string): string {
  // Create HTML description similar to VnExpress format
  // Include image if available, followed by text content
  let htmlContent = '';

  if (item.imageUrl) {
    htmlContent += `<img src="${item.imageUrl}" alt="${escapeXml(item.title)}" width="100%" /><br/>`;
  }

  htmlContent += item.description;

  return htmlContent;
}

export async function GET(request: Request) {
  try {
    const news = getAllNews();
    const { origin } = new URL(request.url);
    const currentDate = formatRFC822Date(new Date().toISOString());

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0">
  <channel>
    <title>VIB News Feed - Testing</title>
    <link>${origin}</link>
    <description>RSS feed for VIB customer news sentiment analysis - Testing Environment</description>
    <language>vi</language>
    <pubDate>${currentDate}</pubDate>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <generator>VIB RSS Feed Manager</generator>
${news.map(item => {
      const itemLink = item.link ? item.link : `${origin}/news/${item.id}`;
      const description = createDescription(item, origin);

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <description><![CDATA[${description}]]></description>
      <link>${escapeXml(itemLink)}</link>
      <guid isPermaLink="${item.link ? 'true' : 'false'}">${escapeXml(itemLink)}</guid>
      <pubDate>${formatRFC822Date(item.pubDate)}</pubDate>${item.category ? `
      <category>${escapeXml(item.category)}</category>` : ''}
    </item>`;
    }).join('\n')}
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
