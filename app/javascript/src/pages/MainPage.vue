<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto md:bg-gray-100 md:bg-opacity-30 bg-transparent">
      <div class="text-center">
        <LabelWrapper :forAttribute="'images'" :labelClass="'text-center inline-block m-1 cursor-pointer bg-info py-2 px-4'"
          :textClass="'text-sm text-white'" :labelText="'Upload Images (For Testing)'">
          <InputField :inputId="'images'" :className="''" :inputValue="''" :inputFieldClass="'hidden'"
            :inputName="'images'" :inputType="'file'" :isMultiple="true" @changeValue="onChangeFile" :accept="'image/*'">
          </InputField>
        </LabelWrapper>
      </div>

      <div v-if="imageData.length > 0 && imageData !== undefined" :style="'height: 400px;min-width:320px;'" class="overflow-scroll">
        <CardList :data="(imageData as ImageFile[])" :wrapperClass="'p-3 grid w-full gap-6 lg:grid-cols-4 md:grid-cols-2'">
          <template v-slot="{ item, index }">
            <CardItem :wrapperClass="''" :item="(item as ImageFile)" class="text-white text-sm">
              <template #close-button>
                <div 
                  :class="'float-right cursor-pointer p-3 text-lg'" 
                  @click="confirmDelete(index)"
                >
                  x
                </div>
              </template>
              <template v-slot="{ name, src, type, createdAt, size }">
                <div :style="`
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
                    <div :style="{ overflow: 'scroll'}">{{ name }}</div>
                    <div>Type: {{ type }}</div>
                    <div>Size: {{ displaySize(size as number) }}</div>
                    <div>Create At: {{ moment(createdAt as number).fromNow() }}</div>
                  </div>
                </div>
              </template>
            </CardItem>
          </template>
        </CardList>
      </div>
      <div v-else class="flex items-center justify-center" :style="'height: 400px;min-width:320px;'">
        <div class="w-full">
          <h1 class="text-2xl text-center text-primary">No Preview Images</h1>
        </div>
      </div>

      <div class="flex items-center justify-between w-full mx-auto" v-if="imageData.length > 0 && imageData !== undefined">
        <span class="float-right text-white">Total Size: {{ displaySize(totalFileSize as number) }}</span>
        <span class="float-left text-white">{{ information }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useModalStore } from "@/store/modal";
const modalStore = useModalStore();

const confirmDelete = async (index) => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete",
    message: "Are you sure?",
    component: "",
    props: undefined,
    isFitContent: true
  });

  if (confirm) {
    deleteImage(index);
  }
};

const information = computed(() => `${imageData.value.length} ${(imageData.value.length > 1) ? 'images were uploaded' : 'image was uploaded'}.`)

import LabelWrapper from '@/components/inputs/LabelWrapper.vue';
import InputField from "@/components/inputs/InputField.vue";

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

// Upload Files
import moment from 'moment';
import type { ImageFile } from '@/types/types';
import { useUploadFile } from '@/hooks/useUploadFile';
const { imageData, onChangeFile, deleteImage, totalFileSize, displaySize } = useUploadFile();

</script>

<style scoped></style>
