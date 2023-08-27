<template>
  <span :class="`tooltip ${beforeClass} ${afterClass} ${position}`" :data-tip="dataTip">{{ content }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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

const beforeClass = computed(() => {
  return `before:bg-info before:text-white`
})

const afterClass = computed(() => {
  switch (props.position) {
    case 'top':
      return `after:border-transparent after:border-t-info`;
    case 'bottom':
      return `after:border-transparent after:border-b-info`;
    case 'left':
      return `after:border-transparent after:border-l-info`;
    case 'right':
      return `after:border-transparent after:border-r-info`;
  }
});

</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  width: fit-content;

  &.left:hover {
    &::before {
      opacity: 1;
      visibility: visible;
      top: -25%;
      right: 106%;
    }
 
    &::after {
      opacity: 1;
      content: "";
      visibility: visible;
      top: 25%;
      left: 0%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
    }
  }
  &.right:hover {
    &::before {
      visibility: visible;
      top: -50%;
      left: 105%;
    }
    &::after {
      content: "";
      visibility: visible;
      left: 99%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
    }
  }
  &.top:hover {
    &::before {
      visibility: visible;
      bottom: 100%;
      left: 50%;
      margin-left: -60px;
    }

    &::after {
      content: "";
      visibility: visible;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
    }
  }
  &.bottom:hover {
    &::before {
      visibility: visible;
      width: 200px;
      top: 100%;
      left: 50%;
      margin-left: -60px;
    }

    &::after {
      content: "";
      visibility: visible;
      top: 60%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
    }
  }
  &::before {
    content: attr(data-tip);
    visibility: hidden;
    width: 200px;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }
  &::after {
    visibility: hidden;
    z-index: 1;
    position: absolute;
  }
}

</style>