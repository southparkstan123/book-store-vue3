<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <div class="text-center">
        <LabelWrapper
          :forAttribute="'images'"
          :labelClass="'text-center inline-block m-1 cursor-pointer bg-info py-2 px-4'"
          :textClass="'text-sm text-white'"
          :labelText="'Upload Images (For Testing)'"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-upload" />
          </template>
          <InputField
            :inputId="'images'"
            :className="''"
            :inputValue="''"
            :inputFieldClass="'hidden'"
            :inputName="'images'"
            :inputType="'file'"
            :isMultiple="true"
            @changeValue="onChangeFile"
            :accept="'image/*'"
          >
          </InputField>
        </LabelWrapper>
      </div>

      <CardList
        :data="imageData"
        :wrapperClass="'p-3 grid w-full gap-6 lg:grid-cols-4 md:grid-cols-2'"
      >
        <template v-slot="{ item, index }">
          <CardItem :wrapperClass="''" :item="item" class="text-white text-sm">
            <template #close-button>
              <div
                :class="'float-right cursor-pointer p-3 text-lg'"
                @click="confirmDelete(index)"
              >
                <font-awesome-icon icon="fa-solid fa-remove" />
              </div>
            </template>
            <template
              v-slot="{ name, src, type, createdAt, size, width, height }"
            >
              <ImageCard
                :name="name"
                :src="src"
                :type="type"
                :createdAt="createdAt"
                :size="size"
                :width="width"
                :height="height"
              />
            </template>
          </CardItem>
        </template>

        <template #no-result>
          <div
            class="flex items-center justify-center"
            :style="'height: 400px;min-width:320px;'"
          >
            <div class="w-full">
              <h1 class="text-2xl text-center text-primary">
                No Preview Images
              </h1>
            </div>
          </div>
        </template>

        <template #information>
          <div class="flex items-center justify-between w-full mx-auto">
            <span class="float-right"
              >Total Size: {{ displaySize(totalFileSize as number) }}</span
            >
            <span class="float-left">{{ information }}</span>
          </div>
        </template>
      </CardList>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends ImageFile">
import { computed, onMounted } from "vue";
import type { ImageFile } from "@/types/types";

import LabelWrapper from "@/components/inputs/LabelWrapper.vue";
import InputField from "@/components/inputs/InputField.vue";

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

import { useModalStore } from "@/store/modal";
const modalStore = useModalStore();

const confirmDelete = async (index) => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete",
    message: "Are you sure?",
    component: "",
    props: undefined,
    isFitContent: true,
  });

  if (confirm) {
    deleteImage(index);
  }
};

const information = computed(
  () =>
    `${imageData.value.length} ${
      imageData.value.length > 1 ? "images were uploaded" : "image was uploaded"
    }.`,
);

// Upload Files
import { useUploadFile } from "@/hooks/useUploadFile";
import ImageCard from "@/components/card/ImageCard.vue";
const { imageData, onChangeFile, deleteImage, totalFileSize, displaySize, fetchFilesFromSupabase } =
  useUploadFile();

onMounted(async () => {
  const data = fetchFilesFromSupabase();
})
</script>

<style scoped></style>
