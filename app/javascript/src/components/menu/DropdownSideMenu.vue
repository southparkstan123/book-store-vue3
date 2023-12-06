<template>
  <div
    :class="wrapperClass"
    v-click-outside="{ action: () => (isOpenFooterMenu = false) }"
  >
    <ButtonComponent
      :buttonType="'button'"
      :textClass="buttonClass"
      :backgroundClass="wrapperClass"
      :onButtonClicked="toggleFooterMenu"
    >
      <template #text>
        <slot name="button" :isOpenFooterMenu="isOpenFooterMenu"></slot>
      </template>
    </ButtonComponent>
    <Transition
      :appear="true"
      :name="isAnimated === true ? 'dropdown-menu' : 'none'"
    >
      <slot name="content" :isOpenFooterMenu="isOpenFooterMenu"></slot>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";

const props = withDefaults(
  defineProps<{
    wrapperClass: string;
    buttonClass: string;
    isAnimated: boolean;
  }>(),
  {
    wrapperClass: "",
    buttonClass: "",
    isAnimated: false,
  },
);
const isOpenFooterMenu = ref<boolean>(false);

const toggleFooterMenu = () => {
  isOpenFooterMenu.value = !isOpenFooterMenu.value;
};
</script>

<style scoped>
.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.dropdown-menu-enter-from {
  transform: translateY(-20%);
  opacity: 0;
}

.dropdown-menu-leave-to {
  transition-delay: 0.3s;
  transform: translateY(-20%);
  opacity: 0;
}
</style>
