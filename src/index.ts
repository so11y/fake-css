import { App } from "vue";
import { useConfig } from "./config";
import { defineModule } from "./module";


export const crabCSS = () => {

    const config = useConfig();

    const [useGlobalClass, useGlobalStyle] = defineModule(config.globalModuleKey, {
        setup(register) {
            register.register("mt", "margin-top")
                .register("mr", "margin-right")
                .register("mb", "margin-bottom")
                .register("ml", "margin-left")
                .register("pt", "padding-top")
                .register("pr", "padding-right")
                .register("pb", "padding-bottom")
                .register("pl", "padding-left")
                .register("w", "width")
                .register("h", "height")
                .register("fontSize", 'font-size')
                .register("row", {
                    parse() {
                        return { display: 'flex' }
                    }
                })
                .register("column", {
                    parse(key, ref) {
                        return {
                            ...ref.row,
                            'flex-direction': 'column'
                        }
                    }
                })
                .register("flex_1", {
                    parse() {
                        return { flex: '1' }
                    }
                })
                .register('bg', {
                    parse(key, ref, triggerValue) {
                        return { 'background-color': `${triggerValue}` }
                    },
                })

            if (config.register) {
                config.register(register)
            }
        }
    });

    return {
        install(app: App) {
            app.config.globalProperties.style = useGlobalStyle();
            app.config.globalProperties.css = useGlobalClass();
        }
    }

}

export const good = 1;
