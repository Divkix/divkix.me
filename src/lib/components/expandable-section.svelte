<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	/**
	 * Props interface for ExpandableSection component
	 */
	interface ExpandableSectionProps {
		/**
		 * Array of items to display (strings or any content)
		 */
		items: string[];
		/**
		 * Number of items to show when collapsed
		 * @default 2
		 */
		previewCount?: number;
		/**
		 * Text to show when content is collapsed
		 * @default "Show more"
		 */
		expandText?: string;
		/**
		 * Text to show when content is expanded
		 * @default "Show less"
		 */
		collapseText?: string;
		/**
		 * Animation duration in milliseconds
		 * @default 300
		 */
		duration?: number;
		/**
		 * Custom CSS class for the container
		 */
		class?: string;
		/**
		 * Custom CSS class for each item
		 */
		itemClass?: string;
	}

	let {
		items,
		previewCount = 2,
		expandText = 'Show more',
		collapseText = 'Show less',
		duration = 300,
		class: className = '',
		itemClass = ''
	}: ExpandableSectionProps = $props();

	// Reactive state for expanded/collapsed
	let isExpanded = $state(false);

	// Computed value for items to display
	const displayItems = $derived(isExpanded ? items : items.slice(0, previewCount));

	// Determine if we should show the toggle button
	const shouldShowToggle = $derived(items.length > previewCount);

	/**
	 * Toggle expanded state
	 */
	function toggleExpanded(): void {
		isExpanded = !isExpanded;
	}
</script>

<div class="expandable-section {className}">
	<!-- Display items -->
	<ul class="space-y-1 text-sm text-muted-foreground">
		{#each displayItems as item, index (item)}
			{#if index >= previewCount}
				<li
					class="flex items-start gap-2 {itemClass}"
					transition:slide={{ duration, easing: quintOut }}
				>
					<span class="mt-1 text-primary">•</span>
					{item}
				</li>
			{:else}
				<li class="flex items-start gap-2 {itemClass}">
					<span class="mt-1 text-primary">•</span>
					{item}
				</li>
			{/if}
		{/each}
	</ul>

	<!-- Toggle button -->
	{#if shouldShowToggle}
		<button
			type="button"
			onclick={toggleExpanded}
			class="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			aria-expanded={isExpanded}
			aria-label={isExpanded ? collapseText : expandText}
		>
			<span>{isExpanded ? collapseText : expandText}</span>
			{#if isExpanded}
				<ChevronUp class="h-4 w-4 transition-transform" />
			{:else}
				<ChevronDown class="h-4 w-4 transition-transform" />
			{/if}
		</button>
	{/if}
</div>

<style>
	/* Smooth transitions for all interactive elements */
	.expandable-section button {
		-webkit-tap-highlight-color: transparent;
	}

	/* Ensure smooth animation performance */
	.expandable-section ul li {
		transform: translateZ(0);
		will-change: auto;
	}
</style>
