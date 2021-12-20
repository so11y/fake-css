<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>

<template>
  <div :style="[style.mt_30]">
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
