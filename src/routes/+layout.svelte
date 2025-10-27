<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import { isViewTransitionSupported } from '$lib/utils/view-transitions';
	import CommandPalette from '$lib/components/command-palette.svelte';
	import CanvasBackground from '$lib/components/canvas-background.svelte';

	let { children } = $props();

	// Enable view transitions for SvelteKit navigation
	// This provides smooth page transitions between routes
	onNavigate((navigation) => {
		if (!isViewTransitionSupported()) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher />
<CommandPalette />
<CanvasBackground />

<svelte:head>
	<link rel="icon" href="/assets/img/favicon.png" />
	<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
</svelte:head>

{@render children?.()}
