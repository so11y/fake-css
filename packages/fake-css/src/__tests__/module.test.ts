import { defineModule, getRegisterModule, patch } from '../module';

describe('module file', () => {
	const [useChildClass, useChildStyle] = defineModule('child', {
		setup(v) {
			v.register('child_nice', {
				parse() {
					return { 'font-size': '10px' };
				}
			})
				.register('pt', 'padding-top')
				.register('mb', 'margin-bottom')
				.register('pt_mb', {
					chunk(ref) {
						return [ref.pt_10, ref.mb_10];
					}
				});
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [useGoodClass, useGoodStyle] = defineModule('good', {
		setup(v) {
			v.register('pr', 'padding-right')
				.register('mt', 'margin-top')
				.register('pr_mt', {
					chunk(ref) {
						return [ref.pr_10, ref.mt_10];
					}
				});
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [useGood1Class, useGood1Style] = defineModule('good1', {
		setup(v) {
			v.register('bg', {
				parse(key, ref, triggerValue) {
					return { 'background-color': `${triggerValue}` };
				}
			}).register('g1Box', {
				chunk(ref) {
					const g1 = useGoodStyle();
					return [g1.pr_mt, ref.bg_red];
				}
			});
		}
	});

	test('no use function is no  created module', () => {
		const moduleMap = getRegisterModule();
		expect(moduleMap.get('child')).toBeFalsy();
	});

	test('module style ', () => {
		const style = useChildStyle();
		expect(style.pt_70).toEqual({ 'padding-top': '70px' });
		expect(style.child_nice).toEqual({ 'font-size': '10px' });
	});
	test('created module', () => {
		const moduleMap = getRegisterModule();
		expect(moduleMap.get('child')).toBeTruthy();
	});

	test('module chunk', () => {
		const style = useChildStyle();
		expect(style.pt_mb).toEqual({
			'padding-top': '10px',
			'margin-bottom': '10px'
		});
	});

	test('register no find thorw error', () => {
		const style = useChildStyle();
		expect(() => style.oo).toThrow(/no find register can parsing key/);
	});

	test('multiple module compose', () => {
		const style1 = useGood1Style();

		expect(style1.g1Box).toEqual({
			'background-color': 'red',
			'padding-right': '10px',
			'margin-top': '10px'
		});
	});

	test('module patch obejct', () => {
		const style1 = useGood1Style();
		patch('good1', (ref) => {
			ref.g1Box = ref.bg_black;
		});

		expect(style1.g1Box).toEqual({
			'background-color': 'black'
		});
	});

	test('module class test', () => {
		const childClass = useChildClass();

		expect(childClass.pt_77).toBe('pt_77');
	});
});
