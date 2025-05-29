<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="header">
    <img alt="Alef Logo" class="logo" src="@/assets/images/alef-logo.png" />

    <nav class="nav">
      <RouterLink
        :class="{ active: route.path === '/' }"
        class="nav__link paragraph-2 gray-color"
        to="/"
      >
        Форма
      </RouterLink>
      <RouterLink
        :class="{ active: route.path === '/preview' }"
        class="nav__link paragraph-2 gray-color"
        to="/preview"
      >
        Превью
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  border-bottom: 1px solid $gray-color;

  @media screen and (min-width: $desktop-breakpoint) {
    height: 76px;
    flex-direction: row;
    justify-content: center;
  }

  .logo {
    width: 155px;
    height: auto;
    margin-bottom: 1rem;

    @media screen and (min-width: $desktop-breakpoint) {
      width: 175px;
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      margin-bottom: 0;
    }
  }

  .nav {
    display: flex;
    gap: 1.5rem;

    &__link {
      position: relative;
      text-decoration: none;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #333;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.active {
        color: $secondary-color;

        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
