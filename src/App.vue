<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.ts';
import type { User } from '@/models/user';

const store = useUserStore();

onMounted(() => {
  initUser();
});

function initUser() {
  try {
    const raw = localStorage.getItem('user');

    if (!raw) {
      store.setUser(createEmptyUser());
      return;
    }

    const parsed = JSON.parse(raw);

    if (
      typeof parsed.name === 'string' &&
      typeof parsed.age === 'number' &&
      Array.isArray(parsed.children)
    ) {
      store.setUser(parsed as User);
    } else {
      throw new Error('Invalid structure');
    }
  } catch (error) {
    store.clearUser();
    store.setUser(createEmptyUser());
  }
}

function createEmptyUser(): User {
  return {
    name: '',
    age: NaN,
    children: [],
  };
}
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
