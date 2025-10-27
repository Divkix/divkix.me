<script lang="ts">
	import { ModeToggle, ThemeSelector } from '$lib/components/ui';
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<header
	class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<a href="/" class="text-2xl font-bold transition-colors hover:text-primary">Divkix</a>
		<nav class="hidden items-center gap-6 md:flex">
			<a
				href="/blog"
				class="text-sm font-medium transition-colors hover:text-primary"
				class:text-primary={currentPath.startsWith('/blog')}
			>
				Blog
			</a>
		</nav>
		<div class="flex items-center gap-2">
			<a
				href="/blog"
				class="text-sm font-medium transition-colors hover:text-primary md:hidden"
				class:text-primary={currentPath.startsWith('/blog')}
			>
				Blog
			</a>
			<ThemeSelector />
			<ModeToggle />
		</div>
	</div>
</header>
