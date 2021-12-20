import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { crabCSS, useConfig } from "../../fake-css/src/fakeCss"
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
    }
})

const app = createApp(appVue);
const css = crabCSS();

app.use(router);
app.use(css)
app.mount('#app')
