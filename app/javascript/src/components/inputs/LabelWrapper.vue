<template>
  <label :class="labelClass" :for="forAttribute">
    <span :class="textClass">
      <slot name="icon"></slot>
      {{ labelText }}
      <slot name="required">
        <span v-if="isRequired" :style="'color: red;'">*</span>
      </slot>
    </span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  labelText: string;
  textClass: string;
  forAttribute: string;
  labelClass: string;
  isRequired: boolean;
}>(), {
  labelClass: 'block',
  isRequired: false
});
</script>

<style scoped></style>
