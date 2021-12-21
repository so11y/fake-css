import { isCustomChunk, isCustomParse, isObject, isString } from '../shared';

describe('shared file test', () => {
	test('test isObject', () => {
		expect(isObject({})).toBeTruthy();
		expect(isObject([])).toBeTruthy();
	});

	test('test isString', () => {
		expect(isString('')).toBeTruthy();
		expect(isString(1)).toBeFalsy();
	});

	test('test isCustomParse and isCustomChunk', () => {
		expect(
			isCustomParse({
				good: '1'
			})
		).toBeFalsy();

		//内部并没有在详细判断类型,只要你传入了parse
		//那么我就认为你传递类型正确
		expect(
			isCustomParse({
				parse: '1'
			})
		).toBeTruthy();

		expect(
			isCustomChunk({
				chunk: '1'
			})
		).toBeTruthy();
	});
});
