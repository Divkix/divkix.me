<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui';

	export let data: PageData;

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getReadingTime(content: { render?: () => { html?: string } }): number {
		const text = content?.render?.().html || '';
		const words = text.replace(/<[^>]*>/g, '').split(' ').length;
		return Math.ceil(words / 200);
	}
</script>

<svelte:head>
	<title>{data.title} - Divanshu Chauhan</title>
	<meta name="description" content={data.description} />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.date} />
	{#if data.tags && data.tags.length > 0}
		{#each data.tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="min-h-screen bg-background">
	<article class="container mx-auto px-4 py-20">
		<div class="mx-auto max-w-4xl">
			<!-- Back Button -->
			<div class="mb-8">
				<Button variant="ghost" onclick={() => history.back()} class="gap-2">
					<ArrowLeft class="h-4 w-4" />
					Back to Blog
				</Button>
			</div>

			<!-- Article Header -->
			<header class="mb-12">
				<h1 class="mb-6 text-4xl leading-tight font-bold md:text-5xl">
					{data.title}
				</h1>

				{#if data.description}
					<p class="mb-6 text-xl text-muted-foreground">
						{data.description}
					</p>
				{/if}

				<div class="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
					<div class="flex items-center gap-2">
						<Calendar class="h-4 w-4" />
						<time datetime={data.date}>{formatDate(data.date)}</time>
					</div>
					<div class="flex items-center gap-2">
						<Clock class="h-4 w-4" />
						{getReadingTime(data.content)} min read
					</div>
					{#if data.tags && data.tags.length > 0}
						<div class="flex items-center gap-2">
							<Tag class="h-4 w-4" />
							<div class="flex gap-2">
								{#each data.tags as tag (tag)}
									<span class="rounded-full bg-primary/10 px-2 py-1 text-xs">
										{tag}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</header>

			<!-- Article Content -->
			<div class="prose prose-lg max-w-none prose-gray dark:prose-invert">
				<svelte:component this={data.content} />
			</div>

			<!-- Footer -->
			<footer class="mt-16 border-t pt-8">
				<div class="flex justify-between">
					<div>
						<Button variant="outline" onclick={() => history.back()} class="gap-2">
							<ArrowLeft class="h-4 w-4" />
							Back to Blog
						</Button>
					</div>
				</div>
			</footer>
		</div>
	</article>
</div>

<style>
	/* Keep Tailwind prose styles consistent with our design system */
</style>
