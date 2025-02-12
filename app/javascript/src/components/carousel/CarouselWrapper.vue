<template>
  <Transition name="carousel">
    <div
      v-if="isShowCarousel"
      class="fixed z-50"
      v-on-resize="{ action: onChangeView }"
    >
      <div class="grid grid-cols-4">
        <div class="relative col-span-4 lg:col-span-3 bg-dark">
          <slot name="close-button"></slot>
          <CarouselBody
            :items="imagesInCarousel"
            :width="sizeOfCarousel.width"
            :height="sizeOfCarousel.height"
            :preselectedIndex="preselectedIndex"
            @itemDetail="onChangeInfoInCarousel"
          >
            <template #prev-button>
              <svg class="" width="20px" height="20px">
                <path d="M20 0 L0 10 L20 20 Z" fill="wheat"></path>
              </svg>
            </template>
            <template #next-button>
              <svg class="" width="20px" height="20px">
                <path d="M0 0 L20 10 L0 20 Z" fill="wheat"></path>
              </svg>
            </template>
            <template #caption>
              <span
                class="lg:hidden absolute left-0 top-24 text-lg text-white bg-navbar-submenu bg-opacity-35"
              >
                {{ infoInCarousel.caption }}
              </span>
            </template>
            <template #selected-item>
              <slot
                name="sub-menu-header-mobile"
                :title="title"
                :infoInCarousel="infoInCarousel"
              ></slot>
            </template>
            <template #description>
              <slot
                name="sub-menu-content-mobile"
                :title="title"
                :infoInCarousel="infoInCarousel"
              ></slot>
            </template>
          </CarouselBody>
        </div>
        <div
          class="bg-navbar-submenu z-50 flex-col flex-1 h-screen hidden lg:flex"
        >
          <div
            class="border border-light border-t-0 border-l-0 border-r-0 border-b-1 p-3"
          >
            <slot
              name="sub-menu-header-desktop"
              :title="title"
              :infoInCarousel="infoInCarousel"
            >
              {{ infoInCarousel }}
            </slot>
          </div>
          <div class="px-3 my-5 text-md h-full overflow-scroll">
            <slot
              name="sub-menu-content-desktop"
              :title="title"
              :infoInCarousel="infoInCarousel"
            >
              {{ infoInCarousel }}
            </slot>
          </div>
          <div
            class="p-3 text-md items-end border border-light border-b-0 border-l-0 border-r-0 border-t-1"
          >
            <slot
              name="sub-menu-footer-desktop"
              :infoInCarousel="infoInCarousel"
            ></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ImageFile } from "@/types/types";

import debounce from "lodash.debounce";
import CarouselBody from "./CarouselBody.vue";

withDefaults(
  defineProps<{
    isShowCarousel: boolean;
    title: string;
    imagesInCarousel: ImageFile[];
    preselectedIndex: number;
  }>(),
  {
    isShowCarousel: false,
    title: "",
    imagesInCarousel: [],
    preselectedIndex: 1,
  },
);

const infoInCarousel = ref<ImageFile & { selectedIndex: number }>({
  id: 1,
  name: "",
  src: "",
  type: "",
  size: 0,
  selectedIndex: 1,
});

const onChangeInfoInCarousel = (payload) => {
  infoInCarousel.value = payload;
};

const sizeOfCarousel = ref<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

const onChangeView = debounce((payload) => {
  sizeOfCarousel.value = {
    width: payload.width,
    height: payload.height * 0.8,
  };
}, 100);

const vOnResize = (el, binding) => {
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const height = window.outerHeight;
      const width = window.outerWidth;
      binding.value.action({ width, height });
    });
  });
  resizeObserver.observe(document.body);
};
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s ease-in-out 0.5s;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>
