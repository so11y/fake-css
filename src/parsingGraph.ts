import { shallowReactive, toRaw, ShallowReactive } from "vue";
import { isString } from "./shared";
import { ParsingMapTree, ParsingMapTreeValue } from "./types";

export type GetRef = () => ShallowReactive<ParsingMapTree>;
export type GetProxy = () => ProxyHandler<ParsingMapTree>

export interface ParsingGraphReturn {
    addParsingMapItem: (key: string, value: string) => void,
    removeParsingMapItem: (key: string) => void,
    getGraphRef: GetRef,
    setParsingMapItem: (this: ParsingGraphReturn, key: string) => void
}

interface ProxyGraph {
    (parseCallBack: Function): {
        getRef: GetRef,
        proxy: GetProxy
    }
}

interface ParsingGraph {
    (): ParsingGraphReturn
}

const parsingGraph: ParsingGraph = () => {
    /**
     *  pd_30 : 'padding:30px',
     *  mt_10 : 'margint-top:10px'
     *
     * //全局自定义組合
     * apply_idCard : {
     *      pd_10:'padding:10px',
     *      mt_10:'margint-top:10px'
     * }
     *
     * //模块组合 不能模块与模块之间组合
     * goods_layout:{
     *       pd_12:'padding:12px',
     *      mt_12:'margint-top:12px'
     * }
     */
    const mapGraph = {};
    const mapRef = shallowReactive(mapGraph)

    return {
        addParsingMapItem(key: string, value: ParsingMapTreeValue) {
            // mapGraph.set(key, value);
            Reflect.set(mapGraph, key, value)
        },
        removeParsingMapItem(key: string) {
            // mapGraph.delete(key);
            Reflect.deleteProperty(mapGraph, key)
        },
        getGraphRef() {
            return mapRef
        },
        setParsingMapItem(key: string) {
            if (Reflect.has(mapGraph, key)) {
                // this.
            }
        }
    }
}

export const proxyGraph: ProxyGraph = (parseTrigger: Function) => {
    const parsingGraph_ = parsingGraph();
    const mapRef = parsingGraph_.getGraphRef();
    const rowMapRef = toRaw(mapRef) as ParsingMapTree;
    const proxy = new Proxy(rowMapRef, {
        get(_, key) {
            if (!key || !isString(key)) return;
            if (key === "_toRaw") return rowMapRef;
            //先在自己的Graph模块上找
            if (!Reflect.has(mapRef, key)) {
                const [converKey, converValue] = parseTrigger(key)

                if (converKey && converValue) {
                    parsingGraph_.addParsingMapItem(key, converValue)
                }
            }
            //在这里可以直接返回,不同类型,另外在proxy代理转换
            return Reflect.get(_, key);
        }
    })
    return {
        getRef: () => mapRef,
        proxy: () => proxy
    }
}



