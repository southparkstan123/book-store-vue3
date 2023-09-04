<template>
  <div :class="wrapperClass">
    <slot name="close-button"></slot>
    <slot v-bind="item">{{ item }}</slot>
  </div> 
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type ItemProps = {
  [key: string]: unknown
}

const props = withDefaults(defineProps<{wrapperClass: string | undefined; item: ItemProps}>(), {
  wrapperClass: ''
})

const keys = computed(() => Object.keys(props.item));
</script>
