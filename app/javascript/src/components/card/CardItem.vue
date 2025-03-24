<template>
  <div :class="wrapperClass">
    <slot name="close-button" v-bind="item"></slot>
    <slot v-bind="item">{{ item }}</slot>
  </div>
</template>

<script lang="ts" setup generic="T">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ wrapperClass: string | undefined; item: T }>(),
  {
    wrapperClass: "",
  },
);

const keys = computed(() => Object.keys(props.item as object));
</script>
