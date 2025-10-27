/**
 * Portfolio data loader and utilities
 * Provides type-safe access to portfolio JSON data
 */

import type { PortfolioData } from '$lib/types/portfolio';
import portfolioJson from '$lib/data/portfolio.json';

/**
 * Typed portfolio data from JSON
 */
export const portfolioData: PortfolioData = portfolioJson as PortfolioData;

/**
 * Calculate age from birth date
 * @param birthDate - ISO date string (YYYY-MM-DD)
 * @returns Current age
 */
export function calculateAge(birthDate: string): number {
	const birth = new Date(birthDate);
	const today = new Date();
	return (
		today.getFullYear() -
		birth.getFullYear() -
		(today.getMonth() < birth.getMonth() ||
		(today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
			? 1
			: 0)
	);
}

/**
 * Format date for display
 * @param dateStr - ISO date string (YYYY-MM or YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Format date range for display
 * @param startDate - ISO date string
 * @param endDate - ISO date string
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string, endDate: string): string {
	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Get primary social link for hero section
 */
export function getPrimarySocialLink() {
	return portfolioData.socialLinks.find((link) => link.isPrimary);
}

/**
 * Get secondary social links (non-primary)
 */
export function getSecondarySocialLinks() {
	return portfolioData.socialLinks.filter((link) => !link.isPrimary);
}

/**
 * Open external link in new tab
 * @param url - URL to open
 */
export function openExternalLink(url: string): void {
	window.open(url, '_blank');
}
