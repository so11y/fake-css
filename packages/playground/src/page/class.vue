<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup(){
    }
});
</script>

<template>
  <div :class="[css.mt_30]">
    <div>
      <div>you can use inside global register arg front class</div>
      <div>can open F12 see</div>
    </div>
    <div :class="[css.pt_30]">:class="[css.pt_30]"</div>
    <div :class="[css.pt_15]">:class="[css.pt_15]"</div>
    <hr />
    <div :class="[css.ml_20, css.mb_12]">:class="[css.ml_20,class.mb_12]"</div>
    <div :class="[css.ml_10]">:class="[css.ml_10]"</div>
  </div>
</template>
