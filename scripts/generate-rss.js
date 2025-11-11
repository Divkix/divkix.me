const fs = require('fs')
const path = require('path')

const siteUrl = 'https://divkix.me'
const author = {
  name: 'Divanshu Chauhan',
  email: 'divkix@divkix.me',
}

// Read posts metadata
const postsPath = path.join(__dirname, '../content/blog/posts.json')
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

// Filter published posts and sort by date (newest first)
const publishedPosts = postsData.posts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Generate RSS XML
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Divanshu Chauhan's Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Developer building useful tools with code and curiosity.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <author>${author.email} (${author.name})</author>
${publishedPosts
  .map(
    (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author?.email || author.email} (${post.author?.name || author.name})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`

// Write RSS feed to public directory
const publicDir = path.join(__dirname, '../public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml)
console.log('✅ RSS feed generated successfully at public/rss.xml')
