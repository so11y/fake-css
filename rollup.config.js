const typeScriptPlugin = require('rollup-plugin-typescript2');

const banner = `/*!
* $crab-css v0.0.1
* (c) ${new Date().getFullYear()} zrrz
* @license MIT
*/`;

export default {
    input: './src/carbCss.ts',
    plugins: [
        typeScriptPlugin({
            check: false,
        })
    ],
    external: ["vue"],
    output: {
        banner,
        file: './dist/crab-css.esm-browser.js',
        format: 'es'
    }
}