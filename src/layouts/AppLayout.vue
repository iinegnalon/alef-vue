<script lang="ts" setup>
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import LayoutFooter from '@/components/layout/LayoutFooter.vue';
</script>

<template>
  <div class="app-layout">
    <LayoutHeader />

    <main>
      <RouterView></RouterView>
    </main>

    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    padding: 1rem;

    @media screen and (min-width: $breakpoint-tablet) {
      padding: 2rem;
    }
  }
}
</style>
