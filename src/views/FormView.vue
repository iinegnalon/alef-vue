<script lang="ts" setup>
import { onMounted, type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.ts';
import type { User } from '@/models/user.ts';
import type { Person } from '@/models/person.ts';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const userStore = useUserStore();
const router = useRouter();

const user: Ref<User> = ref({ name: '', age: NaN, children: [] });
const children: Ref<Person[]> = ref([]);
const valid: Ref<boolean> = ref(true);

onMounted(() => {
  initUser();
});

function initUser() {
  if (!userStore.user) {
    return;
  }

  const childrenCopy = userStore.user.children.map((child) => ({
    name: child.name,
    age: child.age,
  }));

  user.value = {
    name: userStore.user.name,
    age: userStore.user.age,
    children: childrenCopy,
  };
  children.value = childrenCopy;
}

function addChild() {
  if (children.value.length < 5) {
    children.value.push({ name: '', age: NaN });
  }
}

function removeChild(index: number) {
  children.value.splice(index, 1);
}

function save() {
  if (!validateUser()) {
    return;
  }

  userStore.setUser({
    name: user.value.name,
    age: Number(user.value.age),
    children: children.value.map((c) => ({
      name: c.name,
      age: Number(c.age),
    })),
  });

  router.push('/preview');
}

function validateUser() {
  valid.value = !!user.value.name && !!user.value.age;

  return valid.value;
}
</script>

<template>
  <div class="form-page">
    <div class="form-section form-section_user">
      <div class="form-section__header">
        <div class="form-section__title paragraph-2-medium color-black">
          Персональные данные
        </div>
      </div>

      <div class="form-section__inputs">
        <BaseInput
          v-model="user.name"
          :error="!valid && !user.name ? 'Пожалуйста, укажите имя' : false"
          label="Имя"
          placeholder="Введите имя"
        />
        <BaseInput
          v-model="user.age"
          :error="!valid && !user.age ? 'Пожалуйста, укажите возраст' : false"
          label="Возраст"
          placeholder="Введите возраст"
          type="number"
        />
      </div>
    </div>

    <div class="form-section form-section_children">
      <div class="form-section__header">
        <div class="form-section__title paragraph-2-medium color-black">
          Дети (макс. 5)
        </div>

        <BaseButton
          :disabled="children.length >= 5"
          variant="outlined"
          @click="addChild"
        >
          <template #icon>
            <IconPlus />
          </template>
          Добавить ребенка
        </BaseButton>
      </div>

      <div v-if="children.length" class="form-children">
        <div v-for="(child, index) in children" :key="index" class="form-child">
          <BaseInput
            v-model="child.name"
            class="form-child__input"
            label="Имя"
            placeholder="Введите имя"
          />
          <BaseInput
            v-model="child.age"
            class="form-child__input"
            label="Возраст"
            placeholder="Введите возраст"
            type="number"
          />
          <BaseButton variant="text" @click="removeChild(index)">
            Удалить
          </BaseButton>
        </div>
      </div>
      <div v-else class="paragraph-3 color-black">
        Нажмите на кнопку "Добавить ребенка" чтобы указать информацию о детях
      </div>
    </div>

    <BaseButton class="form-save-button" @click="save">Сохранить</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.form-page {
  display: flex;
  flex-direction: column;
  max-width: 616px;
  margin: 0 auto;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.75rem;

  &_children {
    margin-bottom: 1.9rem;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: $breakpoint-tablet) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
}

.form-children {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-child {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: $breakpoint-desktop) {
    flex-direction: row;
    padding-bottom: 0 !important;
    border-bottom: none !important;
  }

  &:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px solid $color-gray;
  }

  &:not(:first-child) {
    padding-top: 0.75rem;
  }

  &__input {
    @media screen and (min-width: $breakpoint-desktop) {
      width: 100%;
    }
  }
}

.form-save-button {
  align-self: center;

  @media screen and (min-width: $breakpoint-tablet) {
    align-self: flex-start;
  }
}
</style>
