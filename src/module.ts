import { ParsingMapModule, ParsingMapTree, ParsingMapTreeValue, RegisterParse } from "./types";
import { proxyGraph } from "./parsingGraph";
import { converTo, converToGraphValue, crateClassRule, parseTrigger } from "./parseTrigger";
import { useConfig } from "./config";
import { isString, toRawMapTree } from "./shared";

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

const mapModule = new Map<string, ParsingMapTreeValue>();

export const getRegisterModule = () => Object.fromEntries(mapModule);

export const defineModule = (moduleId: string, define: RegisterSetUp) => {
    const parsingRegisterMap = new Map<string, RegisterParse["value"]>();
    define.setup(register(parsingRegisterMap));
    const proxyJit = (converTo: (v: ParsingMapModule,key?:string) => any) => {
        if (!mapModule.has(moduleId)) {
            const { globalModuleKey, prefix } = useConfig();
            const { proxy } = proxyGraph((key: string) => {
                let [triggerKey, triggerValue] = parseTrigger(key);

                if (triggerKey === prefix || triggerKey === moduleId) {
                    triggerKey = key
                }

                const parsingValue = parsingRegisterMap.get(triggerKey)

                //在自己的模块中没有找到，将在全局模块中查找一次
                if (moduleId !== globalModuleKey && !parsingValue) {
                    const globalMaybeHave = mapModule.get(globalModuleKey)?.[key];
                    if (globalMaybeHave) {
                        return [triggerKey, globalMaybeHave]
                    }
                }

                if (parsingValue) {
                    //这里不想在写类型了,还要在给这个callback定义类型，在返回一个元组
                    return [triggerKey, converToGraphValue(triggerKey, parsingValue!, triggerValue, proxy)];
                }

                throw `no find Register can parsing key ${triggerKey} , value ${triggerValue}`;
            })
            mapModule.set(moduleId, proxy() as ParsingMapTree)
        }

        const refCss = mapModule.get(moduleId)!

        return () => new Proxy(toRawMapTree(refCss), {
            get(_, key) {
                if (!key || !isString(key)) return;
                //在这里进行转换
                return converTo(refCss[key],key);
            }
        })
    }

    return [proxyJit(converTo["class"]),proxyJit(converTo["style"])]
}


