<template>
  <div class="tooltip">
    <slot></slot>
    <span :class="`tooltiptext ${position}`">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
type TooltipProps = {
  position: 'top' | 'bottom' | 'left' | 'right';
  content: string | undefined;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  content: 'Hover'
})
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  width: fit-content;

  &:hover {
    .tooltiptext {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;
    }
  }

  .tooltiptext {
    visibility: hidden;
    opacity: 0;
    width: 120px;
    background-color: rgb(178, 83, 181);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    position: absolute;
    z-index: 1;

    &.top {
      bottom: 100%;
      left: 50%;
      margin-left: -60px;
    }

    &.right {
      top: -50%;
      left: 105%;
    }

    &.bottom {
      width: 120px;
      top: 100%;
      left: 50%;
      margin-left: -60px;
    }

    &.left {
      top: -5px;
      right: 105%;
    }

  }
}

</style>