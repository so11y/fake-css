import {
	converTo,
	converToGraphValue,
	crateClassRule,
	genClassToString,
	parseChunk,
	parseTrigger
} from '../parseTrigger';

describe('parseTrigger file', () => {
	test('test parseTrigger fucntion ', () => {
		const [key, value] = parseTrigger('pt_30');

		expect(key).toBe('pt');
		expect(value).toBe('30');
	});

	test('test parseChunk function ', () => {
		const result = parseChunk([{ a: 1 }, { b: 2 }]);
		expect(result).toEqual({
			a: 1,
			b: 2
		});
	});

	test('test converToGraphValue function case object', () => {
		const map = { pl: 'padding-left' };
		const [triggerKey, triggerValue] = parseTrigger('pl_60');
		const test1 = converToGraphValue(
			triggerKey,
			map[triggerKey],
			triggerValue,
			() => ({})
		);

		expect(test1).toEqual({ 'padding-left': '60px' });
	});

	test('test converToGraphValue function case parse', () => {
		const map = {
			flex: {
				parse() {
					return { display: 'flex' };
				}
			}
		};
		const [triggerKey, triggerValue] = parseTrigger('flex');
		const test1 = converToGraphValue(
			triggerKey,
			map[triggerKey],
			triggerValue,
			() => ({})
		);

		expect(test1).toEqual({ display: 'flex' });
	});

	test('test converToGraphValue function case chunk', () => {
		const map = {
			good: {
				chunk() {
					return [
						{
							'padding-top': '30px',
							'padding-right': '30px'
						}
					];
				}
			}
		};
		const [triggerKey, triggerValue] = parseTrigger('good');
		const test1 = converToGraphValue(
			triggerKey,
			map[triggerKey],
			triggerValue,
			() => ({})
		);

		expect(test1).toEqual({
			'padding-top': '30px',
			'padding-right': '30px'
		});
	});

	test('test converTo class function', () => {
		const styleDom = crateClassRule();
		const styleResult = {
			'padding-top': '30px',
			'padding-right': '30px'
		};
		const key = 'good';
		const conver = converTo.class(styleResult, key, styleDom as CSSStyleSheet);
		const classRule = genClassToString(styleResult);

		expect(conver).toBe(key);

		expect(styleDom.cssRules[0].cssText).toContain('padding-top');
		expect(styleDom.cssRules[0].cssText).toContain('padding-right');
		expect(styleDom.cssRules[0].cssText).toContain('30px');
		expect(classRule).toContain('padding-top');
		expect(classRule).toContain('padding-right');
		expect(classRule).toContain('30px');
	});

	test('test converTo style function', () => {
		const styleResult = {
			'padding-top': '30px',
			'padding-right': '30px'
		};
		const conver = converTo.style(styleResult);

		expect(conver).toEqual(styleResult);
	});
});
