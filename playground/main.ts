import { createApp} from 'vue'
import App from './App.vue'
import {good} from "../src/index"

console.log(good,"good");

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
app.mount('#app')



