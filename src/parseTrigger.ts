/**
 * 1. apply 定义为全局
 *   例如 apply_idCard
 *
 * 2. 可以为模块 前缀可以为任意,主要用于privde在某一个层级以内
 *  例如 一个组件和它的所有子组件想拥有一个scope作用域
 *      goods_isActiveButton
 *
 */

import { isCustomChunk, isCustomParse, isString } from "./shared";
import { GetProxy } from "./parsingGraph";
import { CustomChunk, CustomParse, ParsingMapModule, RegisterParse } from "./types";
import { useConfig } from "./config";

const genClassToString = (v: ParsingMapModule) => {
    let classRule = "";
    Object.keys(v).forEach(key => {
        classRule += `${key}:${v[key]};`
    })
    return classRule
}

export const converTo = {
    class(v: ParsingMapModule, key: string, sheet: CSSStyleSheet) {
        const isHave = Array.from(sheet.cssRules).findIndex(v => {
            const startWithClassName = (v as CSSStyleRule).selectorText;
            return startWithClassName === `.${key}`;
        })
        if (isHave === -1) {
            const classRule = genClassToString(v);
            sheet.insertRule(`.${key}{${classRule}}`);
        }
        return `${key}`;
    },
    style(v: ParsingMapModule) {
        return v;
    }
}

export const crateClassRule = () => {
    const styles = document.querySelectorAll("style");
    const findJIT = Array.from(styles).findIndex(v => v.title === "JITCSS");
    if (findJIT === -1) {
        const JSTStyleDom = document.createElement("style");
        JSTStyleDom.title = "JITCSS";
        document.head.append(JSTStyleDom);
    }
    const styleSheets = document.styleSheets;
    const JITSheet = Array.from(styleSheets).find(v => v.title === "JITCSS");

    return JITSheet
}

export const parseTrigger = (triggerKey: string) => {
    const _s = triggerKey.split("_");
    return [_s[0], _s.slice(1).join("_")].filter(v => v);
}
export const parseChunk = (chunk: Array<{}>) => {
    let chunkStyles = {};
    chunk.forEach(v => {
        chunkStyles = {
            ...chunkStyles,
            ...v
        }
    })
    return chunkStyles;
}

export function converToGraphValue(key: string, registerValue: string, triggerValue: string, getProxy: GetProxy): any;
export function converToGraphValue(key: string, registerValue: CustomParse, triggerValue: string, getProxy: GetProxy): any;
export function converToGraphValue(key: string, registerValue: CustomChunk, triggerValue: string, getProxy: GetProxy): any;
export function converToGraphValue(key: string, registerValue: RegisterParse["value"], triggerValue: string, getProxy: GetProxy): any;
export function converToGraphValue(key: string, registerValue: any, triggerValue: string, getProxy: GetProxy): any {
    if (isString(registerValue)) {
        const config = useConfig();
        return { [registerValue]: `${triggerValue}${config.unit}` };
    } else if (isCustomParse(registerValue)) {
        return registerValue.parse(key, getProxy(),triggerValue)
    } else if (isCustomChunk(registerValue)) {
        return parseChunk(registerValue.chunk(getProxy()))
    }
}