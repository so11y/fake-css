import { ParsingMapTree } from "./types";
import { proxyGraph } from "./parsingGraph";
import { converToGraphValue, parseTrigger } from "./parseTrigger";
import { useConfig } from "./config";

export interface RegisterParse {
    key: string,
    value: string | {
        cssKey: string,
        parse: (style: string) => string,
    } | {
        chunk: <T = any>(cssProxy: T) => Array<T>
    }
}

const register = (map: Map<string, RegisterParse["value"]>) => {
    return {
        register: (key: string, value: RegisterParse["value"]) => {
            map.set(key, value)
            return register(map)
        }
    }
}

type RegisterSetUp = {
    setup: (registers: ReturnType<typeof register>) => void;
}

const mapModule = new Map<string, ParsingMapTree>();

export const defineModule = (moduleId: string, define: RegisterSetUp) => {
    const parsingRegisterMap = new Map<string, RegisterParse["value"]>();
    define.setup(register(parsingRegisterMap));

    return (converParse?: Function) => {
        if (!mapModule.has(moduleId)) {
            const { globalModuleKey } = useConfig();
            const { proxy, getRef } = proxyGraph((key: string) => {
                const [triggerKey, triggerValue] = parseTrigger(key);
                //如果在自己的解析配置中没有找到,
                //如果不是全局模块在自己内部没找到,需要在全局模块上查找一次
                //如果全局模块上没有找到已经解析过的
                //那么就看全局上有没有注册解析配置
                if (moduleId !== globalModuleKey) {
                    // mapModule.get(globalModuleKey)
                    return
                }

                if (parsingRegisterMap.has(triggerKey)) {
                    converToGraphValue(triggerKey, parsingRegisterMap.get(triggerKey)!, getRef);
                }


                console.log(triggerKey, "triggerKey", parsingRegisterMap);
            })
            mapModule.set(moduleId, proxy() as ParsingMapTree)
        }
        return mapModule.get(moduleId);
    }
}
