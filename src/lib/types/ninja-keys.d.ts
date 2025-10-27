/**
 * TypeScript declarations for ninja-keys web component
 * Provides type safety for the custom element in Svelte components
 */

import type { INinjaAction } from './ninja-action';

declare global {
	namespace svelteHTML {
		interface IntrinsicElements {
			'ninja-keys': {
				data?: INinjaAction[];
				placeholder?: string;
				hideBreadcrumbs?: boolean;
				openHotkey?: string;
				navigationUpHotkey?: string;
				navigationDownHotkey?: string;
				closeHotkey?: string;
				goBackHotkey?: string;
				selectHotkey?: string;
				hotKeysJoinedView?: boolean;
				noAutoLoadMdIcons?: boolean;
				disableHotkeys?: boolean;
				class?: string;
			};
		}
	}

	interface HTMLElementTagNameMap {
		'ninja-keys': NinjaKeysElement;
	}
}

export interface NinjaKeysElement extends HTMLElement {
	/**
	 * Array of actions/commands to display in the palette
	 */
	data: INinjaAction[];

	/**
	 * Placeholder text for the search input
	 */
	placeholder: string;

	/**
	 * Hide breadcrumbs navigation
	 */
	hideBreadcrumbs: boolean;

	/**
	 * Hotkey to open the command palette (default: "cmd+k,ctrl+k")
	 */
	openHotkey: string;

	/**
	 * Hotkey to navigate up in the list
	 */
	navigationUpHotkey: string;

	/**
	 * Hotkey to navigate down in the list
	 */
	navigationDownHotkey: string;

	/**
	 * Hotkey to close the palette
	 */
	closeHotkey: string;

	/**
	 * Hotkey to go back in breadcrumb navigation
	 */
	goBackHotkey: string;

	/**
	 * Hotkey to select current item
	 */
	selectHotkey: string;

	/**
	 * Show hotkeys in a joined view
	 */
	hotKeysJoinedView: boolean;

	/**
	 * Disable automatic loading of Material Design icons
	 */
	noAutoLoadMdIcons: boolean;

	/**
	 * Disable all hotkeys
	 */
	disableHotkeys: boolean;

	/**
	 * Programmatically open the command palette
	 */
	open: () => void;

	/**
	 * Programmatically close the command palette
	 */
	close: () => void;

	/**
	 * Event fired when a command is selected
	 */
	addEventListener(
		type: 'selected',
		listener: (event: CustomEvent<{ action: INinjaAction }>) => void,
		options?: boolean | AddEventListenerOptions
	): void;

	/**
	 * Event fired when search input changes
	 */
	addEventListener(
		type: 'change',
		listener: (event: CustomEvent<{ search: string }>) => void,
		options?: boolean | AddEventListenerOptions
	): void;
}

export {};
