import type { PageLoad } from './$types';

export const prerender = true;

interface BlogPostMetadata {
	title?: string;
	description?: string;
	date?: string;
	tags?: string[];
	published?: boolean;
}

interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	content: string;
}

export const load: PageLoad = async () => {
	const postModules = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	const posts: BlogPost[] = [];

	for (const [path, module] of Object.entries(postModules)) {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const post = module as {
			metadata?: BlogPostMetadata;
			default?: { render?: () => { html?: string } };
		};

		if (post.metadata?.published !== false) {
			posts.push({
				slug,
				title: post.metadata?.title || 'Untitled',
				description: post.metadata?.description || '',
				date: post.metadata?.date || new Date().toISOString(),
				tags: post.metadata?.tags || [],
				published: post.metadata?.published ?? true,
				content: post.default?.render?.().html || ''
			});
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		posts
	};
};
