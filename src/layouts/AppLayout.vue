<script lang="ts" setup>
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import LayoutFooter from '@/components/layout/LayoutFooter.vue';
</script>

<template>
  <div>
    <LayoutHeader />

    <main>
      <RouterView></RouterView>
    </main>

    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped></style>
