import { shallowReactive, toRaw, ShallowReactive } from 'vue';
import { parseChunk } from './parseTrigger';
import { isObject, isString } from './shared';
import { ParsingMapTree, ParsingMapTreeValue } from './types';

export type GetRef = () => ShallowReactive<ParsingMapTree>;
export type GetProxy = () => ParsingMapTree;

export interface ParsingGraphReturn {
	addParsingMapItem: (key: string, value: ParsingMapTreeValue) => void;
	removeParsingMapItem: (key: string) => void;
	getGraphRef: GetRef;
	setParsingMapItem: (
		this: ParsingGraphReturn,
		key: string,
		value: ParsingMapTreeValue
	) => void;
}

interface ProxyGraph {
	(parseCallBack: (s: string) => [string, ParsingMapTreeValue]): {
		getRef: GetRef;
		proxy: GetProxy;
	};
}

interface ParsingGraph {
	(): ParsingGraphReturn;
}

export const dirtyClassName = new Set<string>();

const parsingGraph: ParsingGraph = () => {
	const mapGraph = {};
	const mapRef = shallowReactive(mapGraph);

	return {
		addParsingMapItem(key: string, value: ParsingMapTreeValue) {
			Reflect.set(mapGraph, key, value);
		},
		removeParsingMapItem(key: string) {
			Reflect.deleteProperty(mapGraph, key);
		},
		getGraphRef() {
			return mapRef;
		},
		setParsingMapItem(key: string, value: ParsingMapTreeValue) {
			if (Reflect.has(mapGraph, key)) {
				this.addParsingMapItem(key, value);
			}
		}
	};
};

export const proxyGraph: ProxyGraph = (parseTrigger) => {
	const parsingGraph_ = parsingGraph();
	const mapRef = parsingGraph_.getGraphRef();
	const rowMapRef = toRaw(mapRef) as ParsingMapTree;
	const proxy = new Proxy(rowMapRef, {
		get(_, key) {
			if (!key || !isString(key)) return;
			if (key === '_toRaw') return rowMapRef;
			//先在自己的Graph模块上找
			//这个has触发vue响应式代理的依赖收集
			if (!Reflect.has(mapRef, key)) {
				const [converKey, converValue] = parseTrigger(key);

				if (converKey && converValue) {
					parsingGraph_.addParsingMapItem(key, converValue);
				}
			}
			//在这里可以直接返回,不同类型,另外在proxy代理转换
			return Reflect.get(_, key);
		},
		set(_, key, value) {
			if (!key || !isString(key)) return;
			//修改的情况直接修改vue响应式数据,
			//执行修改界面
			if (Array.isArray(value)) {
				mapRef[key] = parseChunk(value);
			} else if (isObject(value)) {
				mapRef[key] = value;
			}
			dirtyClassName.add(key);
			return true;
		}
	});
	return {
		getRef: () => mapRef,
		proxy: () => proxy
	};
};
