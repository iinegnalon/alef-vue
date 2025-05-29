<script lang="ts" setup>
import BaseInput from '@/components/common/BaseInput.vue';
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const test = ref('');

function handleClick() {
  console.log('clek');
}
</script>

<template>
  <div>
    <BaseInput v-model="test" label="Имя" placeholder="Ваше имя" />

    <BaseButton @click="handleClick">Сохранить</BaseButton>

    <BaseButton disabled @click="handleClick">Сохранить</BaseButton>

    <BaseButton @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Сохранить
    </BaseButton>

    <BaseButton disabled @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Сохранить
    </BaseButton>

    <BaseButton variant="outlined" @click="handleClick">
      Добавить ребенка
    </BaseButton>

    <BaseButton disabled variant="outlined" @click="handleClick">
      Добавить ребенка
    </BaseButton>

    <BaseButton variant="outlined" @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Добавить ребенка
    </BaseButton>

    <BaseButton disabled variant="outlined" @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Добавить ребенка
    </BaseButton>

    <BaseButton variant="text" @click="handleClick">Удалить</BaseButton>

    <BaseButton disabled variant="text" @click="handleClick">
      Удалить
    </BaseButton>

    <BaseButton variant="text" @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Удалить
    </BaseButton>

    <BaseButton disabled variant="text" @click="handleClick">
      <template #icon>
        <IconPlus />
      </template>

      Удалить
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped></style>
