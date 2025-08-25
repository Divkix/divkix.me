import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

interface BlogPostMetadata {
	title?: string;
	description?: string;
	date?: string;
	tags?: string[];
	published?: boolean;
}

async function getBlogSlugs(): Promise<string[]> {
	const postModules = import.meta.glob('/src/lib/posts/*.md', { eager: true });
	const slugs: string[] = [];

	for (const [path, module] of Object.entries(postModules)) {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const post = module as { metadata?: BlogPostMetadata };
		
		// Only include published posts (default to true if not specified)
		if (post.metadata?.published !== false) {
			slugs.push(slug);
		}
	}

	return slugs;
}

export const GET: RequestHandler = async () => {
	const blogSlugs = await getBlogSlugs();

	return await sitemap.response({
		origin: 'https://divkix.me',
		paramValues: {
			'/blog/[slug]': blogSlugs
		},
		defaultChangefreq: 'weekly',
		defaultPriority: 0.7,
		headers: {
			'cache-control': 'max-age=3600'
		}
	});
};