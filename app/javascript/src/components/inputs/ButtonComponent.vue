<template>
  <button 
    :disabled="isDisabled"
    :type="buttonType"
    :class="buttonClass"
    @click="onClick"
  >
    <slot name="icon"></slot>
    <slot name="text">Button</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonProps = {
  isDisabled: boolean,
  buttonType: "submit" | "button",
  textClass: string,
  backgroundClass: string,
  disabledClass: string
};

const props = withDefaults(defineProps<ButtonProps>(), {
  isDisabled: false,
  buttonType: "button",
  textClass: 'text-white',
  backgroundClass: 'btn',
  disabledClass: 'cursor-not-allowed'
})

const buttonClass = computed(() => {
  const { isDisabled , backgroundClass, textClass, disabledClass} = props;
  return `${textClass} ${isDisabled ? `${backgroundClass} ${disabledClass}` : backgroundClass}`;
})

const emit = defineEmits<{
  (e: 'buttonClicked'): void
}>()

const onClick = () => {
  if(props.buttonType === 'button') {
    emit('buttonClicked')
  }
}

</script>

<style scoped>

</style>