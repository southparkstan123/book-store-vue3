<template>
  <div class="content">
    <slot name="button"></slot>

    <slot name="brand"></slot>
    <div class="items">
      <slot name="body-content"></slot>
    </div>
    <div class="items">
      <slot name="footer-content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.content {
  height: 100vh;
  width: 100%;
  overflow: scroll;
  .items {
    :deep(a) {
      display: block;
      text-decoration: none;
      font-size: 1.5rem;
      margin: 0.75rem 1rem;
    }
  }
}
</style>
