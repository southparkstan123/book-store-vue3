<template>
  <div
    class="h-48 w-72 md:w-64 backdrop"
    ref="imageRef"
  >
    <div class="p-2 overlay">
      <div class="overflow-scroll">{{ name }}</div>
      <div>Type: {{ type }}</div>
      <div>Size: {{ displaySize(size as number) }}</div>
      <div>Create At: {{ moment(createdAt as number).fromNow() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { ImageFile } from "@/types/types";
import { useUploadFile } from "@/hooks/useUploadFile";
import loadingImg from '@/assets/loading.png';

import { ref, onMounted, computed } from 'vue';

const imageRef = ref<Element | null>(null);

const { displaySize } = useUploadFile();
const props = withDefaults(defineProps<ImageFile>(), {
  id: "",
  name: "",
  src: "",
  type: "image/*",
  createdAt: 0,
  size: 0
});

const srcURL = computed(() => `url(${props.src})`)
const loadImageURL = computed(() => `url(${loadingImg})`)

onMounted(() =>  {
  let observerRefValue: Element;

  const observer = new IntersectionObserver(([entry]) => {
    const loadImage = () => {
      setTimeout(() => {
        observerRefValue.classList.add('visible')
      }, 0)
    }
    if (entry.isIntersecting === true) {
      loadImage()
      observer.unobserve(observerRefValue)
    }
  },{
    root: null,
    threshold: 0,
    rootMargin: "10px"
  })

  if (imageRef.value) {
    observer.observe(imageRef.value);
    observerRefValue = imageRef.value;
  }


})
</script>

<style scoped lang="scss">
.backdrop {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-image: v-bind(loadImageURL);
  transition: 2s ease-in-out;
  opacity: 0.5;

  &.visible {
    background-size: cover;
    background-image: v-bind(srcURL);
    opacity: 1;
  }

  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 30%,
      rgba(255, 255, 255, 0)
    );
  }
}
</style>
