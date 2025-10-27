<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import { themeStore } from '$lib/stores/theme';
	import type { INinjaAction } from '$lib/types/ninja-action';

	// Extend the global Window interface to include NinjaKeys
	interface NinjaKeysElement extends HTMLElement {
		data: INinjaAction[];
		open: () => void;
		close: () => void;
	}

	let ninjaKeys: NinjaKeysElement | null = null;

	// Define command actions with proper typing
	const commands: INinjaAction[] = [
		// Navigation section
		{
			id: 'home',
			title: 'Go to Home',
			section: 'Navigation',
			hotkey: 'ctrl+h',
			icon: '🏠',
			handler: () => {
				goto('/', { invalidateAll: true }).catch(console.error);
			}
		},
		{
			id: 'blog',
			title: 'Go to Blog',
			section: 'Navigation',
			hotkey: 'ctrl+b',
			icon: '📝',
			handler: () => {
				goto('/blog', { invalidateAll: true }).catch(console.error);
			}
		},

		// Theme switching section
		{
			id: 'theme-toggle',
			title: 'Toggle Dark/Light Mode',
			section: 'Appearance',
			hotkey: 'ctrl+shift+d',
			icon: '🌓',
			handler: () => {
				toggleMode();
			}
		},
		{
			id: 'theme',
			title: 'Change Color Theme...',
			section: 'Appearance',
			icon: '🎨',
			children: [
				'theme-platinum',
				'theme-redorange',
				'theme-cyberpunk',
				'theme-green',
				'theme-blue',
				'theme-sunset'
			]
		},
		{
			id: 'theme-platinum',
			title: 'Platinum Theme',
			parent: 'theme',
			icon: '⚪',
			handler: () => {
				themeStore.set('platinum');
			}
		},
		{
			id: 'theme-redorange',
			title: 'Red Orange Theme',
			parent: 'theme',
			icon: '🔴',
			handler: () => {
				themeStore.set('redorange');
			}
		},
		{
			id: 'theme-cyberpunk',
			title: 'Cyberpunk Theme',
			parent: 'theme',
			icon: '💜',
			handler: () => {
				themeStore.set('cyberpunk');
			}
		},
		{
			id: 'theme-green',
			title: 'Green Theme',
			parent: 'theme',
			icon: '🟢',
			handler: () => {
				themeStore.set('green');
			}
		},
		{
			id: 'theme-blue',
			title: 'Blue Theme',
			parent: 'theme',
			icon: '🔵',
			handler: () => {
				themeStore.set('blue');
			}
		},
		{
			id: 'theme-sunset',
			title: 'Sunset Theme',
			parent: 'theme',
			icon: '🌅',
			handler: () => {
				themeStore.set('sunset');
			}
		},

		// Social links section
		{
			id: 'social',
			title: 'Social Links...',
			section: 'Links',
			icon: '🔗',
			children: ['github', 'twitter', 'linkedin', 'instagram', 'telegram', 'email']
		},
		{
			id: 'github',
			title: 'Open GitHub Profile',
			parent: 'social',
			icon: '⚙️',
			handler: () => {
				window.open('https://github.com/divkix', '_blank');
			}
		},
		{
			id: 'twitter',
			title: 'Open X (Twitter) Profile',
			parent: 'social',
			icon: '🐦',
			handler: () => {
				window.open('https://twitter.com/divkix', '_blank');
			}
		},
		{
			id: 'linkedin',
			title: 'Open LinkedIn Profile',
			parent: 'social',
			icon: '💼',
			handler: () => {
				window.open('https://www.linkedin.com/in/divkix', '_blank');
			}
		},
		{
			id: 'instagram',
			title: 'Open Instagram Profile',
			parent: 'social',
			icon: '📸',
			handler: () => {
				window.open('https://instagram.com/_divkix', '_blank');
			}
		},
		{
			id: 'telegram',
			title: 'Open Telegram Profile',
			parent: 'social',
			icon: '✈️',
			handler: () => {
				window.open('https://t.me/divkix', '_blank');
			}
		},
		{
			id: 'email',
			title: 'Send Email',
			parent: 'social',
			icon: '📧',
			handler: () => {
				window.location.href = 'mailto:divkix@divkix.me';
			}
		}
	];

	onMount(async () => {
		if (!browser) return;

		// Dynamically import ninja-keys only on client side
		await import('ninja-keys');

		// Get reference to ninja-keys element
		ninjaKeys = document.querySelector('ninja-keys') as NinjaKeysElement;

		if (ninjaKeys) {
			// Set the command data
			ninjaKeys.data = commands;
		}
	});

	onDestroy(() => {
		// Clean up if needed
		ninjaKeys = null;
	});
</script>

<ninja-keys></ninja-keys>

<style>
	:global(ninja-keys) {
		--ninja-width: 640px;
		--ninja-z-index: 10000;

		/* Colors using CSS variables from theme */
		--ninja-overflow-background: var(--color-background);
		--ninja-text-color: var(--color-foreground);
		--ninja-font-size: 16px;
		--ninja-top: 20%;

		/* Modal styling */
		--ninja-key-border-radius: var(--radius-md);
		--ninja-accent-color: var(--color-primary);
		--ninja-secondary-background-color: var(--color-muted);
		--ninja-secondary-text-color: var(--color-muted-foreground);

		/* Selected item */
		--ninja-selected-background: var(--color-accent);
		--ninja-selected-text-color: var(--color-accent-foreground);

		/* Input */
		--ninja-modal-background: var(--color-card);
		--ninja-modal-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

		/* Separators */
		--ninja-separate-border: var(--color-border);

		/* Icons */
		--ninja-icon-size: 1.2em;
		--ninja-icon-color: var(--color-primary);

		/* Footer */
		--ninja-footer-background: var(--color-muted);

		/* Scrollbar */
		--ninja-scrollbar-track: var(--color-background);
		--ninja-scrollbar-thumb: var(--color-muted);

		/* Group headers */
		--ninja-group-text-color: var(--color-muted-foreground);

		/* Hotkeys */
		--ninja-hotkey-background: var(--color-secondary);
		--ninja-hotkey-text-color: var(--color-secondary-foreground);
		--ninja-hotkey-border-radius: var(--radius-sm);
	}

	/* Additional custom styling for dark mode compatibility */
	:global(.dark ninja-keys) {
		--ninja-modal-shadow: 0 10px 60px rgba(0, 0, 0, 0.5);
	}

	/* Ensure proper border radius and modern look */
	:global(ninja-keys .modal) {
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		backdrop-filter: blur(8px);
	}

	/* Smooth transitions */
	:global(ninja-keys .ninja-action) {
		transition: all 0.15s ease;
	}

	/* Custom scrollbar styling to match theme */
	:global(ninja-keys .modal::-webkit-scrollbar) {
		width: 8px;
	}

	:global(ninja-keys .modal::-webkit-scrollbar-track) {
		background: var(--ninja-scrollbar-track);
	}

	:global(ninja-keys .modal::-webkit-scrollbar-thumb) {
		background: var(--ninja-scrollbar-thumb);
		border-radius: var(--radius-sm);
	}

	:global(ninja-keys .modal::-webkit-scrollbar-thumb:hover) {
		background: var(--color-muted-foreground);
	}
</style>
