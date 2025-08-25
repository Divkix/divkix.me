<script lang="ts">
	import type { PageData } from './$types';
	import { Card, CardContent, CardHeader, CardTitle, Header } from '$lib/components/ui';
	import { Calendar, Clock, Tag } from 'lucide-svelte';

	export let data: PageData;

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getReadingTime(content: string): number {
		const words = content.split(' ').length;
		return Math.ceil(words / 200);
	}
</script>

<svelte:head>
	<title>Blog - Divanshu Chauhan</title>
	<meta
		name="description"
		content="Read the latest thoughts and insights from Divanshu Chauhan on technology, development, and more."
	/>
</svelte:head>

<div class="min-h-screen bg-background">
	<Header />
	<div class="container mx-auto px-4 py-20">
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold md:text-6xl">Blog</h1>
			<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
				Thoughts, insights, and stories from my journey in technology and development.
			</p>
		</div>

		<div class="mx-auto max-w-4xl">
			{#if data.posts && data.posts.length > 0}
				<div class="grid gap-8">
					{#each data.posts as post (post.slug)}
						<Card class="group transition-all duration-300 hover:shadow-lg">
							<CardHeader>
								<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
									<div class="flex items-center gap-2">
										<Calendar class="h-4 w-4" />
										<time datetime={post.date}>{formatDate(post.date)}</time>
									</div>
									<div class="flex items-center gap-2">
										<Clock class="h-4 w-4" />
										{getReadingTime(post.content)} min read
									</div>
									{#if post.tags && post.tags.length > 0}
										<div class="flex items-center gap-2">
											<Tag class="h-4 w-4" />
											<span>{post.tags.join(', ')}</span>
										</div>
									{/if}
								</div>
								<CardTitle class="mb-2">
									<a href="/blog/{post.slug}" class="text-2xl transition-colors hover:text-primary">
										{post.title}
									</a>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="mb-4 text-muted-foreground">{post.description}</p>
								<a
									href="/blog/{post.slug}"
									class="inline-flex items-center text-primary transition-colors hover:underline"
								>
									Read more →
								</a>
							</CardContent>
						</Card>
					{/each}
				</div>
			{:else}
				<div class="py-20 text-center">
					<h2 class="mb-4 text-2xl font-semibold">No posts yet</h2>
					<p class="text-muted-foreground">Check back soon for new content!</p>
				</div>
			{/if}
		</div>
	</div>
</div>
