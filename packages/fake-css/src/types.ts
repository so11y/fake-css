export type ParsingMapModule = Record<string, object>;
export type ParsingMapTreeValue = ParsingMapModule;
export type ParsingMapTree = Record<string, ParsingMapTreeValue>;

export type CustomParse = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parse: (key: any, cssProxy: any, registerValue: string) => object;
};
export type CustomChunk = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	chunk: (cssProxy: any) => Array<any>;
};

export interface RegisterParse {
	key: string;
	value: string | CustomParse | CustomChunk;
}
