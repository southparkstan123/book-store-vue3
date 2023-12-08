<template>
  <div class="min-h-screen flex items-center justify-center">
    <LoadingComponent
      class="text-3xl text-primary"
      :text="'Oops! No Found!'"
      :animationType="'wavy'"
    />
  </div>
</template>

<script setup lang="ts">
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
</script>

<style scoped></style>
