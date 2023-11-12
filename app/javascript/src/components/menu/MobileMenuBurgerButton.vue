<template>
  <div class="button" @click="open">
    <slot> Open </slot>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ e; openMenu }>();
const open = () => emits("openMenu");
</script>

<style scoped>
.button {
  position: fixed;
  cursor: pointer;
  z-index: 10;
}
</style>
