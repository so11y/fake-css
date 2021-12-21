const typeScriptPlugin = require('rollup-plugin-typescript2');

const banner = `/*!
* $fake-css v0.0.4
* (c) ${new Date().getFullYear()} zrrz
* @license MIT
*/`;

export default {
	input: './src/fakeCss.ts',
	plugins: [
		typeScriptPlugin({
			check: false
		})
	],
	external: ['vue'],
	output: {
		banner,
		file: './dist/fake-css.esm-browser.js',
		format: 'es'
	}
};
