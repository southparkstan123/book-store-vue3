<template>
  <div
    :style="`background-image:url(${src});`"
    class="h-48 w-full md:w-48 backdrop"
  >
    <div class="p-2 overlay">
      <div class="overflow-scroll">{{ name }}</div>
      <div>Type: {{ type }}</div>
      <div>Size: {{ displaySize(size as number) }}</div>
      <div>Create At: {{ moment(createdAt as number).fromNow() }}</div>
      <div>{{ width }} x {{ height }} px</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { ImageFile } from "@/types/types";
import { useUploadFile } from "@/hooks/useUploadFile";

const { displaySize } = useUploadFile();
const props = withDefaults(defineProps<ImageFile>(), {
  name: "",
  src: "",
  type: "image/png",
  createdAt: 0,
  size: 0,
  width: 0,
  height: 0,
});
</script>

<style scoped lang="scss">
.backdrop {
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 30%,
      rgba(255, 255, 255, 0)
    );
  }
}
</style>
