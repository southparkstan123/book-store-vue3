<template>
  <span :style="{ height, width: computedWidth }" class="skeleton-box"></span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    maxWidth: number;
    minWidth: number;
    height: string;
    width: string | null;
  }>(),
  {
    maxWidth: 100,
    minWidth: 80,
    height: "1em",
    width: null,
  },
);

const computedWidth = computed<string>(
  () =>
    props.width ||
    `${Math.floor(
      Math.random() * (props.maxWidth - props.minWidth) + props.minWidth,
    )}%`,
);
</script>

<style scoped lang="scss">
.skeleton-box {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
