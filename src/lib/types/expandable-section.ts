/**
 * Type definitions for ExpandableSection component
 * Provides strict type safety for expandable content patterns
 */

/**
 * Props interface for ExpandableSection component
 */
export interface ExpandableSectionProps {
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

/**
 * Animation configuration for expandable sections
 */
export interface ExpandableAnimationConfig {
	/**
	 * Animation duration in milliseconds
	 */
	duration: number;
	/**
	 * Easing function for animation
	 */
	easing: (t: number) => number;
}

/**
 * State interface for expandable sections
 */
export interface ExpandableState {
	/**
	 * Whether the section is currently expanded
	 */
	isExpanded: boolean;
	/**
	 * Items currently being displayed
	 */
	displayItems: string[];
	/**
	 * Whether the toggle button should be shown
	 */
	shouldShowToggle: boolean;
}
