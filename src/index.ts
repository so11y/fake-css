import { proxyGraph } from "./parsingGraph";
import { App } from "vue";


export const crabCSS = () => {

    return {
        install(app: App) {
            app.config.globalProperties.Style = proxyGraph()
        }
    }

}

export const good = 1;
