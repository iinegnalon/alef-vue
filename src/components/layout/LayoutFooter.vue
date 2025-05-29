<script lang="ts" setup></script>

<template>
  <footer class="footer">
    <p class="footer__text paragraph-3 black-color">all rights reserved</p>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.footer {
  background-color: $gray-m-color;
  padding: 1.5rem;
  text-align: center;

  @media screen and (min-width: $desktop-breakpoint) {
    padding: 2rem;
  }

  .footer__text {
    margin: 0;
  }
}
</style>
