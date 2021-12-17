import { createApp} from 'vue'
import App from './App.vue'
import {crabCSS} from "../src/index"


const app =  createApp(App)



// const register = useRegister();
// register.register("good",{
//     chunk(proxyCSS){
//         return [
//             proxyCSS.pr_23,
//             proxyCSS.pl_50,
//             proxyCSS.h_100,
//             proxyCSS.bg_black
//         ]
//      }
// })


// console.log(useConfig());
// app.use(JIT,useClassParse);
// app.use(JIT,useStyleParse);
app.use(crabCSS());
app.mount('#app')

console.log(app.config.globalProperties.Style.pt_30);
// console.log(app.config.globalProperties.Style.goods_layout);
// .zz;



