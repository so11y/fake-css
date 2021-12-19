
export type ParsingMapModule = Record<string, {}>;
export type ParsingMapTreeValue = ParsingMapModule;
export type ParsingMapTree = Record<string, ParsingMapTreeValue>;

export type CustomParse = {
    parse: (key: any, cssProxy: any, registerValue: string) => object,
}
export type CustomChunk = {
    chunk: (cssProxy: any) => Array<any>
}

export interface RegisterParse {
    key: string,
    value: string | CustomParse | CustomChunk
}
