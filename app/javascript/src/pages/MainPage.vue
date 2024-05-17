<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto" v-if="isLoading === false">
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
                @click="confirmDelete(item.name)"
              >
                <font-awesome-icon icon="fa-solid fa-remove" />
              </div>
            </template>
            <template
              v-slot="{ id, name, src, type, createdAt, size, width, height }"
            >
              <ImageCard
                :id="id"
                :name="name"
                :src="src"
                :type="type"
                :createdAt="createdAt"
                :size="size"
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
            <span class="float-left">{{ displaySize(totalFileSize as number) }} for {{ information }}</span>
          </div>
        </template>
      </CardList>
    </div>
    <div class="flex items-center justify-center" v-else>
      <LoadingComponent
        class="text-2xl text-primary"
        :text="'Loading...'"
        :animationType="'fade-in-zoom-in'"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends ImageFile">
import { computed, onMounted, ref } from "vue";
import type { ImageFile } from "@/types/types";

import LabelWrapper from "@/components/inputs/LabelWrapper.vue";
import InputField from "@/components/inputs/InputField.vue";

import LoadingComponent from "@/components/loading/LoadingComponent.vue";

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

import { useModalStore } from "@/store/modal";
const modalStore = useModalStore();

import { useMessageStore } from "@/store/message";
const messageStore = useMessageStore();

const isLoading = ref<boolean>(false);

const confirmDelete = async (id) => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete",
    message: "Are you sure?",
    component: "",
    props: undefined,
    isFitContent: true,
  });

  if (confirm) {
    deleteFilesFromSupabase([id]);
  }
};

const information = computed(
  () =>
    `${imageData.value.length} ${
      imageData.value.length > 1 ? "items" : "item"
    }`,
);

// Upload Files
import { useUploadFile } from "@/hooks/useUploadFile";
import ImageCard from "@/components/card/ImageCard.vue";
const { 
  imageData, 
  onChangeFile, 
  deleteImage, 
  totalFileSize, 
  displaySize, 
  fetchFilesFromSupabase,
  deleteFilesFromSupabase
} = useUploadFile();

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = await fetchFilesFromSupabase();
    imageData.value = data;
  } catch (error) {
    messageStore.push({
      type: "error",
      content: "Oops! Error occurs!"
    })
  } finally {
    isLoading.value = false;
  }
})
</script>

<style scoped></style>
