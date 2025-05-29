<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
  }>(),
  {
    type: 'text',
  },
);

defineEmits(['update:modelValue']);

const inputRef = ref(null);

onMounted(() => {
  if (props.type === 'number' && inputRef.value) {
    inputRef.value.addEventListener('wheel', disableWheelScroll, {
      passive: false,
    });
  }
});

onBeforeUnmount(() => {
  if (props.type === 'number' && inputRef.value) {
    inputRef.value.removeEventListener('wheel', disableWheelScroll);
  }
});

function disableWheelScroll(event) {
  event.preventDefault();
}

function handleKeydown(event) {
  if (props.type !== 'number') {
    return;
  }

  const invalidKeys = ['e', 'E', '+', '-'];
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}
</script>

<template>
  <label class="base-input">
    <span v-if="label" class="base-input__label paragraph-3 gray-color">
      {{ label }}
    </span>
    <input
      :id="id"
      ref="inputRef"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="base-input__field paragraph-2 black-color"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown="handleKeydown"
    />
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border: 1px solid $gray-l-color;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: white;
  cursor: text;
  transition: 0.3s ease;

  &__field {
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 1.5;
    font-family: inherit;
    padding: 0;
    background-color: transparent;

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::placeholder {
      color: $gray-s-color;
    }
  }

  &:focus-within {
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
  }
}
</style>
