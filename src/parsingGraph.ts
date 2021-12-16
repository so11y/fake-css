import { shallowRef, toRaw, Ref } from "vue";
import { parseCss } from "./parseCss";
import { isString } from "./shared";
import { ParsingMapModule, ParsingMapTree } from "./types";

interface ParsingGraphReturn {
    addParsingMapItem: (key: string, value: ParsingMapModule | string) => void,
    removeParsingMapItem: (key: string) => void,
    getGraphRef: () => Ref<ParsingMapTree>,
    setParsingMapItem: (this: ParsingGraphReturn, key: string) => void
}

interface ParsingGraph {
    (): ParsingGraphReturn
}

export type GraphRefProxy = ProxyHandler<ParsingGraphReturn["getGraphRef"]>;

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
    const mapGraph: ParsingMapTree = {};
    const mapRef = shallowRef(mapGraph)

    return {
        addParsingMapItem(key: string, value: ParsingMapModule | string) {
            Reflect.set(mapGraph, key, value)
        },
        removeParsingMapItem(key: string) {
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

const parsingGraph_ = parsingGraph();
export const getparsingGraph = () => parsingGraph_;

let proxyHandelRef_: GraphRefProxy;
export const getProxyHandelRef = () => proxyHandelRef_;

export const proxyGraph = (): () => ProxyHandler<GraphRefProxy> => {
    const mapRef = parsingGraph_.getGraphRef();
    const rowMapRef = toRaw(mapRef.value);
    return () => {
        return proxyHandelRef_ = new Proxy(rowMapRef, {
            get(target, key) {
                if (!key || !isString(key)) return;
                if (!Reflect.has(mapRef.value, key)) {
                    parseCss(key);
                    // const _JITCSS = parseCSS(key, proxyCSS);
                    // Reflect.set(target, key, _JITCSS);
                    // return _JITCSS;
                }

                //这边也不是直接get,而是在这里进行转换
                return Reflect.get(target, key);
            }
        })
    }
}



