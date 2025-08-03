<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<svelte:head>
	<link rel="icon" href="/assets/img/favicon.png" />
	<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
</svelte:head>

{@render children?.()}
