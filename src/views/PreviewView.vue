<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore.ts';
import { pluralizeYear } from '@/utils/pluralize.ts';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);

function formatNameAndAge(name?: string, age?: number): string {
  if (!name) return '';

  if (!age || age <= 0) return name;

  return `${name}, ${age} ${pluralizeYear(age)}`;
}
</script>

<template>
  <div>
    <div v-if="user?.name" class="preview-page">
      <div class="preview-section">
        <div class="preview-section__title paragraph-2-medium color-black">
          Персональные данные
        </div>
        <div class="preview-person">
          {{ formatNameAndAge(user.name, user.age) }}
        </div>
      </div>

      <div class="preview-section">
        <div class="preview-section__title paragraph-2-medium color-black">
          Дети
        </div>
        <div v-if="user.children.length" class="preview-children">
          <div
            v-for="(child, index) in user.children"
            :key="index"
            class="preview-person preview-person__child"
          >
            {{ formatNameAndAge(child.name, child.age) }}
          </div>
        </div>
        <div v-else class="preview-empty paragraph-3 color-black">
          Нет данных о детях
        </div>
      </div>
    </div>

    <div v-else class="preview-page preview-empty paragraph-3 color-black">
      Нет данных о пользователе
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.preview-page {
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  max-width: 616px;
  margin: 0 auto;
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-children {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-person {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: fit-content;

  &__child {
    padding: 0.6rem 1.25rem;
    background-color: $color-gray-l;
    border-radius: 5px;
  }
}
</style>
