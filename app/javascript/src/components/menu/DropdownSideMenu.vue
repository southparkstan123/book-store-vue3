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
        <span class="inline lg:float-none float-left">
          <slot name="button"></slot>
        </span>
        <span class="inline float-right pl-2">
          <font-awesome-icon
            :icon="`fa-solid ${
              isOpenFooterMenu ? 'fa-caret-up' : 'fa-caret-down'
            }`"
          />
        </span>
      </template>
    </ButtonComponent>
    <Transition
      :appear="true"
      :name="isAnimated === true ? 'dropdown-menu' : 'none'"
    >
      <div
        v-if="isOpenFooterMenu === true"
        class="lg:fixed lg:grid lg:mt-3 lg:pt-1 bg-navbar-submenu lg:w-40 block float-left px-4 my-2 w-full"
        :class="isFloatRight === true ? 'right-0' : ''"
      >
        <slot name="content" :isOpenFooterMenu="isOpenFooterMenu"></slot>
      </div>
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
    isFloatRight: boolean;
  }>(),
  {
    wrapperClass: "",
    buttonClass: "",
    isAnimated: false,
    isFloatRight: false,
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
