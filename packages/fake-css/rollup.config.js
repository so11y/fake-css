import typeScriptPlugin from 'rollup-plugin-typescript2';
import rollupPluginReplace from '@rollup/plugin-replace';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
const pkg = require(path.resolve(__dirname, `package.json`));

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license MIT
*/`;

const replaces = () => {
	const replacesKey = {
		__TEST__: false
	};
	Object.keys(replacesKey).forEach((key) => {
		if (key in process.env) {
			replacesKey[key] = process.env[key];
		}
	});
	return rollupPluginReplace({
		preventAssignment: true,
		values: replacesKey
	});
};

const createformat = (config) => {
	const defaultConfig = Object.assign({ output: {}, plugins: [] }, config);
	return {
		input: './src/fakeCss.ts',
		plugins: [
			typeScriptPlugin({
				check: false,
				tsconfig: path.resolve(__dirname, './tsconfig.json'),
				tsconfigOverride: {
					exclude: ['./src/__tests__/**/*.ts']
				}
			}),
			replaces(),
			...defaultConfig.plugins
		],
		external: ['vue'],
		output: defaultConfig.output
	};
};

export default [
	createformat({
		output: {
			banner,
			file: './dist/fake-css.esm-browser.js',
			format: 'es'
		}
	}),
	createformat({
		output: {
			banner,
			file: './dist/fake-css.prod.js',
			format: 'cjs'
		},
		plugins: [
			terser({
				compress: {
					ecma: 2015
				}
			})
		]
	})
];
