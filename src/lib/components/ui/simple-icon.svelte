<script lang="ts">
	import type { SimpleIcon } from 'simple-icons';

	interface Props {
		icon: SimpleIcon;
		class?: string;
	}

	let { icon, class: className = 'h-5 w-5' }: Props = $props();

	// Force the SVG to use currentColor by adding fill attribute to the SVG element
	const themedSvg = icon.svg.replace('<svg', '<svg fill="currentColor"');
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="{className} text-foreground dark:text-white">{@html themedSvg}</div>
