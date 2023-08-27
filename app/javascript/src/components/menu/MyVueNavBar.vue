<template>
  <div v-on-resize="{ breakpoint, action: onChangeView }">
    <DesktopMenu v-if="!isMobileView" :backgroundClass="backgroundClass">
      <template #brand>
        <slot name="brand"></slot>
      </template>
      <template #body-content>
        <slot name="body-content"></slot>
      </template>
      <template #footer-content>
        <slot name="footer-content"></slot>
      </template>
    </DesktopMenu>
    <MobileMenu
      v-if="isMenuOpen && isMobileView"
      :isMenuOpen="isMenuOpen"
      @showMenuContent="onShowMenuContent"
      :showMenuContent="showMenuContent"
      @closeMenu="closeMenu"
      :backgroundClass="backgroundClass"
      :width="mobileMenuWidth"
    >
      <template #brand>
        <slot name="brand"></slot>
      </template>
      <template #body-content>
        <slot name="body-content"></slot>
      </template>
      <template #footer-content>
        <slot name="footer-content"></slot>
      </template>
      <template #close-button>
        <slot name="close-button"></slot>
      </template>
    </MobileMenu>
    <Transition :appear="true" :duration="1500" name="open-button">
      <MobileMenuBurgerButton
        v-if="!isMenuOpen && isMobileView"
        @openMenu="openMenu"
      >
        <slot name="open-button"></slot>
      </MobileMenuBurgerButton>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import MobileMenu from "@/components/menu/MobileMenu.vue";
import MobileMenuBurgerButton from "@/components/menu/MobileMenuBurgerButton.vue";
import DesktopMenu from "@/components/menu/DesktopMenu.vue";
import isValidColorValue from "@/utils/isValidColorValue";

export default defineComponent({
  components: {
    MobileMenu,
    MobileMenuBurgerButton,
    DesktopMenu,
  },
  props: {
    backgroundClass: {
      type: String,
      default: 'bg-navbar',
    },
    breakpoint: {
      type: Number,
      default: 1024,
    },
    percentageOfWidthOfMoblieMenu: {
      type: Number,
      default: 100,
      validator: (value: number) => value <= 100 && value >= 10,
    },
  },
  setup(props, context) {
    const windowWidth = ref<number>(0);
    const isMobileView = ref<boolean>(false);

    const isMenuOpen = ref<boolean>(false);
    const showMenuContent = ref<boolean>(false);

    const closeMenu = () => {
      setTimeout(() => {
        isMenuOpen.value = false;
        context.emit("bodyScrollLock", false);
      }, 300);
    };

    const openMenu = () => {
      setTimeout(() => {
        isMenuOpen.value = true;
        context.emit("bodyScrollLock", true);
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

    const mobileMenuWidth = computed<string>(() => {
      const width =
        (props.percentageOfWidthOfMoblieMenu / 100) * windowWidth.value;
      return width.toString() + "px";
    });

    return {
      windowWidth,
      isMobileView,
      mobileMenuWidth,
      openMenu,
      closeMenu,
      onChangeView,
      onShowMenuContent,
      isMenuOpen,
      showMenuContent,
    };
  },
  directives: {
    "on-resize": (el, binding) => {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const windowWidth = entry.contentRect.width;
          const isMobileView =
            entry.contentRect.width < binding.value.breakpoint;
          binding.value.action({ isMobileView, windowWidth });
        });
      });
      resizeObserver.observe(document.body);
    },
  },
});
</script>

<style scoped></style>
