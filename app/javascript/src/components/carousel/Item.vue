<template>
  <div
    v-intersection-observer:[true]="{
      action: selectItem,
      observerOptions: {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    }"
    class="image"
    ref="imageRef"
  >
    <slot name="caption"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import loadingImg from "@/assets/loading.png";

const props = defineProps<{
  index: number;
  caption: string;
  url: string;
}>();

const emit = defineEmits<{
  (e: "selectItem", payload: number): void;
}>();

const selectItem = () => {
  console.log(props.index);
  emit("selectItem", props.index);
};

const imageRef = ref<Element | null>(null);
const srcURL = computed(() => `url(${props.url})`);
const loadImageURL = computed(() => `url(${loadingImg})`);

onMounted(() => {
  let observerRefValue: Element;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const loadImage = () => {
        setTimeout(() => {
          observerRefValue.classList.add("visible");
        }, 0);
      };
      if (entry.isIntersecting === true) {
        loadImage();
        observer.unobserve(observerRefValue);
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "10px",
    },
  );

  if (imageRef.value) {
    observer.observe(imageRef.value);
    observerRefValue = imageRef.value;
  }
});
</script>

<style scoped lang="scss">
.image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-image: v-bind(loadImageURL);

  transition: 2s ease-in-out;
  opacity: 0;
  overflow: hidden;

  &.visible {
    background-image: v-bind(srcURL);
    opacity: 1;
  }
}
</style>
