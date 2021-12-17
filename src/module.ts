import { ParsingMapTree, RegisterParse } from "./types";
import { proxyGraph } from "./parsingGraph";
import { converToGraphValue, parseTrigger } from "./parseTrigger";
import { useConfig } from "./config";

export type Register = (registers: ReturnType<typeof register>) => void;

export type RegisterSetUp = {
    setup: Register
}


const register = (map: Map<string, RegisterParse["value"]>) => {
    return {
        register: (key: string, value: RegisterParse["value"]) => {
            map.set(key, value)
            return register(map)
        }
    }
}


const mapModule = new Map<string, ParsingMapTree>();

export const defineModule = (moduleId: string, define: RegisterSetUp) => {
    const parsingRegisterMap = new Map<string, RegisterParse["value"]>();
    define.setup(register(parsingRegisterMap));

    return (converParse?: Function) => {
        if (!mapModule.has(moduleId)) {
            const { globalModuleKey, prefix } = useConfig();
            const { proxy, getRef } = proxyGraph((key: string) => {
                let [triggerKey, triggerValue] = parseTrigger(key);

                //如果是apply开头,直接使用key
                //这里可以在parseTrigger之前使用starWith判断是否为prefix配置开头
                //但是为更直观,暂时先这样
                if (triggerKey === prefix) {
                    triggerKey = key
                }

                const parsingValue = parsingRegisterMap.get(triggerKey)
                //如果在自己的解析配置中没有找到,
                //如果不是全局模块在自己内部没找到,需要在全局模块上查找一次
                //如果全局模块上没有找到已经解析过的
                //那么就看全局上有没有注册解析配置
                if (moduleId !== globalModuleKey) {
                    // mapModule.get(globalModuleKey)
                    return
                }

                if (parsingValue) {
                    //这里不想在写类型了啊,还要在给这个callback定义类型，在返回一个元组
                    return [triggerKey, converToGraphValue(triggerKey, parsingValue!, triggerValue, getRef)];
                }

                console.warn(`no find Register can parsing key ${triggerKey} , value ${triggerValue}`)
            })
            mapModule.set(moduleId, proxy() as ParsingMapTree)
        }
        return mapModule.get(moduleId);
    }
}


