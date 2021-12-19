<script  lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const router = useRouter();

    const pages = router.getRoutes().map((route) => ({ name: route.name }));

    return {
      pages,
    };
  },
});
</script>

<template>
  <div>
    <h1>🎇fake-css playground</h1>
    <nav>
      <template v-for="page in pages" :key="page.name">
        <router-link :class="[css.mr_10]" :to="page" v-slot="{ route }">{{
          route.name
        }}</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>
