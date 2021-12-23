import {
	ParsingMapModule,
	ParsingMapTree,
	ParsingMapTreeValue,
	RegisterParse
} from './types';
import { proxyGraph } from './parsingGraph';
import {
	converTo,
	converToGraphValue,
	crateClassRule,
	parseTrigger
} from './parseTrigger';
import { useConfig } from './config';
import { isFunction, isString, toRawMapTree } from './shared';

export type Register = (registers: ReturnType<typeof register>) => void;

export type RegisterSetUp = {
	setup: Register;
};
type PatchFn = (proxy: ParsingMapModule) => void;

const register = (map: Map<string, RegisterParse['value']>) => {
	return {
		register: (key: string, value: RegisterParse['value']) => {
			map.set(key, value);
			return register(map);
		}
	};
};

const mapModule = new Map<string, ParsingMapTreeValue>();

export const getRegisterModule = () => Object.fromEntries(mapModule);

const getRegisterMapValue = <T extends Map<string, any>>(
	map: T,
	key: string,
	triggerKey: string
) => {
	if (map.get(key)) {
		return map.get(key);
	}
	return map.get(triggerKey);
};

export const defineModule = (moduleId: string, define: RegisterSetUp) => {
	const parsingRegisterMap = new Map<string, RegisterParse['value']>();
	define.setup(register(parsingRegisterMap));
	const proxyJit = (converTo: (v: ParsingMapModule, key?: string) => any) => {
		if (!mapModule.has(moduleId)) {
			const { globalModuleKey, prefix } = useConfig();
			const { proxy } = proxyGraph((key: string) => {
				// eslint-disable-next-line prefer-const
				let [triggerKey, triggerValue] = parseTrigger(key);

				if (triggerKey === prefix || triggerKey === moduleId) {
					triggerKey = key;
				}

				//查一次拆开的,拆开的没查找查一次全称
				const parsingValue = getRegisterMapValue(
					parsingRegisterMap,
					key,
					triggerKey
				);

				//在自己的模块中没有找到，将在全局模块中查找一次
				if (moduleId !== globalModuleKey && !parsingValue) {
					const globalMaybeHave = mapModule.get(globalModuleKey)?.[key];
					if (globalMaybeHave) {
						return [triggerKey, globalMaybeHave];
					}
				}

				if (parsingValue) {
					//这里不想在写类型了,还要在给这个callback定义类型，在返回一个元组
					return [
						triggerKey,
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						converToGraphValue(key, parsingValue!, triggerValue, proxy)
					];
				}

				throw `no find Register can parsing key ${triggerKey} , value ${triggerValue}`;
			});
			mapModule.set(moduleId, proxy() as ParsingMapTree);
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const refCss = mapModule.get(moduleId)!;

		return () =>
			new Proxy(toRawMapTree(refCss), {
				get(_, key) {
					if (!key || !isString(key)) return;
					if (key === '__v_isRef') return;
					//在这里进行转换
					return converTo(refCss[key] as ParsingMapModule, key);
				}
			});
	};

	return [
		() => {
			const JITSheet = crateClassRule();
			if (JITSheet) {
				return proxyJit((ParsingMapModule, key) =>
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					converTo['class'](ParsingMapModule, key!, JITSheet)
				)();
			}
			console.warn('now platform no support jitClass you can use style !');
		},
		proxyJit(converTo['style'])
	];
};

export function patch(p: PatchFn);
export function patch(p: string, pathcFn: PatchFn);
export function patch(p: string | PatchFn, pathcFn?: PatchFn) {
	if (!isString(p) && isFunction(p)) {
		const config = useConfig();
		const globalModule = mapModule.get(config.globalModuleKey);
		if (globalModule) {
			p(globalModule);
		}
	} else if (isString(p)) {
		const globalModule = mapModule.get(p);
		if (globalModule) {
			pathcFn(globalModule);
		}
	}
}
