<script lang="ts" setup></script>

<template>
  <footer class="footer">
    <p class="footer__text paragraph-3 color-black">all rights reserved</p>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.footer {
  background-color: $color-gray-m;
  padding: 1.5rem;
  text-align: center;

  @media screen and (min-width: $breakpoint-tablet) {
    padding: 2rem;
  }

  .footer__text {
    margin: 0;
  }
}
</style>
