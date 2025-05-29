<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore.ts';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);
</script>

<template>
  <div>
    <div v-if="user?.name">
      <div>
        {{ user.name }}
        {{ user.age > 0 ? `, ${user.age}` : '' }}
      </div>
      <div v-if="user.children.length">
        Children:
        <div v-for="(child, index) in user.children" :key="index">
          {{ child.name }}
          {{ child.age > 0 ? `, ${child.age}` : '' }}
        </div>
      </div>
    </div>

    <div v-else>Нет данных</div>
  </div>
</template>

<style lang="scss" scoped></style>
