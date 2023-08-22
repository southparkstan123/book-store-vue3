<template>
  <div class="content">
    <slot name="button"></slot>
    <div class="items">
      <slot name="brand"></slot>
      <slot name="body-content"></slot>
    </div>
    <div class="items">
      <slot name="footer-content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped lang="scss">
.content {
  height: 100vh;
  width: 100%;
  .items {
    :deep(a) {
      display: block;
      text-decoration: none;
      text-align: center;
      font-size: 1.5rem;
      margin: 0.75rem 0;
    }
  }
}
</style>
