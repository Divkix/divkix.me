import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const origin = 'https://divkix.me';
	
	// Hardcoded blog slugs based on existing files
	const blogSlugs = [
		'advanced-telegram-bot-patterns-go-divkix-guide',
		'asu-student-to-open-source-leader-journey', 
		'cross-platform-download-manager-warpdl-architecture',
		'million-user-telegram-bot-go-alita-robot',
		'teaching-tech-at-scale-asu-ugta-experience'
	];

	// Static pages
	const staticPages = [
		'',
		'/blog'
	];

	// Generate XML
	const urls = [
		...staticPages.map(page => ({
			loc: `${origin}${page}`,
			changefreq: 'weekly',
			priority: page === '' ? '1.0' : '0.8'
		})),
		...blogSlugs.map(slug => ({
			loc: `${origin}/blog/${slug}`,
			changefreq: 'weekly',
			priority: '0.7'
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `	<url>
		<loc>${url.loc}</loc>
		<changefreq>${url.changefreq}</changefreq>
		<priority>${url.priority}</priority>
	</url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};