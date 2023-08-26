<template>
  <span :class="`tooltip ${position}`" :data-tip="dataTip">{{ content }}</span>
</template>

<script setup lang="ts">
type TooltipProps = {
  position: 'top' | 'bottom' | 'left' | 'right';
  content: string;
  dataTip: string;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  content: '',
  dataTip: 'Hover'
})
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  width: fit-content;

  &.left:hover::before {
    opacity: 1;
    visibility: visible;

    top: -5px;
    right: 105%;
  }
  &.right:hover::before {
    opacity: 1;
    visibility: visible;

    top: -50%;
    left: 105%;
  }
  &.top:hover::before {
    opacity: 1;
    visibility: visible;

    bottom: 100%;
    left: 50%;
    margin-left: -60px;
  }

  &.bottom:hover::before {
    opacity: 1;
    visibility: visible;

    width: 200px;
    top: 100%;
    left: 50%;
    margin-left: -60px;
  }

  &::before {
    content: attr(data-tip);
    visibility: hidden;
    opacity: 0;
    width: 200px;
    background-color: rgb(178, 83, 181);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    transition: opacity 0.5s;

    position: absolute;
    z-index: 1;
  }
}

</style>