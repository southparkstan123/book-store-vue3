import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { ImageFile } from "@/types/types";

type CarouselPayload = {
  images: ImageFile[];
  description: string;
  selectedIndex: number;
};

export const useCarouselStore = defineStore("carousel", () => {
  const state = reactive<{
    descriptionOfGallery: string;
    imagesInCarousel: ImageFile[];
    isShowCarousel: boolean;
    preselectedIndex: number;
  }>({
    descriptionOfGallery: "",
    imagesInCarousel: [],
    isShowCarousel: false,
    preselectedIndex: 1,
  });

  const open = (payload: CarouselPayload) => {
    if (payload.images.length > 0) {
      state.isShowCarousel = true;
      state.descriptionOfGallery = payload.description;
      state.imagesInCarousel = payload.images;
      state.preselectedIndex = payload.selectedIndex;
    }
  };

  const close = () => {
    state.isShowCarousel = false;
    state.imagesInCarousel = [];
    state.preselectedIndex = 1;
    state.descriptionOfGallery = "";
  };

  const getCarouselObject = computed<{
    descriptionOfGallery: string;
    imagesInCarousel: ImageFile[];
    isShowCarousel: boolean;
    preselectedIndex: number;
  }>(() => state);

  return {
    state,
    open,
    close,
    getCarouselObject,
  };
});
