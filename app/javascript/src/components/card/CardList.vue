<template>
  <div :class="wrapperClass">
    <div v-for="(item, index) in data" v-if="data && data.length > 0"> 
      <slot v-bind="{ item , index }"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{data: unknown[]; wrapperClass: string}>(),{
  data: () => [],
  wrapperClass: ''
})

</script>

<style scoped>

</style>