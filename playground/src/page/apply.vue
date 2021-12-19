<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<template>
  <div :class="[css.mt_30]">
    <div>if you use apply group</div>

    <div :style="[style.apply_m15]">:style="[style.apply_m15]"</div>
    <div :class="[css.apply_m15]">:class="[css.apply_m15]"</div>
  </div>
</template>
