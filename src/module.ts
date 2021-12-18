import { ParsingMapModule, ParsingMapTree, ParsingMapTreeValue, RegisterParse } from "./types";
import { proxyGraph } from "./parsingGraph";
import { converTo, converToGraphValue, parseTrigger } from "./parseTrigger";
import { useConfig } from "./config";
import { isString, toRawMapTree } from "./shared";

export type Register = (registers: ReturnType<typeof register>) => void;

export type RegisterSetUp = {
    conver: "class" | "style";
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

    return (converToFun?: (v: ParsingMapModule) => ParsingMapModule) => {
        if (!mapModule.has(moduleId)) {
            const { globalModuleKey, prefix } = useConfig();
            const { proxy } = proxyGraph((key: string) => {
                let [triggerKey, triggerValue] = parseTrigger(key);

                //如果是apply开头,直接使用key
                //这里可以在parseTrigger之前使用starWith判断是否为prefix配置开头
                //但是为更直观,暂时先这样
                if (triggerKey === prefix || triggerKey === moduleId) {
                    triggerKey = key
                }

                const parsingValue = parsingRegisterMap.get(triggerKey)
                //如果在自己的解析配置中没有找到,
                //如果不是全局模块在自己内部没找到,需要在全局模块上查找一次
                //如果全局模块上没有找到已经解析过的
                //那么就看全局上有没有注册解析配置
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

                return console.error(`no find Register can parsing key ${triggerKey} , value ${triggerValue}`)
            })
            mapModule.set(moduleId, proxy() as ParsingMapTree)
        }

        const refCss = mapModule.get(moduleId)!

        return new Proxy(toRawMapTree(refCss), {
            get(_, key) {
                if (!key || !isString(key)) return;
                //存在另外转换,调用里国外转换
                if (converToFun) converToFun(refCss[key])
                //在这里进行转换
                return converTo[define.conver](refCss[key]);
            }
        })
    }
}


