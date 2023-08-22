<template>
  <label class="block" :for="forAttribute">
    <span :class="textClass">{{ labelText }}</span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  labelText: string, 
  textClass: string, 
  forAttribute: string
}>()
</script>

<style scoped>

</style>