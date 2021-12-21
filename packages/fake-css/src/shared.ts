import { CustomChunk, CustomParse } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (key: unknown): key is Record<string, any> => {
	return typeof key === 'object';
};

export const isString = (key: unknown): key is string => {
	return typeof key === 'string';
};

export const isCustomParse = (key: unknown): key is CustomParse => {
	return isObject(key) && key.parse;
};

export const isCustomChunk = (key: unknown): key is CustomChunk => {
	return isObject(key) && key.chunk;
};

export const toRawMapTree = <T extends { _toRaw?: any }>(key: T): T => {
	return key._toRaw;
};

export const isFunction = (
	key: unknown
): key is (...arg: unknown[]) => unknown => {
	return typeof key === 'function';
};
