<template>
  <span v-if="errors && errors.length > 0" :class="textClass">
    <ul>
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ errors: Array<string>; textClass: string }>(),
  {
    textClass: "text-danger text-sm w-full",
  },
);
</script>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;

  li {
    list-style: none;
  }
}
</style>
