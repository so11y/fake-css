import { parseTrigger } from '../parseTrigger';

describe('shared file parseTrigger', () => {
	test('test parseTrigger fucntion ', () => {
		const [key, value] = parseTrigger('pt_30');

		expect(key).toBe('pt');
		expect(value).toBe('30');
	});
});
