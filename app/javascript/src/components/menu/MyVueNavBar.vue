<template>
  <div v-on-resize="{ breakpoint, action: onChangeView }">
    <DesktopMenu v-if="!isMobileView" :backgroundClass="backgroundClass">
      <template #brand>
        <slot name="brand"></slot>
      </template>
      <template #body-content>
        <slot name="body-content" :isMobileView="isMobileView"></slot>
      </template>
      <template #footer-content>
        <slot name="footer-content" :isMobileView="isMobileView"></slot>
      </template>
    </DesktopMenu>
    <MobileMenu
      v-if="isMenuOpen && isMobileView"
      :isMenuOpen="isMenuOpen"
      @showMenuContent="onShowMenuContent"
      :showMenuContent="showMenuContent"
      @closeMenu="closeMenu"
      :backgroundClass="backgroundClass"
      :width="'200px'"
    >
      <template #brand>
        <slot name="brand"></slot>
      </template>
      <template #body-content>
        <slot name="body-content" :isMobileView="isMobileView"></slot>
      </template>
      <template #footer-content>
        <slot name="footer-content" :isMobileView="isMobileView"></slot>
      </template>
      <template #close-button>
        <slot name="close-button"></slot>
      </template>
    </MobileMenu>
    <Transition :appear="true" :duration="1500" name="open-button">
      <MobileMenuBurgerButton
        v-if="!isMenuOpen && isMobileView"
        @openMenu="openMenu"
        :style="`z-index:40;`"
      >
        <slot name="open-button"></slot>
      </MobileMenuBurgerButton>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import MobileMenu from "@/components/menu/MobileMenu.vue";
import MobileMenuBurgerButton from "@/components/menu/MobileMenuBurgerButton.vue";
import DesktopMenu from "@/components/menu/DesktopMenu.vue";

withDefaults(
  defineProps<{ backgroundClass: string; breakpoint: number }>(),
  {
    backgroundClass: "bg-navbar",
    breakpoint: 1024,
  },
);

const windowWidth = ref<number>(0);
const isMobileView = ref<boolean>(false);

const isMenuOpen = ref<boolean>(false);
const showMenuContent = ref<boolean>(false);

const emit = defineEmits<{
  (e: "bodyScrollLock", payload: boolean): void;
  (e: "closeMenu"): void;
}>();

const closeMenu = () => {
  setTimeout(() => {
    isMenuOpen.value = false;
    emit("bodyScrollLock", false);
  }, 300);
};

const openMenu = () => {
  setTimeout(() => {
    isMenuOpen.value = true;
    emit("bodyScrollLock", true);
  });
};

const onShowMenuContent = (payload: boolean) => {
  showMenuContent.value = payload;
};

watch(
  () => isMobileView.value,
  (newValue: boolean) => {
    if (!newValue && isMenuOpen.value) {
      closeMenu();
    }
  },
);

const onChangeView = (payload) => {
  windowWidth.value = payload.windowWidth;
  isMobileView.value = payload.isMobileView;
};

const vOnResize = (el, binding) => {
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const windowWidth = entry.contentRect.width;
      const isMobileView = entry.contentRect.width < binding.value.breakpoint;
      binding.value.action({ isMobileView, windowWidth });
    });
  });
  resizeObserver.observe(document.body);
};
</script>

<style scoped></style>
