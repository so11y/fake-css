
<script>
import { defineComponent, ref} from "vue";
export default defineComponent({
  setup() {

    const pd = ref('pt_11');

    const  setpd = ()=>{
      pd.value = 'pt_101'
    }
    return {
      pd,
      setpd,
    };
  },
});
</script>

<template>
  <div>


      <!-- <div :style="[CSS.apply_good,CSS[pd]]">
2
      </div> -->

        <div :class="[CSS.apply_good,CSS.column]">

      </div>

      <button @click="setpd">setpd</button>
  </div>
</template>
