<script  lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const dynamicCss = ref("pl_5");
    return {
      dynamicCss,
    };
  },
});
</script>

<template>
  <div :class="[css.mt_30]">
    <div :style="[style[dynamicCss], css.mt_15, css.mb_15]">
      dynamicStyleKey --> :style="style[dynamicCss]"
    </div>

    <div :class="[css[dynamicCss], css.mt_15, css.mb_15]">
      dynamicClassNameKey --> :class="css[dynamicCss]"
    </div>

    <button @click="dynamicCss = 'pl_100'">set dynamicCss</button>
  </div>
</template>
