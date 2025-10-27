import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { browser } from '$app/environment';

// Register ScrollTrigger plugin only in browser environment
if (browser) {
	gsap.registerPlugin(ScrollTrigger);
}

/**
 * Configuration for scroll-triggered animations
 */
export interface ScrollAnimationConfig {
	trigger: string | Element;
	start?: string;
	end?: string;
	toggleActions?: string;
	markers?: boolean;
	scrub?: boolean | number;
}

/**
 * Initialize GSAP and ScrollTrigger
 * Call this in the onMount lifecycle
 */
export function initGSAP(): void {
	if (!browser) return;

	// Set default GSAP configurations for better performance
	gsap.config({
		force3D: true,
		nullTargetWarn: false
	});

	// Configure ScrollTrigger defaults
	ScrollTrigger.config({
		limitCallbacks: true,
		syncInterval: 150
	});
}

/**
 * Clean up all ScrollTrigger instances
 * Call this in the onDestroy lifecycle
 */
export function cleanupScrollTrigger(): void {
	if (!browser) return;
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Fade in elements as they enter the viewport
 */
export function fadeIn(
	selector: string | Element,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.from(elements, {
		opacity: 0,
		y: 30,
		duration: 0.8,
		ease: 'power2.out',
		stagger: 0.1,
		scrollTrigger: {
			trigger: elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Fade in and slide from left
 */
export function fadeInLeft(
	selector: string | Element,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.from(elements, {
		opacity: 0,
		x: -50,
		duration: 0.8,
		ease: 'power2.out',
		stagger: 0.15,
		scrollTrigger: {
			trigger: elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Fade in and slide from right
 */
export function fadeInRight(
	selector: string | Element,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.from(elements, {
		opacity: 0,
		x: 50,
		duration: 0.8,
		ease: 'power2.out',
		stagger: 0.15,
		scrollTrigger: {
			trigger: elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Animate skill bars from 0 to target percentage
 */
export function animateSkillBars(selector: string = '.skill-bar'): gsap.core.Timeline | null {
	if (!browser) return null;

	const skillBars = document.querySelectorAll(selector);

	if (skillBars.length === 0) return null;

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: skillBars[0],
			start: 'top 75%',
			toggleActions: 'play none none reverse'
		}
	});

	skillBars.forEach((bar) => {
		const targetWidth = bar.getAttribute('data-width') || '0%';
		tl.from(
			bar,
			{
				width: '0%',
				duration: 1.2,
				ease: 'power2.out'
			},
			'-=1.0' // Overlap animations slightly
		);
	});

	return tl;
}

/**
 * Stagger animation for cards/items
 */
export function staggerCards(
	selector: string,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const cards = document.querySelectorAll(selector);

	if (cards.length === 0) return null;

	return gsap.from(cards, {
		opacity: 0,
		y: 40,
		scale: 0.95,
		duration: 0.6,
		ease: 'power2.out',
		stagger: {
			amount: 0.4,
			from: 'start'
		},
		scrollTrigger: {
			trigger: cards[0],
			start: 'top 80%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Scale up animation on scroll
 */
export function scaleUp(
	selector: string | Element,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.from(elements, {
		scale: 0.8,
		opacity: 0,
		duration: 0.8,
		ease: 'back.out(1.2)',
		stagger: 0.1,
		scrollTrigger: {
			trigger: elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Reveal animation with clip-path
 */
export function reveal(
	selector: string | Element,
	options: Partial<ScrollAnimationConfig> = {}
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.from(elements, {
		clipPath: 'inset(0 100% 0 0)',
		duration: 1,
		ease: 'power2.inOut',
		stagger: 0.15,
		scrollTrigger: {
			trigger: elements[0],
			start: 'top 80%',
			toggleActions: 'play none none reverse',
			...options
		}
	});
}

/**
 * Counter animation for numbers
 */
export function animateCounter(
	selector: string,
	options: Partial<ScrollAnimationConfig> = {}
): void {
	if (!browser) return;

	const counters = document.querySelectorAll(selector);

	counters.forEach((counter) => {
		const target = counter.textContent || '0';
		const numericValue = parseInt(target.replace(/[^0-9]/g, ''), 10);

		if (isNaN(numericValue)) return;

		const obj = { value: 0 };

		gsap.to(obj, {
			value: numericValue,
			duration: 2,
			ease: 'power1.out',
			scrollTrigger: {
				trigger: counter,
				start: 'top 80%',
				toggleActions: 'play none none reverse',
				...options
			},
			onUpdate: () => {
				const formatted = Math.floor(obj.value).toLocaleString();
				counter.textContent = target.replace(/[0-9,]+/, formatted);
			}
		});
	});
}

/**
 * Parallax effect for elements
 */
export function parallax(
	selector: string | Element,
	yPercent: number = -20
): gsap.core.Tween | null {
	if (!browser) return null;

	const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

	if (elements.length === 0) return null;

	return gsap.to(elements, {
		yPercent,
		ease: 'none',
		scrollTrigger: {
			trigger: elements[0],
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1
		}
	});
}

/**
 * Batch animation utility for better performance
 */
export function batchAnimate(selector: string, animation: (element: Element) => void): void {
	if (!browser) return;

	ScrollTrigger.batch(selector, {
		onEnter: (batch) => batch.forEach(animation),
		start: 'top 85%',
		once: false
	});
}

/**
 * Refresh ScrollTrigger (useful after dynamic content changes)
 */
export function refreshScrollTrigger(): void {
	if (!browser) return;
	ScrollTrigger.refresh();
}
