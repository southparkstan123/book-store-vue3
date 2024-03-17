<template>
  <div class="tooltip">
    <slot></slot>
    <div :class="`tooltiptext ${textClass} ${position} ${afterClass} ${backgroundClass}`">
      <span>{{ dataTip }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TooltipProps = {
  position: "top" | "bottom" | "left" | "right";
  dataTip: string;
  textSize: "xs" | "sm" | "md" | "lg" | "xl";
  type:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "danger";
};

const props = withDefaults(defineProps<TooltipProps>(), {
  position: "top",
  type: "primary",
  dataTip: "Hover",
  textSize: "md"
});

const afterClass = computed(() => {
  switch (props.position) {
    case "top":
      return `after:border-transparent after:border-t-${props.type}`;
    case "bottom":
      return `after:border-transparent after:border-b-${props.type}`;
    case "left":
      return `after:border-transparent after:border-l-${props.type}`;
    case "right":
      return `after:border-transparent after:border-r-${props.type}`;
  }
});

const backgroundClass = computed(() => {
  return `bg-${props.type}`;
});

const textClass = computed(() => {
  return `${(props.type !== 'warning') ? 'text-light' : 'text-dark'} text-${props.textSize}`;
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
      top: 100%;
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
      bottom: 100%;
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
