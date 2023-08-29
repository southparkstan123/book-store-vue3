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
  width: 50px;
  height: 50px;
  cursor: pointer;
  left: 398px;
  float: right;
}
</style>
