import { mount } from '@vue/test-utils';
import { defineModule, fekeCss, patch, useConfig } from '../fakeCss';

describe('globalModule file', () => {
	useConfig({
		register(v) {
			v.register('nice', {
				chunk(r) {
					return [r.pt_11];
				}
			});
		}
	});
	const wrapper = mount(
		{
			template: `<p :style="[style.pt_30]"></p>`
		},
		{ global: { plugins: [fekeCss()] } }
	);
	const vm = wrapper.vm as any;
	test('globalModule install ', () => {
		expect(wrapper.find('p').attributes('style')).toBe('padding-top: 30px;');
		// why add custom extend vue type cannot
		expect(vm.style.pt_77).toEqual({
			'padding-top': '77px'
		});
	});

	test('globalModule patch', () => {
		patch((ref) => {
			ref.nice = ref.pt_12;
		});
		expect(vm.style.nice).toEqual({
			'padding-top': '12px'
		});
	});

	test('globalModule register test', () => {
		expect(vm.style.row).toEqual({ display: 'flex' });
		expect(vm.style.column).toEqual({
			display: 'flex',
			'flex-direction': 'column'
		});
		expect(vm.style.bg_red).toEqual({
			'background-color': 'red'
		});
		expect(vm.style.flex_1).toEqual({
			flex: '1'
		});
	});

	test('child module find global', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [useChildClass, useChildStyle] = defineModule('child', {
			setup(v) {
				v.register('fz11', {
					chunk(ref) {
						return [ref.fontSize_11];
					}
				});
			}
		});
		const style = useChildStyle();

		expect(style.fz11).toEqual({ 'font-size': '11px' });
	});
});
