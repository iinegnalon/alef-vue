<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: string; // 'primary' | 'outlined' | 'text'
    disabled?: boolean;
    label?: string;
    type?: string;
    placeholder?: string;
  }>(),
  {
    variant: 'primary',
    disabled: false,
  },
);
</script>

<template>
  <button
    :class="[`base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    class="base-button"
  >
    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>

    <span class="base-button__label">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-button {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  outline: none;
  border: none;
  background: none;
  width: fit-content;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Primary
  &--primary {
    background-color: $color-primary;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken($color-primary, 5%);
    }
  }

  // Outlined
  &--outlined {
    border: 2px solid $color-primary;
    color: $color-primary;

    &:hover:not(:disabled) {
      background-color: rgba($color-primary, 0.05);
    }
  }

  // Text
  &--text {
    color: $color-primary;
    padding: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }
}
</style>
