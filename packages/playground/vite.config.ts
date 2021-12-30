import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	define: {
	    __TEST__: '',
	},
	plugins: [
		vue({
			include: [/\.vue$/]
		}),
	]
});
