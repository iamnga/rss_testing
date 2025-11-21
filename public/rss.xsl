<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #fefefe;
            color: #333;
            line-height: 1.6;
          }
          .header {
            background: linear-gradient(135deg, #2b6cae 0%, #1e4d7d 100%);
            color: white;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            color: #92b5d7;
            font-size: 1.1rem;
          }
          .info {
            background: #92b5d7;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
          }
          .info h2 {
            color: #2b6cae;
            margin-bottom: 1rem;
          }
          .info p {
            margin: 0.5rem 0;
          }
          .info code {
            background: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            display: inline-block;
            margin-top: 0.5rem;
            color: #2b6cae;
            font-family: 'Courier New', monospace;
          }
          .feed-url {
            background: white;
            padding: 1rem;
            border-radius: 4px;
            margin-top: 0.5rem;
            word-break: break-all;
          }
          .item {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: box-shadow 0.3s;
          }
          .item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .item h3 {
            color: #2b6cae;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }
          .item h3 a {
            color: #2b6cae;
            text-decoration: none;
          }
          .item h3 a:hover {
            color: #f19b38;
          }
          .item-meta {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
          .item-description {
            color: #444;
            line-height: 1.8;
          }
          .category {
            display: inline-block;
            background: #92b5d7;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-right: 0.5rem;
          }
          .footer {
            background: #2b6cae;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
          }
          .count {
            background: #f19b38;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="container">
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="subtitle"><xsl:value-of select="/rss/channel/description"/></p>
          </div>
        </div>

        <div class="container">
          <div class="info">
            <h2>📡 RSS Feed URL</h2>
            <p>Sử dụng URL này trong Power Automate hoặc RSS reader của bạn:</p>
            <div class="feed-url">
              <code><xsl:value-of select="/rss/channel/link"/>/api/rss</code>
            </div>
          </div>

          <div class="count">
            📰 Tổng số tin: <xsl:value-of select="count(/rss/channel/item)"/>
          </div>

          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h3>
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <div class="item-meta">
                <xsl:if test="category">
                  <span class="category"><xsl:value-of select="category"/></span>
                </xsl:if>
                📅 <xsl:value-of select="pubDate"/>
              </div>
              <div class="item-description">
                <xsl:value-of select="description"/>
              </div>
            </div>
          </xsl:for-each>
        </div>

        <div class="footer">
          <p>VIB RSS Feed Manager - Testing Environment</p>
          <p style="color: #92b5d7; margin-top: 0.5rem;">
            Powered by Next.js • Deployed on Vercel
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
