import { useConfig } from '../config';

describe('config file', () => {
	test('test useConfig fucntion ', () => {
		const result = useConfig({
			unit: 'rem'
		});

		expect(result.unit).toBe('rem');
	});

	test('test config skip', () => {
		const result = useConfig({
			unit: 'px'
		});
		expect(result.unit).toBe('rem');
	});
});
