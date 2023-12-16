<template>
  <div
    :class="wrapperClass"
    v-click-outside="{ action: () => (isOpenFooterMenu = false) }"
  >
    <ButtonComponent
      :buttonType="'button'"
      :textClass="'lg:nav-main-item lg:float-none lg:px-0 lg:my-0 block float-left px-4 my-2 w-full'"
      :backgroundClass="wrapperClass"
      :onButtonClicked="toggleFooterMenu"
    >
      <template #text>
        <span class="inline lg:float-none float-left">
          <slot name="button"></slot>
        </span>
        <span v-if="showCaret" class="inline float-right pl-2">
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
        class="lg:absolute lg:grid lg:mt-3 lg:pt-1 bg-navbar-submenu lg:w-40 block float-left px-4 my-2 w-full z-50"
        :class="isFloatRight === true ? 'lg:right-0 lg:text-right' : ''"
      >
        <slot name="content" :isOpenFooterMenu="isOpenFooterMenu"></slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";

const props = withDefaults(
  defineProps<{
    isAnimated: boolean;
    isFloatRight: boolean;
    showCaret: boolean;
  }>(),
  {
    isAnimated: false,
    isFloatRight: false,
    showCaret: true
  },
);
const isOpenFooterMenu = ref<boolean>(false);

const toggleFooterMenu = () => {
  isOpenFooterMenu.value = !isOpenFooterMenu.value;
};

const wrapperClass = computed<string>(() => {
  return `lg:inline-block nav-main-item cursor-pointer ${
    props.isFloatRight === true ? "lg:px-1 relative " : ""
  }`;
});
</script>

<style scoped lang="scss">
.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 36rem;

  :deep(*) {
    transition-delay: 0.1s;
    opacity: 1;
  }
}

.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
  max-height: 0;
  
  :deep(*) {
    transition-delay: 0.1s;
    opacity: 0;
  }
}
</style>
