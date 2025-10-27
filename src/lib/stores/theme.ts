import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemeName = 'redorange' | 'cyberpunk' | 'green' | 'blue' | 'platinum' | 'sunset';

export interface ThemeConfig {
	name: ThemeName;
	displayName: string;
	light: {
		background: string;
		foreground: string;
		card: string;
		cardForeground: string;
		popover: string;
		popoverForeground: string;
		primary: string;
		primaryForeground: string;
		secondary: string;
		secondaryForeground: string;
		muted: string;
		mutedForeground: string;
		accent: string;
		accentForeground: string;
		destructive: string;
		border: string;
		input: string;
		ring: string;
		chart1: string;
		chart2: string;
		chart3: string;
		chart4: string;
		chart5: string;
	};
	dark: {
		background: string;
		foreground: string;
		card: string;
		cardForeground: string;
		popover: string;
		popoverForeground: string;
		primary: string;
		primaryForeground: string;
		secondary: string;
		secondaryForeground: string;
		muted: string;
		mutedForeground: string;
		accent: string;
		accentForeground: string;
		destructive: string;
		border: string;
		input: string;
		ring: string;
		chart1: string;
		chart2: string;
		chart3: string;
		chart4: string;
		chart5: string;
	};
}

export const themes: Record<ThemeName, ThemeConfig> = {
	redorange: {
		name: 'redorange',
		displayName: 'Red Orange',
		light: {
			background: 'oklch(0.99 0.01 60)',
			foreground: 'oklch(0.15 0.02 30)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.15 0.02 30)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.15 0.02 30)',
			primary: 'oklch(0.58 0.24 35)',
			primaryForeground: 'oklch(0.99 0 0)',
			secondary: 'oklch(0.96 0.02 60)',
			secondaryForeground: 'oklch(0.15 0.02 30)',
			muted: 'oklch(0.96 0.02 60)',
			mutedForeground: 'oklch(0.50 0.01 30)',
			accent: 'oklch(0.96 0.04 40)',
			accentForeground: 'oklch(0.15 0.02 30)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.92 0.01 60)',
			input: 'oklch(0.92 0.01 60)',
			ring: 'oklch(0.58 0.24 35)',
			chart1: 'oklch(0.646 0.222 41.116)',
			chart2: 'oklch(0.6 0.24 30)',
			chart3: 'oklch(0.7 0.18 50)',
			chart4: 'oklch(0.828 0.189 84.429)',
			chart5: 'oklch(0.769 0.188 70.08)'
		},
		dark: {
			background: 'oklch(0.15 0.02 30)',
			foreground: 'oklch(0.98 0.01 60)',
			card: 'oklch(0.20 0.02 30)',
			cardForeground: 'oklch(0.98 0.01 60)',
			popover: 'oklch(0.25 0.02 30)',
			popoverForeground: 'oklch(0.98 0.01 60)',
			primary: 'oklch(0.70 0.24 35)',
			primaryForeground: 'oklch(0.15 0.02 30)',
			secondary: 'oklch(0.25 0.02 30)',
			secondaryForeground: 'oklch(0.98 0.01 60)',
			muted: 'oklch(0.25 0.02 30)',
			mutedForeground: 'oklch(0.70 0.01 30)',
			accent: 'oklch(0.35 0.04 40)',
			accentForeground: 'oklch(0.98 0.01 60)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.70 0.24 35)',
			chart1: 'oklch(0.70 0.24 35)',
			chart2: 'oklch(0.696 0.17 25)',
			chart3: 'oklch(0.769 0.188 50)',
			chart4: 'oklch(0.627 0.265 40)',
			chart5: 'oklch(0.645 0.246 16.439)'
		}
	},
	cyberpunk: {
		name: 'cyberpunk',
		displayName: 'Cyberpunk',
		light: {
			background: 'oklch(0.98 0.01 280)',
			foreground: 'oklch(0.15 0.02 280)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.15 0.02 280)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.15 0.02 280)',
			primary: 'oklch(0.60 0.28 330)',
			primaryForeground: 'oklch(0.99 0 0)',
			secondary: 'oklch(0.95 0.02 280)',
			secondaryForeground: 'oklch(0.15 0.02 280)',
			muted: 'oklch(0.95 0.02 280)',
			mutedForeground: 'oklch(0.50 0.01 280)',
			accent: 'oklch(0.85 0.18 180)',
			accentForeground: 'oklch(0.15 0.02 280)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.90 0.02 280)',
			input: 'oklch(0.90 0.02 280)',
			ring: 'oklch(0.60 0.28 330)',
			chart1: 'oklch(0.60 0.28 330)',
			chart2: 'oklch(0.65 0.25 180)',
			chart3: 'oklch(0.70 0.22 280)',
			chart4: 'oklch(0.75 0.20 200)',
			chart5: 'oklch(0.68 0.24 320)'
		},
		dark: {
			background: 'oklch(0.12 0.04 280)',
			foreground: 'oklch(0.95 0.04 180)',
			card: 'oklch(0.18 0.04 280)',
			cardForeground: 'oklch(0.95 0.04 180)',
			popover: 'oklch(0.22 0.04 280)',
			popoverForeground: 'oklch(0.95 0.04 180)',
			primary: 'oklch(0.75 0.28 330)',
			primaryForeground: 'oklch(0.12 0.04 280)',
			secondary: 'oklch(0.22 0.04 280)',
			secondaryForeground: 'oklch(0.95 0.04 180)',
			muted: 'oklch(0.22 0.04 280)',
			mutedForeground: 'oklch(0.65 0.02 180)',
			accent: 'oklch(0.55 0.25 180)',
			accentForeground: 'oklch(0.95 0.04 180)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(0.85 0.15 330 / 20%)',
			input: 'oklch(0.85 0.15 330 / 25%)',
			ring: 'oklch(0.75 0.28 330)',
			chart1: 'oklch(0.75 0.28 330)',
			chart2: 'oklch(0.70 0.25 180)',
			chart3: 'oklch(0.65 0.22 280)',
			chart4: 'oklch(0.72 0.20 200)',
			chart5: 'oklch(0.68 0.24 320)'
		}
	},
	green: {
		name: 'green',
		displayName: 'Green',
		light: {
			background: 'oklch(0.99 0.01 140)',
			foreground: 'oklch(0.15 0.02 140)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.15 0.02 140)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.15 0.02 140)',
			primary: 'oklch(0.55 0.20 150)',
			primaryForeground: 'oklch(0.99 0 0)',
			secondary: 'oklch(0.96 0.02 140)',
			secondaryForeground: 'oklch(0.15 0.02 140)',
			muted: 'oklch(0.96 0.02 140)',
			mutedForeground: 'oklch(0.50 0.01 140)',
			accent: 'oklch(0.88 0.10 155)',
			accentForeground: 'oklch(0.15 0.02 140)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.92 0.01 140)',
			input: 'oklch(0.92 0.01 140)',
			ring: 'oklch(0.55 0.20 150)',
			chart1: 'oklch(0.60 0.18 145)',
			chart2: 'oklch(0.65 0.16 155)',
			chart3: 'oklch(0.70 0.14 135)',
			chart4: 'oklch(0.75 0.12 160)',
			chart5: 'oklch(0.68 0.15 140)'
		},
		dark: {
			background: 'oklch(0.14 0.02 140)',
			foreground: 'oklch(0.95 0.02 140)',
			card: 'oklch(0.19 0.02 140)',
			cardForeground: 'oklch(0.95 0.02 140)',
			popover: 'oklch(0.24 0.02 140)',
			popoverForeground: 'oklch(0.95 0.02 140)',
			primary: 'oklch(0.70 0.20 150)',
			primaryForeground: 'oklch(0.14 0.02 140)',
			secondary: 'oklch(0.24 0.02 140)',
			secondaryForeground: 'oklch(0.95 0.02 140)',
			muted: 'oklch(0.24 0.02 140)',
			mutedForeground: 'oklch(0.68 0.01 140)',
			accent: 'oklch(0.40 0.12 155)',
			accentForeground: 'oklch(0.95 0.02 140)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.70 0.20 150)',
			chart1: 'oklch(0.65 0.18 145)',
			chart2: 'oklch(0.70 0.16 155)',
			chart3: 'oklch(0.75 0.14 135)',
			chart4: 'oklch(0.72 0.12 160)',
			chart5: 'oklch(0.68 0.15 140)'
		}
	},
	blue: {
		name: 'blue',
		displayName: 'Blue',
		light: {
			background: 'oklch(0.99 0.01 240)',
			foreground: 'oklch(0.15 0.02 240)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.15 0.02 240)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.15 0.02 240)',
			primary: 'oklch(0.55 0.22 250)',
			primaryForeground: 'oklch(0.99 0 0)',
			secondary: 'oklch(0.96 0.02 240)',
			secondaryForeground: 'oklch(0.15 0.02 240)',
			muted: 'oklch(0.96 0.02 240)',
			mutedForeground: 'oklch(0.50 0.01 240)',
			accent: 'oklch(0.88 0.08 245)',
			accentForeground: 'oklch(0.15 0.02 240)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.92 0.01 240)',
			input: 'oklch(0.92 0.01 240)',
			ring: 'oklch(0.55 0.22 250)',
			chart1: 'oklch(0.60 0.20 245)',
			chart2: 'oklch(0.65 0.18 255)',
			chart3: 'oklch(0.70 0.16 235)',
			chart4: 'oklch(0.75 0.14 260)',
			chart5: 'oklch(0.68 0.17 240)'
		},
		dark: {
			background: 'oklch(0.14 0.02 240)',
			foreground: 'oklch(0.95 0.02 240)',
			card: 'oklch(0.19 0.02 240)',
			cardForeground: 'oklch(0.95 0.02 240)',
			popover: 'oklch(0.24 0.02 240)',
			popoverForeground: 'oklch(0.95 0.02 240)',
			primary: 'oklch(0.68 0.22 250)',
			primaryForeground: 'oklch(0.14 0.02 240)',
			secondary: 'oklch(0.24 0.02 240)',
			secondaryForeground: 'oklch(0.95 0.02 240)',
			muted: 'oklch(0.24 0.02 240)',
			mutedForeground: 'oklch(0.68 0.01 240)',
			accent: 'oklch(0.42 0.12 245)',
			accentForeground: 'oklch(0.95 0.02 240)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.68 0.22 250)',
			chart1: 'oklch(0.60 0.20 245)',
			chart2: 'oklch(0.65 0.18 255)',
			chart3: 'oklch(0.70 0.16 235)',
			chart4: 'oklch(0.72 0.14 260)',
			chart5: 'oklch(0.66 0.17 240)'
		}
	},
	platinum: {
		name: 'platinum',
		displayName: 'Platinum',
		light: {
			background: 'oklch(1 0 0)',
			foreground: 'oklch(0.145 0 0)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.145 0 0)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.145 0 0)',
			primary: 'oklch(0.205 0 0)',
			primaryForeground: 'oklch(0.985 0 0)',
			secondary: 'oklch(0.97 0 0)',
			secondaryForeground: 'oklch(0.205 0 0)',
			muted: 'oklch(0.97 0 0)',
			mutedForeground: 'oklch(0.556 0 0)',
			accent: 'oklch(0.97 0 0)',
			accentForeground: 'oklch(0.205 0 0)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.922 0 0)',
			input: 'oklch(0.922 0 0)',
			ring: 'oklch(0.708 0 0)',
			chart1: 'oklch(0.646 0.222 41.116)',
			chart2: 'oklch(0.6 0.118 184.704)',
			chart3: 'oklch(0.398 0.07 227.392)',
			chart4: 'oklch(0.828 0.189 84.429)',
			chart5: 'oklch(0.769 0.188 70.08)'
		},
		dark: {
			background: 'oklch(0.145 0 0)',
			foreground: 'oklch(0.985 0 0)',
			card: 'oklch(0.205 0 0)',
			cardForeground: 'oklch(0.985 0 0)',
			popover: 'oklch(0.269 0 0)',
			popoverForeground: 'oklch(0.985 0 0)',
			primary: 'oklch(0.922 0 0)',
			primaryForeground: 'oklch(0.205 0 0)',
			secondary: 'oklch(0.269 0 0)',
			secondaryForeground: 'oklch(0.985 0 0)',
			muted: 'oklch(0.269 0 0)',
			mutedForeground: 'oklch(0.708 0 0)',
			accent: 'oklch(0.371 0 0)',
			accentForeground: 'oklch(0.985 0 0)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.556 0 0)',
			chart1: 'oklch(0.488 0.243 264.376)',
			chart2: 'oklch(0.696 0.17 162.48)',
			chart3: 'oklch(0.769 0.188 70.08)',
			chart4: 'oklch(0.627 0.265 303.9)',
			chart5: 'oklch(0.645 0.246 16.439)'
		}
	},
	sunset: {
		name: 'sunset',
		displayName: 'Sunset',
		light: {
			background: 'oklch(0.98 0.02 50)',
			foreground: 'oklch(0.15 0.02 30)',
			card: 'oklch(1 0 0)',
			cardForeground: 'oklch(0.15 0.02 30)',
			popover: 'oklch(1 0 0)',
			popoverForeground: 'oklch(0.15 0.02 30)',
			primary: 'oklch(0.62 0.22 45)',
			primaryForeground: 'oklch(0.99 0 0)',
			secondary: 'oklch(0.95 0.03 50)',
			secondaryForeground: 'oklch(0.15 0.02 30)',
			muted: 'oklch(0.95 0.03 50)',
			mutedForeground: 'oklch(0.50 0.01 30)',
			accent: 'oklch(0.85 0.14 340)',
			accentForeground: 'oklch(0.15 0.02 30)',
			destructive: 'oklch(0.577 0.245 27.325)',
			border: 'oklch(0.92 0.02 50)',
			input: 'oklch(0.92 0.02 50)',
			ring: 'oklch(0.62 0.22 45)',
			chart1: 'oklch(0.65 0.24 45)',
			chart2: 'oklch(0.70 0.20 340)',
			chart3: 'oklch(0.75 0.18 25)',
			chart4: 'oklch(0.72 0.22 355)',
			chart5: 'oklch(0.68 0.20 35)'
		},
		dark: {
			background: 'oklch(0.13 0.03 30)',
			foreground: 'oklch(0.95 0.03 50)',
			card: 'oklch(0.18 0.03 30)',
			cardForeground: 'oklch(0.95 0.03 50)',
			popover: 'oklch(0.23 0.03 30)',
			popoverForeground: 'oklch(0.95 0.03 50)',
			primary: 'oklch(0.72 0.22 45)',
			primaryForeground: 'oklch(0.13 0.03 30)',
			secondary: 'oklch(0.23 0.03 30)',
			secondaryForeground: 'oklch(0.95 0.03 50)',
			muted: 'oklch(0.23 0.03 30)',
			mutedForeground: 'oklch(0.68 0.02 50)',
			accent: 'oklch(0.45 0.18 340)',
			accentForeground: 'oklch(0.95 0.03 50)',
			destructive: 'oklch(0.704 0.191 22.216)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.72 0.22 45)',
			chart1: 'oklch(0.65 0.24 45)',
			chart2: 'oklch(0.70 0.20 340)',
			chart3: 'oklch(0.75 0.18 25)',
			chart4: 'oklch(0.72 0.22 355)',
			chart5: 'oklch(0.68 0.20 35)'
		}
	}
};

const THEME_STORAGE_KEY = 'color-theme';
const DEFAULT_THEME: ThemeName = 'platinum';

function getInitialTheme(): ThemeName {
	if (!browser) return DEFAULT_THEME;

	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored && stored in themes) {
		return stored as ThemeName;
	}

	return DEFAULT_THEME;
}

function applyThemeToDocument(themeName: ThemeName): void {
	if (!browser) return;

	const theme = themes[themeName];
	const isDark = document.documentElement.classList.contains('dark');
	const palette = isDark ? theme.dark : theme.light;

	const root = document.documentElement;

	// Apply theme CSS variables
	root.style.setProperty('--background', palette.background);
	root.style.setProperty('--foreground', palette.foreground);
	root.style.setProperty('--card', palette.card);
	root.style.setProperty('--card-foreground', palette.cardForeground);
	root.style.setProperty('--popover', palette.popover);
	root.style.setProperty('--popover-foreground', palette.popoverForeground);
	root.style.setProperty('--primary', palette.primary);
	root.style.setProperty('--primary-foreground', palette.primaryForeground);
	root.style.setProperty('--secondary', palette.secondary);
	root.style.setProperty('--secondary-foreground', palette.secondaryForeground);
	root.style.setProperty('--muted', palette.muted);
	root.style.setProperty('--muted-foreground', palette.mutedForeground);
	root.style.setProperty('--accent', palette.accent);
	root.style.setProperty('--accent-foreground', palette.accentForeground);
	root.style.setProperty('--destructive', palette.destructive);
	root.style.setProperty('--border', palette.border);
	root.style.setProperty('--input', palette.input);
	root.style.setProperty('--ring', palette.ring);
	root.style.setProperty('--chart-1', palette.chart1);
	root.style.setProperty('--chart-2', palette.chart2);
	root.style.setProperty('--chart-3', palette.chart3);
	root.style.setProperty('--chart-4', palette.chart4);
	root.style.setProperty('--chart-5', palette.chart5);

	// Sidebar variables use the same palette
	root.style.setProperty('--sidebar', palette.card);
	root.style.setProperty('--sidebar-foreground', palette.cardForeground);
	root.style.setProperty('--sidebar-primary', palette.primary);
	root.style.setProperty('--sidebar-primary-foreground', palette.primaryForeground);
	root.style.setProperty('--sidebar-accent', palette.accent);
	root.style.setProperty('--sidebar-accent-foreground', palette.accentForeground);
	root.style.setProperty('--sidebar-border', palette.border);
	root.style.setProperty('--sidebar-ring', palette.ring);

	// Store theme name as data attribute for potential CSS targeting
	root.setAttribute('data-theme', themeName);
}

function createThemeStore() {
	const { subscribe, set, update } = writable<ThemeName>(getInitialTheme());

	return {
		subscribe,
		set: (theme: ThemeName) => {
			if (!(theme in themes)) {
				console.warn(`Theme "${theme}" does not exist. Falling back to ${DEFAULT_THEME}.`);
				theme = DEFAULT_THEME;
			}

			set(theme);

			if (browser) {
				localStorage.setItem(THEME_STORAGE_KEY, theme);
				applyThemeToDocument(theme);
			}
		}
	};
}

export const themeStore = createThemeStore();

// Initialize theme on client side
if (browser) {
	applyThemeToDocument(getInitialTheme());

	// Listen to dark mode changes and reapply theme
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'class' &&
				mutation.target === document.documentElement
			) {
				themeStore.subscribe((theme) => {
					applyThemeToDocument(theme);
				})();
			}
		});
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class']
	});
}
