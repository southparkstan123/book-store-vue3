<template>
  <div
    :style="`
    background-image:url(${src});
    height: 200px;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;`"
  >
    <div
      class="p-2"
      :style="`background: linear-gradient(to bottom,rgba(0,0,0,.7) 30%,rgba(255,255,255,0))`"
    >
      <div :style="{ overflow: 'scroll' }">{{ name }}</div>
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

<style scoped></style>
