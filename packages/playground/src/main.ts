import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { fekeCss, useConfig } from "../../fake-css/src/fakeCss"
import appVue from './App.vue';
import routes from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes,
    ]
});

useConfig({
    register(v) {
        v.register("apply_m15", {
            chunk(ref) {
                return [
                    ref.mt_15,
                    ref.mr_15,
                    ref.mb_15,
                    ref.ml_15,
                ]
            }
        })
        v.register("buttonAcitveBg", {
            chunk(ref) {
                return [
                    ref.bg_red
                ]
            }
        })
    }
})

const app = createApp(appVue);
const css = fekeCss();

app.use(router);
app.use(css)
app.mount('#app')
