<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		children?: Snippet;
	};

	let { class: className, tag = 'h3', children, ...restProps }: Props = $props();
</script>

<svelte:element
	this={tag}
	class={cn('text-2xl leading-none font-semibold tracking-tight', className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
