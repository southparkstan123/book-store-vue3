<template>
  <div :class="wrapperClass">
    <a
      :class="buttonClass"
      @click="toggleFooterMenu"
    >
      <slot name="button" :isOpenFooterMenu="isOpenFooterMenu"></slot>
    </a>
    <Transition :appear="true" :name="(isAnimated === true) ? 'dropdown-menu' : 'none'">
      <slot name="content" :isOpenFooterMenu="isOpenFooterMenu"></slot>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(defineProps<{
  wrapperClass: string;
  buttonClass: string;
  isAnimated: boolean;
}>(), {
  wrapperClass: "",
  buttonClass: "",
  isAnimated: false
})
const isOpenFooterMenu = ref<boolean>(false);

const toggleFooterMenu = () => {
  isOpenFooterMenu.value = !isOpenFooterMenu.value
}
</script>

<style scoped>
.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
  transform: translateY(-20%);
  opacity: 0;
}
</style>