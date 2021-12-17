import { shallowReactive, toRaw, ShallowReactive } from "vue";
import { isString } from "./shared";
import { ParsingMapTree, ParsingMapTreeValue } from "./types";

export  interface ParsingGraphReturn {
    addParsingMapItem: (key: string, value: string) => void,
    removeParsingMapItem: (key: string) => void,
    getGraphRef: () => ShallowReactive<ParsingMapTree>,
    setParsingMapItem: (this: ParsingGraphReturn, key: string) => void
}

interface ProxyGraph {
    (parseCallBack: Function): {
        getRef: () => ReturnType<ParsingGraphReturn["getGraphRef"]>,
        proxy: () => ProxyHandler<ParsingMapTree>
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
    const mapGraph = new Map<string, ParsingMapTreeValue>();
    const mapRef = shallowReactive(Object.fromEntries(mapGraph))

    return {
        addParsingMapItem(key: string, value: ParsingMapTreeValue) {
            mapGraph.set(key, value);
        },
        removeParsingMapItem(key: string) {
            mapGraph.delete(key);
        },
        getGraphRef() {
            return mapRef
        },
        setParsingMapItem(key: string) {
            if (mapGraph.has(key)) {
                // this.
            }
        }
    }
}

export const proxyGraph: ProxyGraph = (parseTrigger:Function ) => {
    const parsingGraph_ = parsingGraph();
    const mapRef = parsingGraph_.getGraphRef();
    const rowMapRef = toRaw(mapRef) as ParsingMapTree;
    const proxy = new Proxy(rowMapRef, {
        get(_, key) {
            if (!key || !isString(key)) return;
            //先在自己的Graph模块上找
            if (!Reflect.has(mapRef, key)) {
                parseTrigger(key,)
                //     parseCss(key);
                //     // const _JITCSS = parseCSS(key, proxyCSS);
                //     // Reflect.set(target, key, _JITCSS);
                //     // return _JITCSS;
            }
            //这边也不是直接get,而是在这里进行转换
            //根据传入类型,决定是class转换还是style转换
            // return Reflect.get(target, key);
        }
    })
    return {
        getRef: () => mapRef,
        proxy: () => proxy
    }
}



