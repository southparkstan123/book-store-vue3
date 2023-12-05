<template>
  <div class="tooltip">
    <slot></slot>
    <div
      :class="`tooltiptext ${position} ${backgroundClass} ${textClass} ${afterClass}`"
    >
      <span>{{ dataTip }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TooltipProps = {
  position: "top" | "bottom" | "left" | "right";
  backgroundClass: string;
  textClass: string;
  dataTip: string;
};

const props = withDefaults(defineProps<TooltipProps>(), {
  position: "top",
  backgroundClass: "bg-primary",
  textClass: "text-white",
  dataTip: "Hover",
});

const afterClass = computed(() => {
  switch (props.position) {
    case "top":
      return `after:border-transparent after:border-t-primary`;
    case "bottom":
      return `after:border-transparent after:border-b-primary`;
    case "left":
      return `after:border-transparent after:border-l-primary`;
    case "right":
      return `after:border-transparent after:border-r-primary`;
  }
});
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;

  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
  .tooltiptext {
    visibility: hidden;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s;

    &.bottom {
      top: 150%;
      left: 50%;
      margin-left: -60px;

      &::after {
        content: " ";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
      }
    }

    &.top {
      bottom: 150%;
      left: 50%;
      margin-left: -60px;

      &::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
      }
    }

    &.left {
      top: -5px;
      right: 110%;

      &::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
      }

      span {
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }

    &.right {
      top: -5px;
      left: 110%;

      &::after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
      }

      span {
        overflow: hidden;
        text-overflow: clip;
        white-space: pre;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
