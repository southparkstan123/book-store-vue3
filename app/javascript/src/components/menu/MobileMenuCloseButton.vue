<template>
  <div class="button" @click="close">
    <slot> Close </slot>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{e; "closeMenu"}>()
const close = () => emits("closeMenu");
</script>

<style scoped>
.button {
  margin: 3px;
  cursor: pointer;
  float: right;
}
</style>
