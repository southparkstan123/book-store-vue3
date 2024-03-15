<template>
  <div
    :class="`p-5 mb-2 text-sm ${className} w-64 max-w-lg text-light rounded-md justify-end`"
  >
    <span>{{ message }}</span>
</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    message: string;
    type: "success" | "warning" | "info" | "default" | "error";
  }>(),
  {
    message: "",
    type: "default"
  },
);

const className = computed<string>(() => {
  switch (props.type) {
    case "success":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "info":
      return "bg-info";
    case "error":
      return "bg-danger";
    default:
      return "bg-dark";
  }
});

</script>

<style scoped>

</style>
