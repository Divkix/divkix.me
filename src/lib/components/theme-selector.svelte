<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { themeStore, themes, type ThemeName } from '$lib/stores/theme';
	import { Palette, Check } from 'lucide-svelte';

	type Props = {
		class?: string;
	};

	let { class: className, ...restProps }: Props = $props();

	let isOpen = $state(false);
	let buttonRef: HTMLElement | undefined = $state();

	function selectTheme(theme: ThemeName) {
		themeStore.set(theme);
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;

		if (buttonRef && !buttonRef.contains(target) && isOpen) {
			const dropdown = target.closest('[role="menu"]');
			if (!dropdown) {
				isOpen = false;
			}
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const themeColors: Record<ThemeName, string> = {
		redorange: 'from-red-500 to-orange-500',
		cyberpunk: 'from-pink-500 to-cyan-500',
		green: 'from-green-500 to-emerald-500',
		blue: 'from-blue-500 to-indigo-500',
		platinum: 'from-gray-400 to-gray-600',
		sunset: 'from-orange-500 to-pink-500'
	};
</script>

<div class="relative inline-block {className}" {...restProps} bind:this={buttonRef}>
	<Button variant="outline" size="icon" onclick={toggleDropdown} aria-label="Select theme">
		<Palette class="h-[1.2rem] w-[1.2rem]" />
		<span class="sr-only">Select color theme</span>
	</Button>

	{#if isOpen}
		<div
			class="ring-opacity-5 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md border bg-popover shadow-lg ring-1 ring-black focus:outline-none"
			role="menu"
			aria-orientation="vertical"
		>
			<div class="p-2" role="none">
				<div class="mb-2 px-2 py-1.5 text-sm font-semibold text-foreground">Color Theme</div>
				{#each Object.entries(themes) as [key, theme]}
					{@const themeName = key as ThemeName}
					<button
						type="button"
						class="group relative flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
						role="menuitem"
						onclick={() => selectTheme(themeName)}
					>
						<div
							class="h-5 w-5 rounded-full bg-gradient-to-r {themeColors[
								themeName
							]} ring-2 ring-border"
							aria-hidden="true"
						></div>
						<span class="flex-1 text-left">{theme.displayName}</span>
						{#if $themeStore === themeName}
							<Check class="h-4 w-4 text-primary" aria-hidden="true" />
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
