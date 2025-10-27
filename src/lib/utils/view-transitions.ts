/**
 * View Transitions API utilities for smooth page and theme transitions
 * with circular clip-path animations
 */

export interface ViewTransitionOptions {
	x: number;
	y: number;
	duration?: number;
}

/**
 * Check if View Transitions API is supported in the browser
 */
export function isViewTransitionSupported(): boolean {
	return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * Start a view transition with circular clip-path animation
 * radiating from the specified coordinates
 */
export async function startCircularTransition(
	updateCallback: () => void | Promise<void>,
	options: ViewTransitionOptions
): Promise<void> {
	const { x, y, duration = 600 } = options;

	if (!isViewTransitionSupported()) {
		// Fallback for browsers without View Transitions API support
		await updateCallback();
		return;
	}

	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	// Calculate the maximum distance from click point to any corner
	// This ensures the circle covers the entire viewport
	const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

	// Start the view transition
	const transition = document.startViewTransition(async () => {
		await updateCallback();
	});

	// Apply the circular clip-path animation
	try {
		await transition.ready;

		// Create dynamic keyframe animation
		const clipPathKeyframes = [
			{
				clipPath: `circle(0px at ${x}px ${y}px)`
			},
			{
				clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`
			}
		];

		// Apply animation to the new view
		document.documentElement.animate(clipPathKeyframes, {
			duration,
			easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
			pseudoElement: '::view-transition-new(root)'
		});
	} catch (error) {
		// Transition was skipped or interrupted
		console.debug('View transition interrupted:', error);
	}
}

/**
 * Start a view transition with fallback for center of viewport
 * Used when click coordinates are not available
 */
export async function startCenteredTransition(
	updateCallback: () => void | Promise<void>,
	duration = 600
): Promise<void> {
	const x = window.innerWidth / 2;
	const y = window.innerHeight / 2;

	await startCircularTransition(updateCallback, { x, y, duration });
}

/**
 * Store click coordinates for theme transitions
 * Call this from event handlers to capture the click position
 */
let lastClickCoordinates: { x: number; y: number } | null = null;

export function captureClickCoordinates(event: MouseEvent | PointerEvent): void {
	lastClickCoordinates = {
		x: event.clientX,
		y: event.clientY
	};
}

export function getLastClickCoordinates(): { x: number; y: number } | null {
	return lastClickCoordinates;
}

export function clearClickCoordinates(): void {
	lastClickCoordinates = null;
}

/**
 * Higher-order function that wraps a function with view transition
 * using the last captured click coordinates
 */
export function withViewTransition<T extends unknown[]>(
	fn: (...args: T) => void | Promise<void>,
	duration = 600
): (...args: T) => Promise<void> {
	return async (...args: T) => {
		const coords = getLastClickCoordinates();

		if (coords) {
			await startCircularTransition(() => fn(...args), { ...coords, duration });
			clearClickCoordinates();
		} else {
			await startCenteredTransition(() => fn(...args), duration);
		}
	};
}
