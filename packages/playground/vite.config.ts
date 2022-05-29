import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    define: {
        __TEST__: false,
    },
    resolve: { alias: { "vue": "vue/dist/vue.esm-bundler.js" }},
	plugins: [
    vue({
        include: [/\.vue$/]
    }),
]
});
