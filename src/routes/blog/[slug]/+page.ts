import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../lib/posts/${params.slug}.md`);

		if (post.metadata?.published === false) {
			throw error(404, 'Post not found');
		}

		return {
			slug: params.slug,
			title: post.metadata?.title || 'Untitled',
			description: post.metadata?.description || '',
			date: post.metadata?.date || new Date().toISOString(),
			tags: post.metadata?.tags || [],
			published: post.metadata?.published ?? true,
			content: post.default
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
