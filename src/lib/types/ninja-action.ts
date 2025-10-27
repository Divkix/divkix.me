/**
 * Type definitions for ninja-keys actions
 * Based on ninja-keys library interfaces
 */

export interface INinjaAction {
	/**
	 * Unique identifier for the action
	 */
	id: string;

	/**
	 * Display title for the action
	 */
	title: string;

	/**
	 * Optional keyboard shortcut (e.g., "ctrl+k")
	 */
	hotkey?: string;

	/**
	 * Function to execute when action is selected
	 */
	handler?: () => void;

	/**
	 * Material Design icon name
	 */
	mdIcon?: string;

	/**
	 * Custom icon (emoji or text)
	 */
	icon?: string;

	/**
	 * Parent action ID for nested menus
	 */
	parent?: string;

	/**
	 * Keywords for search filtering
	 */
	keywords?: string;

	/**
	 * Array of child action IDs
	 */
	children?: string[];

	/**
	 * Section grouping for organization
	 */
	section?: string;
}
