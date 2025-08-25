import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: ['..']
		}
	},
	resolve: {
		alias: {
			$lib: '/src/lib'
		}
	},
	optimizeDeps: {
		exclude: ['@sveltejs/kit', 'svelte']
	}
});
