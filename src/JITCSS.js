import register from "./register";

const JITCSS = {
    unit: 'px',
    APPLY: "apply",
    parsingMap: new Map([]),
    parsing: {
        parse(style) {
            if(!style) return
            const _s = style.split("_");
            return [_s.at(0), _s.slice(1).join("_")].filter(v => v);
        },
        genStyle(key, value, unit = "") {
            return { [key]: `${value}${unit}` }
        },
        genClass(className, key, value, unit = "") {
            return `.${className} {${key}:${value}${unit}}`
        }
    },
    JIT: {}
}

export const useConfig = (config) => {
    const setConfig = ["APPLY", "unit"];
    if (config && typeof config === "object") {
        setConfig.forEach(v => config[v] && (JITCSS[v] = config[v]))
    }
    return JITCSS
}

export const useRegister = () => {
    return {
        register: (key, value) => {
            JITCSS.parsingMap.set(key, value);
            return useRegister()
        }
    }
}
//可以分多模式 style模式 和 class模式
export const useStyleParse = () => {
    const { parsing, parsingMap, APPLY, unit } = JITCSS;
    const parseChunk = (chunk)=>{
        let chunkStyles = {};
        chunk.forEach(v=>{
            chunkStyles = {
                ...chunkStyles,
                ...v
            }
        })
        return chunkStyles;
    }
    return (style, proxyCSS) => {
        const [key, value] = parsing.parse(style);
        if (key === APPLY) {
            const group = parsingMap.get(value);
            return parseChunk(group.chunk(proxyCSS));
        }
        const defineStyle = parsingMap.get(key);
        if (typeof defineStyle !== "object") {
            return parsing.genStyle(defineStyle, value, unit);
        }
        //解析到key之後可以在进行自定义parse
        const parse = defineStyle.parse || parsing.parse;
        const genStyle = defineStyle.genStyle || parsing.genStyle;
        const parseValue = parse(value);
        return genStyle(defineStyle.key, parseValue, unit);
    }
}

export const useClassParse = () => {
    const { parsing, parsingMap, APPLY, unit } = JITCSS;
    const styles = document.querySelectorAll("style");
    const findJIT = Array.from(styles).findIndex(v => v.title === "JITCSS");
    if (findJIT === -1) {
        const JSTStyleDom = document.createElement("style");
        JSTStyleDom.title = "JITCSS";
        document.head.append(JSTStyleDom);
    }
    const styleSheets = document.styleSheets;
    const JITSheet = Array.from(styleSheets).find(v => v.title === "JITCSS");

    const createClass = (gen) => {
        const rule = gen.genClass(gen.className, gen.defineClass, gen.value, gen.unit || '');
        JITSheet.insertRule(rule);
        return gen.className;
    }
    const parseChunk = (chunk)=>{
        return chunk.join(" ");
    }

    return (style, proxyCSS) => {
        const [key, value] = parsing.parse(style);

        if (key === APPLY) {
            const group = parsingMap.get(value);
            return parseChunk(group.chunk(proxyCSS));
        }

        const defineClass = parsingMap.get(key);

        if (typeof defineClass !== "object") {
            return createClass({
                className:style,
                value,
                defineClass,
                unit,
                className:style,
                genClass: parsing.genClass,
            });
        }

        //解析到key之後可以在进行自定义parse
        const parse = defineClass.parse || parsing.parse;
        const genClass = defineClass.genClass || parsing.genClass;
        const parseValue = parse(value);
        const needUnit = defineClass.unit === false
        const haveUnit = needUnit && defineClass.unit != undefined;

        return createClass({
            className:style,
            value:parseValue,
            defineClass:defineClass.key,
            genClass,
            unit:needUnit ? '' : haveUnit ? defineClass.unit :unit
        });
    }
}

export const useJITCSS = (parseCSS) => {
    const proxyCSS = new Proxy(JITCSS.JIT, {
        get(target, key) {
            if (!key) return;
            if (!Reflect.has(target, key)) {
                const _JITCSS = parseCSS(key, proxyCSS);
                Reflect.set(target, key, _JITCSS);
                return _JITCSS;
            }
            return Reflect.get(target, key);
        }
    })
    return proxyCSS;
}


//    return customRef((track, trigger)=>{
//       return {
//         get(){
//             track();
//             return proxyCSS;
//         },
//       }
//     })
// }

// export const useCSS = ()=>{
//     const JITCSS=  useJITCSS();
//     return new Proxy({},{
//         get(_,key){
//          return  unref(JITCSS)[key];
//         }
//     })
// }

export default (app, parse) => {
    register(useRegister);
    app.config.globalProperties.CSS = useJITCSS(parse());
}