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
      border-color: transparent transparent transparent rgb(178, 83, 181);
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
      border-color: transparent rgb(178, 83, 181) transparent transparent;
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
      border-color: rgb(178, 83, 181) transparent transparent transparent;
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
      border-color: transparent transparent rgb(178, 83, 181) transparent;
    }
  }
  &::before {
    content: attr(data-tip);
    visibility: hidden;
    width: 200px;
    background-color: rgb(178, 83, 181);
    color: #fff;
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