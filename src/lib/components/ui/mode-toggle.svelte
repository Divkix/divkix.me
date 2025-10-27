<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui';
	import { captureClickCoordinates, startCircularTransition } from '$lib/utils/view-transitions';

	type Props = {
		class?: string;
	};

	let { class: className, ...restProps }: Props = $props();

	function handleToggleMode(event: MouseEvent): void {
		// Capture click coordinates for circular animation
		captureClickCoordinates(event);

		// Start circular transition with theme toggle
		void startCircularTransition(
			() => {
				toggleMode();
			},
			{
				x: event.clientX,
				y: event.clientY,
				duration: 600
			}
		);
	}
</script>

<Button variant="outline" size="icon" onclick={handleToggleMode} class={className} {...restProps}>
	<Sun
		class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
