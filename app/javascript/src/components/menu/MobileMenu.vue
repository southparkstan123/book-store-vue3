<template>
  <Transition :duration="1000" :appear="true" name="menu">
    <div class="overlay" @click="clickOutsideMenu" v-if="showMenuContent">
      <div :class="`inner ${backgroundClass}`" :style="{ width }">
        <MobileMenuBody>
          <template #button>
            <MobileMenuCloseButton @closeMenu="closeMenu" class="close">
              <slot name="close-button"></slot>
            </MobileMenuCloseButton>
          </template>

          <template #body-content>
            <div class="brand">
              <slot name="brand"></slot>
            </div>
            <div class="body">
              <slot name="body-content"></slot>
            </div>
          </template>

          <template #footer-content>
            <div class="footer">
              <slot name="footer-content"></slot>
            </div>
          </template>
        </MobileMenuBody>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import MobileMenuCloseButton from "@/components/menu/MobileMenuCloseButton.vue";
import MobileMenuBody from "@/components/menu/MobileMenuBody.vue";

withDefaults(
  defineProps<{
    backgroundClass: string;
    width: string;
    showMenuContent: boolean;
  }>(),
  {
    backgroundClass: "",
    width: "100%",
    showMenuContent: false,
  },
);

const emit = defineEmits<{
  (e: "showMenuContent", payload: boolean): void;
  (e: "closeMenu"): void;
}>();

const closeMenu = () => {
  emit("showMenuContent", false);
  emit("closeMenu");
};

const clickOutsideMenu = (event: any) => {
  if (event.target.className === "overlay") {
    closeMenu();
  }
};

emit("showMenuContent", true);
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 50;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.brand {
  margin-left: auto;
  margin-bottom: auto;
  padding: 0.75rem 0 0.25rem;

  :deep(*) {
    text-align: center;
  }
}

.body {
  clear: both;
  width: 100%;
  overflow: scroll;
  min-height: 50vh;
  height: 55vh;
}

.footer {
  width: 100%;
  overflow: scroll;
  min-height: 10vh;
  height: 25vh;
}

// Outside
.menu-enter-active,
.menu-leave-active {
  transition: all 1s ease-in-out;
}

.menu-leave-active {
  transition-delay: 0.5s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

// Inside
.menu-enter-active .inner,
.menu-leave-active .inner {
  transition: all 1s ease-in-out;
}

.menu-enter-active .inner {
  transition-delay: 0s;
}

.menu-leave-to .inner {
  transform: translateX(-100%);
}

.menu-enter-from .inner {
  transform: translateX(-100%);
}
</style>
