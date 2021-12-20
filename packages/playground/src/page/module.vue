<script  lang="ts">
import { defineComponent } from "vue";
import userModule from "../crab-module/module1";

export default defineComponent({
  setup() {
    const [userClass,userStyle] = userModule;
    const css = userClass();
    const style = userStyle();

    return {
      css,
      style
    };
  },
});
</script>

<template>
  <div :class="[css.user_layout]">module</div>

  <div :style="[style.user_layout]">module</div>
</template>
