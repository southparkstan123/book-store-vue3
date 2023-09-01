<template>
  <div v-for="(item, index) in data" v-if="data && data.length > 0"> 
    <slot v-bind="{ item , index }"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{data: unknown[]}>()
</script>

<style scoped>

</style>