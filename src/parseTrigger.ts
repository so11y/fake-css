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
import { GetRef } from "./parsingGraph";
import { CustomChunk, CustomParse, RegisterParse } from "./types";
import { useConfig } from "./config";


export const parseTrigger = (triggerKey: string) => {
    const _s = triggerKey.split("_");
    return [_s[0], _s.slice(1).join("_")].filter(v => v);
}

export function converToGraphValue(registerKey: string, registerValue: string, triggerValue: string, getRef: GetRef): any;
export function converToGraphValue(registerKey: string, registerValue: CustomParse, triggerValue: string, getRef: GetRef): any;
export function converToGraphValue(registerKey: string, registerValue: CustomChunk, triggerValue: string, getRef: GetRef): any;
export function converToGraphValue(registerKey: string, registerValue: RegisterParse["value"], triggerValue: string, getRef: GetRef): any;
export function converToGraphValue(registerKey: string, registerValue: any, triggerValue: string, getRef: GetRef): any {
    const config = useConfig();
    if (isString(registerValue)) {
        return { [registerValue]: `${triggerValue}${config.unit}` };
    } else if (isCustomParse(registerValue)) {
        // registerValue.cssKey
    } else if (isCustomChunk(registerValue)) {
        const v =  registerValue.chunk(getRef())
        console.log(v,"xxxx");
         return {"1":"2"}
    }
}