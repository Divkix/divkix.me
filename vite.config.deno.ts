import tailwindcss from 'npm:@tailwindcss/vite@^4.0.0';
import { sveltekit } from 'npm:@sveltejs/kit@^2.22.0/vite';
import { defineConfig } from 'npm:vite@^7.0.4';

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
