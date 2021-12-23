import { converToGraphValue, parseTrigger } from '../parseTrigger';
import { proxyGraph } from '../parsingGraph';

describe('shared file parsingGraph', () => {
	const registerMap = {
		pt: 'padding-top',
		mr: 'margin-right',
		good: {
			chunk(ref) {
				return [ref.pt_40, ref.mr_70];
			}
		}
	};

	const { proxy, getRef: rawRef } = proxyGraph((key: string) => {
		const [triggerKey, triggerValue] = parseTrigger(key);
		return [
			triggerKey,
			converToGraphValue(
				triggerKey,
				registerMap[triggerKey],
				triggerValue,
				proxy
			)
		];
	});

	test('test get', () => {
		const getProxy = proxy();

		expect(getProxy.pt_30).toEqual({ 'padding-top': '30px' });
		expect(getProxy.mr_24).toEqual({ 'margin-right': '24px' });
		expect(getProxy.mq_24).toBeUndefined();
	});

	test('test chunk', () => {
		const getRef = proxy();
		const getRawRef = rawRef();

		const result = {
			'padding-top': '40px',
			'margin-right': '70px'
		};
		expect(getRef.good).toEqual(result);

		expect(getRawRef).toMatchObject({
			pt_40: {
				'padding-top': '40px'
			},
			mr_70: {
				'margin-right': '70px'
			}
		});
	});

	test('test chunk Equal', () => {
		const getRef = proxy();
		expect(getRef.good).toBe(getRef.good);
	});

	test('test set chunk ', () => {
		const getRef = proxy();
		const getRawRef = rawRef();
		getRef.good = {
			'padding-top': '20px'
		};
		expect(getRef.good).toBe(getRawRef.good);
	});
});
