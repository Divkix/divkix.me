import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		'Sitemap: https://divkix.me/sitemap.xml'
	].join('\n').trim();

	const headers = {
		'Content-Type': 'text/plain',
		'Cache-Control': 'max-age=86400'
	};

	return new Response(body, { headers });
};