import { createApp } from 'vue'
import App from './App.vue'
import { crabCSS, useConfig, getRegisterModule, defineModule } from "../src/carbCss"


const app = createApp(App)

useConfig({
    register(r) {
        r.register("apply_good", {
            chunk(ref) {
                return [
                    ref.pb_10,
                    ref.pl_77
                ];
            }
        })
    }
})
app.use(crabCSS());
setTimeout(() => {
    console.log(getRegisterModule());
}, 500)
app.mount('#app')

const [_1, useGoodsStyle] = defineModule("goods", {
    setup(v) {
        v.register("goods_layout", {
            chunk: (ref) => {
                return [
                    ref.pb_20,
                    ref.pt_11
                ]
            }
        })
    }
})
console.log(useGoodsStyle().goods_layout);
// console.log(useGoodsStyle().goods_layout);
// console.log(useGoodsStyle().pt_11);
// const [_2, useUserStyle] = defineModule("user", {
//     setup(v) {
//         v.register("user_layout", {
//             chunk: (ref) => {
//                 return [
//                     useGoodsStyle().goods_layout,
//                     ref.mt_25,
//                     ref.mr_11
//                 ]
//             }
//         })
//     }
// })
// const user =  useUserStyle()
// console.log(user.user_layout);
// console.log(goods.goods_layout);
// console.log(app.config.globalProperties.Style.pt_30);
// console.log(app.config.globalProperties.Style.apply_good);
// console.log(app.config.globalProperties.Style.goods_layout);
// .zz;



