import { isCustomChunk, isCustomParse, isString } from './shared';
import { dirtyClassName, GetProxy } from './parsingGraph';
import {
	CustomChunk,
	CustomParse,
	ParsingMapModule,
	RegisterParse
} from './types';
import { useConfig } from './config';

export const genClassToString = (v: ParsingMapModule) => {
	return Object.keys(v)
		.map((key) => `${key}:${v[key]};`)
		.join('');
};

export const converTo = {
	class(v: ParsingMapModule, key: string, sheet: CSSStyleSheet) {
		/* istanbul ignore next */
		const isHave = Array.from(sheet.cssRules).findIndex((v) => {
			const startWithClassName = (v as CSSStyleRule).selectorText;
			return startWithClassName === `.${key}`;
		});
		/* istanbul ignore next */
		if (isHave === -1) {
			const classRule = genClassToString(v);
			sheet.insertRule(`.${key}{${classRule}}`);
		} else if (dirtyClassName.has(key)) {
			const classRule = genClassToString(v);
			// why no CSSStyleDeclaration type
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const r = (sheet.cssRules.item(isHave) as any).style;
			if (r) {
				(r as CSSStyleDeclaration).cssText = `${classRule}`;
				dirtyClassName.delete(key);
			}
		}
		return `${key}`;
	},
	style(v: ParsingMapModule) {
		return v;
	}
};
/* istanbul ignore next */
export const crateClassRule = () => {
	if (__TEST__) {
		const JSTStyleDom = document.createElement('style');
		document.head.append(JSTStyleDom);
		return document.styleSheets.item(0);
	}
	const styles = document.querySelectorAll('style');
	const findJIT = Array.from(styles).findIndex((v) => v.title === 'FakeCss');
	if (findJIT === -1) {
		const JSTStyleDom = document.createElement('style');
		JSTStyleDom.title = 'FakeCss';
		document.head.append(JSTStyleDom);
	}
	const styleSheets = document.styleSheets;
	const JITSheet = Array.from(styleSheets).find((v) => v.title === 'FakeCss');

	return JITSheet;
};

export const parseTrigger = (triggerKey: string) => {
	const _s = triggerKey.split('_');
	return [_s[0], _s.slice(1).join('_')].filter((v) => v);
};
export const parseChunk = (chunk: Array<object>) => {
	let chunkStyles = {};
	chunk.forEach((v) => {
		chunkStyles = {
			...chunkStyles,
			...v
		};
	});
	return chunkStyles;
};

export function converToGraphValue(
	key: string,
	registerValue: string,
	triggerValue: string,
	getProxy: GetProxy
): any;
export function converToGraphValue(
	key: string,
	registerValue: CustomParse,
	triggerValue: string,
	getProxy: GetProxy
): any;
export function converToGraphValue(
	key: string,
	registerValue: CustomChunk,
	triggerValue: string,
	getProxy: GetProxy
): any;
export function converToGraphValue(
	key: string,
	registerValue: RegisterParse['value'],
	triggerValue: string,
	getProxy: GetProxy
): any;
export function converToGraphValue(
	key: string,
	registerValue: any,
	triggerValue: string,
	getProxy: GetProxy
): any {
	if (isString(registerValue)) {
		const config = useConfig();
		return { [registerValue]: `${triggerValue}${config.unit}` };
	} else if (isCustomParse(registerValue)) {
		return registerValue.parse(key, getProxy(), triggerValue);
	} else if (isCustomChunk(registerValue)) {
		return parseChunk(registerValue.chunk(getProxy()));
	}
}
