<script  lang="ts">
import { App, createApp, defineComponent, nextTick, ref, watch } from "vue";
import { code22, scriptStart, scriptEnd } from "./xxx";
// import {
//   App,
//   createApp,
//   defineComponent,
//   nextTick,
//   ref,
//   watch,
// } from "vue/dist/vue.esm-bundler.js";
export default defineComponent({
  setup() {
    // const router = useRouter();

    // const pages = router.getRoutes().map((route) => ({ name: route.name }));

    const v = ref(code22);
    watch(
      v,
      () => {
        const templateStart = v.value.indexOf("<template>");
        const templateEnd = v.value.indexOf("</template>");
        const htmlCode = v.value.slice(templateStart + 10, templateEnd);
        const scriptStart1 = v.value.indexOf(scriptStart);
        const scriptEnd1 = v.value.indexOf(scriptEnd);
        const scriptCode = v.value
          .slice(scriptStart1 + 8, scriptEnd1)
          .replace("export default", "");

        try {
          const scriptEl = document.createElement("script");
          scriptEl.setAttribute("type", "module");
          scriptEl.title = "ccc";
          let beforeScript = document.querySelector("script[title='ccc']");
          if (beforeScript) {
            beforeScript.remove();
          }
          scriptEl.innerHTML = `
             import {  createApp, defineComponent, nextTick, ref, watch } from "vue";
              const app = createApp({
                template: "${htmlCode.trim()}",
                 ...eval((function (){
                    return   ${scriptCode.trim()}
                    }()))
              });
            app.mount("#app1");
          `;
          nextTick(() => {
            document.body.appendChild(scriptEl);
          });

        } catch (e) {
          console.log(e);
        }
      },
      {
        immediate: true,
      }
    );

    return {
      //      pages,v
      v,
    };
  },
});
</script>
<template>
  <div>
    <!-- <h1>🎇fake-css playground</h1>

    <nav>
      <template v-for="page in pages" :key="page.name" >
        <router-link  :class="[css.mr_10]" :to="page" v-slot="{ route }">{{
          route.name
        }}</router-link>
      </template>
    </nav>
    <router-view />  -->
    <textarea v-model="v" id="" cols="50" rows="30"></textarea>
  </div>
</template>
