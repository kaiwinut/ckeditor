import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { sveltekit } from '@sveltejs/kit/vite';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

const require = createRequire(import.meta.url);

export default defineConfig({
	plugins: [
		sveltekit(),
		ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
		svgLoader()
	]
});
