<template>
  <nav :class="backgroundClass">
    <div class="body">
      <slot name="brand"></slot>
      <slot name="body-content"></slot>
    </div>
    <div class="footer">
      <slot name="footer-content"></slot>
    </div>
  </nav>
</template>

<script setup lang="ts">
withDefaults(defineProps<{backgroundClass: string}>(),{
  backgroundClass: ''
})
</script>

<style scoped lang="scss">
nav {
  position: fixed;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.75rem 0;
  position: fixed;
  width: 100%;
  z-index: 50;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;

  div {
    &.body > :deep(*) {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      text-decoration: none;
    }

    &.items > .brand {
      display: flex;
    }
  }
}
</style>
