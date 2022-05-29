<script  lang="ts">
import { defineComponent, ref } from "vue";
import { useCounter, pp } from "../counter";
export default defineComponent({
  components: {},
  setup() {
    const ppx = ref("ppx");
    const v = useCounter();
    return {
      v,
      pp,
      ppx
    };
  },
});
</script>

<template>
  <div :style="[style.mt_30]">
    NN:{{ v.n }}
    pp:{{ pp }}
    ppx:{{ ppx }}
    <div>
      <div>you can use inside global register arg front style</div>
      <div>can open F12 see</div>
    </div>

    <div :style="[style.pt_30]">:style="[style.pt_30]"</div>
    <div :style="[style.pt_15]">:style="[style.pt_15]"</div>
    <hr />
    <div :style="[style.ml_20, style.mb_12]">
      :style="[style.ml_20,style.mb_12]"
    </div>
    <div :style="[style.ml_10]">:style="[style.ml_10]"</div>
  </div>
</template>
