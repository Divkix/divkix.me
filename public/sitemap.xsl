<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:sitemapindex="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap | divkix.me</title>
        <style>
          :root {
            --bg: #0a0a0a;
            --bg-card: #141414;
            --text: #fafafa;
            --text-muted: #a1a1aa;
            --border: #27272a;
            --accent: #3b82f6;
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            padding: 2rem;
            min-height: 100vh;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border);
          }
          h1 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            color: var(--text-muted);
            font-size: 0.9rem;
          }
          .count {
            display: inline-block;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 0.25rem 0.75rem;
            font-size: 0.85rem;
            margin-top: 1rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--bg-card);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--border);
          }
          th, td {
            text-align: left;
            padding: 0.875rem 1rem;
          }
          th {
            background: var(--bg);
            font-weight: 500;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
          }
          tr:not(:last-child) td {
            border-bottom: 1px solid var(--border);
          }
          tr:hover td {
            background: rgba(59, 130, 246, 0.05);
          }
          a {
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
          .meta {
            color: var(--text-muted);
            font-size: 0.85rem;
          }
          .priority {
            display: inline-block;
            padding: 0.125rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          .priority-high { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
          .priority-medium { background: rgba(234, 179, 8, 0.2); color: #eab308; }
          .priority-low { background: rgba(156, 163, 175, 0.2); color: #9ca3af; }
          footer {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--text-muted);
            font-size: 0.85rem;
          }
          footer a { color: var(--text-muted); }
          footer a:hover { color: var(--accent); }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Sitemap</h1>
            <p class="subtitle">XML sitemap for search engine crawlers</p>
            <xsl:choose>
              <xsl:when test="sitemap:urlset">
                <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
              </xsl:when>
              <xsl:when test="sitemapindex:sitemapindex">
                <span class="count"><xsl:value-of select="count(sitemapindex:sitemapindex/sitemapindex:sitemap)"/> Sitemaps</span>
              </xsl:when>
            </xsl:choose>
          </header>

          <xsl:apply-templates/>

          <footer>
            <a href="/">Back to divkix.me</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap Index -->
  <xsl:template match="sitemapindex:sitemapindex">
    <table>
      <thead>
        <tr>
          <th>Sitemap</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemapindex:sitemap">
          <tr>
            <td>
              <a href="{sitemapindex:loc}"><xsl:value-of select="sitemapindex:loc"/></a>
            </td>
            <td class="meta">
              <xsl:if test="sitemapindex:lastmod">
                <xsl:value-of select="substring(sitemapindex:lastmod, 1, 10)"/>
              </xsl:if>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- URL Set -->
  <xsl:template match="sitemap:urlset">
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Priority</th>
          <th>Change Freq</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:url">
          <xsl:sort select="sitemap:priority" order="descending"/>
          <tr>
            <td>
              <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
            <td>
              <xsl:variable name="priority" select="sitemap:priority"/>
              <xsl:choose>
                <xsl:when test="$priority >= 0.8">
                  <span class="priority priority-high"><xsl:value-of select="$priority"/></span>
                </xsl:when>
                <xsl:when test="$priority >= 0.5">
                  <span class="priority priority-medium"><xsl:value-of select="$priority"/></span>
                </xsl:when>
                <xsl:otherwise>
                  <span class="priority priority-low"><xsl:value-of select="$priority"/></span>
                </xsl:otherwise>
              </xsl:choose>
            </td>
            <td class="meta">
              <xsl:value-of select="sitemap:changefreq"/>
            </td>
            <td class="meta">
              <xsl:if test="sitemap:lastmod">
                <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
              </xsl:if>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

</xsl:stylesheet>
