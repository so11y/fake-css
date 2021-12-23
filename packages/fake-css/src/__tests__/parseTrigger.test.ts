import { parseChunk, parseTrigger } from '../parseTrigger';

describe('shared file parseTrigger', () => {
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
});
