<template>
  <label :class="labelClass" :for="forAttribute">
    <span :class="textClass">{{ labelText }}</span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  labelText: string;
  textClass: string;
  forAttribute: string;
  labelClass: string;
}>(), {
  labelClass: 'block'
});
</script>

<style scoped></style>
