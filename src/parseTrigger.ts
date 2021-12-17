/**
 * 1. apply 定义为全局
 *   例如 apply_idCard
 *
 * 2. 可以为模块 前缀可以为任意,主要用于privde在某一个层级以内
 *  例如 一个组件和它的所有子组件想拥有一个scope作用域
 *      goods_isActiveButton
 *
 */

import { RegisterParse } from "./module";
import { ParsingGraphReturn } from "./parsingGraph";

type ConverToGraphValue = (
    registerKey: string,
    registerValue:  RegisterParse["value"],
    getRef: () => ReturnType<ParsingGraphReturn["getGraphRef"]>
) => any;

export const parseTrigger = (triggerKey: string) => {
    const _s = triggerKey.split("_");
    return [_s[0], _s.slice(1).join("_")].filter(v => v);
}



export const converToGraphValue: ConverToGraphValue = (registerKey, registerValue, getRef) => {

    if(typeof registerValue !=="string"){
        registerValue.cssKey
    }

}