import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	define: {
	    __TEST__: false,
	},
	plugins: [
		vue({
			include: [/\.vue$/]
		}),
	]
});
