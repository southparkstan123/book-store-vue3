<template>
  <fieldset :class="class">
    <legend>{{ title }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ class: string, title: string }>(), {
  class: '',
  title: ''
})
</script>

<style scoped>

</style>