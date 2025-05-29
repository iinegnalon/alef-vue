<script lang="ts" setup>
import { onBeforeUnmount, onMounted, type Ref, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: boolean | string;
  }>(),
  {
    type: 'text',
  },
);

const emit = defineEmits(['update:modelValue']);

const inputRef: Ref<HTMLInputElement | null> = ref(null);

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

function updateValue(event: Event) {
  emit('update:modelValue', event.target?.value);
}

function disableWheelScroll(event: WheelEvent) {
  event.preventDefault();
}

function handleKeydown(event: KeyboardEvent) {
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
  <div>
    <label :class="{ 'base-input--error': !!error }" class="base-input">
      <span v-if="label" class="base-input__label paragraph-3 color-gray">
        {{ label }}
      </span>

      <input
        :id="id"
        ref="inputRef"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="base-input__field paragraph-2 color-black"
        v-bind="$attrs"
        @input="updateValue"
        @keydown="handleKeydown"
      />
    </label>

    <span
      v-if="typeof error === 'string'"
      class="base-input__error paragraph-3 color-error"
    >
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border: 1px solid $color-gray-l;
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
      color: $color-gray-s;
    }
  }

  &:focus-within {
    border-color: $color-primary;
    box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
  }

  &--error {
    border-color: $color-error;

    &:focus-within {
      border-color: $color-error;
      box-shadow: 0 0 0 2px rgba($color-error, 0.2);
    }
  }

  &__error {
    margin-top: 0.25rem;
    color: $color-error;
  }
}
</style>
