<template>
  <div>
    <slot name="prev-button"></slot>
    <div class="holster">
      <div :class="className" :style="{ width, height, 'line-height': height }">
        <slot></slot>
      </div>
      <slot name="description"></slot>
      <slot name="caption"></slot>
      <slot name="selected-item"></slot>
    </div>
    <slot name="next-button"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    direction: "x" | "y";
    snapType: "mandatory" | "proximity";
    width: number;
    height: number;
  }>(),
  {
    direction: "x",
    snapType: "mandatory",
    width: 320,
    height: 240,
  },
);

const height = computed(() => {
  return props.height + "px";
});

const width = computed(() => {
  return props.width + "px";
});

const className = computed(() => {
  const snapType = () => {
    switch (props.snapType) {
      case "mandatory":
        return "mandatory-scroll-snapping";
      case "proximity":
        return "proximity-scroll-snapping";
      default:
        return "";
    }
  };

  return `carousel-container ${props.direction} ${snapType()}`;
});
</script>

<style lang="scss">
.holster {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column nowrap;
}
</style>
