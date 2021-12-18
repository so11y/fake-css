import { CustomChunk, CustomParse } from "./types";

export const isString = (key: any): key is string => {
    return typeof key === "string"
}

export const isCustomParse = (key: any): key is CustomParse => {
    return key.cssKey && key.parse;
}

export const isCustomChunk = (key: any): key is CustomChunk => {
    return !key.cssKey && key.chunk;
}

export const toRawMapTree = <T extends {_toRaw?:any}>(key: T): T => {
    return key._toRaw
}