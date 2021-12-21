
<style >
    .tvv{
        transition: background .3s ;
    }
</style>

<script  lang="ts">
import { defineComponent } from "vue";
import { patch } from "../../../fake-css/src/fakeCss";

export default defineComponent({
  setup() {
    return {
      setPatch() {
        patch((ref) => {
          ref.buttonAcitveBg = { "background-color": "#999" };

          setTimeout(()=>{
                ref.buttonAcitveBg = ref.bg_blue;
          },500)
        });
      },
    };
  },
});
</script>

<template>
  <div :class="[css.buttonAcitveBg, css.h_100,css.mt_30,css.mb_30,'tvv']" >
  </div>

  <button @click="setPatch">set register value</button>
</template>
