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

function createDescription(item: any): string {
  // Create HTML description similar to VnExpress format
  // Include image link if available, followed by text content
  let htmlContent = '';

  if (item.imageUrl) {
    htmlContent += `<a href="${item.link}"><img src="${item.imageUrl}"></a></br>`;
  }

  htmlContent += item.description;

  return htmlContent;
}

function getImageType(imageUrl: string): string {
  const ext = imageUrl.split('.').pop()?.split('?')[0]?.toLowerCase();
  const typeMap: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
  };
  return typeMap[ext || ''] || 'image/jpeg';
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
    <title>VIB News - RSS Feed</title>
    <description>VIB RSS</description>
    <image>
      <url>${origin}/logo.png</url>
      <title>VIB News - Tin tức ngân hàng VIB</title>
      <link>${origin}</link>
    </image>
    <pubDate>${currentDate}</pubDate>
    <generator>VIB</generator>
    <link>${origin}/api/rss</link>
${news.map(item => {
      const itemLink = item.link ? item.link : `${origin}/news/${item.id}`;
      const description = createDescription(item);
      const pubDate = formatRFC822Date(item.pubDate);

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <link>${itemLink}</link>
      <guid>${itemLink}</guid>${item.imageUrl ? `
      <enclosure type="${getImageType(item.imageUrl)}" length="1200" url="${item.imageUrl}"/>` : ''}
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
