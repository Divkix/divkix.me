<script lang="ts">
	import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-svelte';
	import { Button, Header } from '$lib/components/ui';

	export let title: string = '';
	export let description: string = '';
	export let date: string = '';
	export let tags: string[] = [];

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getReadingTime(): number {
		if (typeof document !== 'undefined') {
			const content = document.querySelector('.blog-content')?.textContent || '';
			const words = content.split(' ').length;
			return Math.ceil(words / 200);
		}
		return 5;
	}
</script>

<svelte:head>
	<title>{title} - Divanshu Chauhan</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={date} />
	{#if tags && tags.length > 0}
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="min-h-screen bg-background">
	<Header />
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
					{title}
				</h1>

				{#if description}
					<p class="mb-6 text-xl text-muted-foreground">
						{description}
					</p>
				{/if}

				<div class="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
					<div class="flex items-center gap-2">
						<Calendar class="h-4 w-4" />
						<time datetime={date}>{formatDate(date)}</time>
					</div>
					<div class="flex items-center gap-2">
						<Clock class="h-4 w-4" />
						{getReadingTime()} min read
					</div>
					{#if tags && tags.length > 0}
						<div class="flex items-center gap-2">
							<Tag class="h-4 w-4" />
							<div class="flex gap-2">
								{#each tags as tag (tag)}
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
			<div class="blog-content prose prose-lg max-w-none prose-gray dark:prose-invert">
				<slot />
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
