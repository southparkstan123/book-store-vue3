<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <div class="mx-auto" v-if="isLoading === false">
        <div class="flex items-center justify-around">
          <LabelWrapper
            :forAttribute="'images'"
            :labelClass="'inline-block m-1 cursor-pointer bg-info py-2 px-4'"
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
          <ButtonComponent
            v-if="imageData.length > 0"
            @buttonClicked="confirmDeleteAll"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-danger py-2 px-4'"
          >
            <template #icon>
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </template>
            <template #text> Delete All </template>
          </ButtonComponent>
        </div>

        <CardList
          :data="imageData"
          :wrapperClass="'p-3 grid w-full gap-3 lg:grid-cols-4 md:grid-cols-2'"
          :key="'id'"
        >
          <template v-slot="{ item, index }">
            <CardItem
              :wrapperClass="''"
              :item="item as ImageFile"
              class="text-white text-sm"
            >
              <template #close-button="{ id }">
                <div class="float-right text-center text-lg p-3">
                  <div
                    :class="'cursor-pointer text-danger'"
                    @click="confirmDelete(id)"
                  >
                    <font-awesome-icon icon="fa-regular fa-trash-can" />
                  </div>
                  <div
                    :class="'cursor-pointer text-info'"
                    @click="
                      carouselStore.open({
                        images: imageData,
                        description: '',
                        selectedIndex: index + 1,
                      })
                    "
                  >
                    <font-awesome-icon icon="fa-regular fa-eye" />
                  </div>
                </div>
              </template>
              <template v-slot="{ id, name, src, type, createdAt, size }">
                <ImageCard
                  :id="id as string | number"
                  :name="name as string"
                  :src="src as string"
                  :type="type as string"
                  :createdAt="createdAt as number"
                  :size="size as number"
                  :caption="''"
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
        </CardList>
        <div v-if="imageData.length > 1">
          <span class="float-right text-primary"
            >{{ displaySize(totalFileSize as number) }} for
            {{ information }}</span
          >
        </div>
      </div>
      <div class="flex items-center justify-center" v-else>
        <LoadingComponent
          class="text-2xl text-primary"
          :text="'Loading...'"
          :animationType="'fade-in-zoom-in'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends ImageFile">
import { computed, onMounted, ref } from "vue";
import type { ImageFile } from "@/types/types";
import {
  uploadFile,
  getPublicUrl,
  deleteFile,
  fetchAllFiles,
  deleteAllFiles,
  createBucket,
  download,
} from "@/services/SupabaseServices";

import LabelWrapper from "@/components/inputs/LabelWrapper.vue";
import InputField from "@/components/inputs/InputField.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";

import LoadingComponent from "@/components/loading/LoadingComponent.vue";

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";
import ImageCard from "@/components/card/ImageCard.vue";

import { useModalStore } from "@/store/modal";
import { useMessageStore } from "@/store/message";
import { useUploadFile } from "@/hooks/useUploadFile";
import { useCarouselStore } from "@/store/carousel";

const modalStore = useModalStore();

const messageStore = useMessageStore();

// Upload Files
const { isLoading, information, imageData, totalFileSize, displaySize } =
  useUploadFile();

const onCreateBucket = async (bucketName: string) => {
  const { data, error } = await createBucket(bucketName);

  if (error) {
    messageStore.push({
      type: "error",
      content: error.message,
    });
  } else {
    messageStore.push({
      type: "success",
      content: "Success!",
    });
  }
};

// Carousel

const carouselStore = useCarouselStore();

const onDownload = async (filename: string) => {
  const file = await download(filename);
  return file.data;
};

const confirmDeleteAll = async () => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete All files",
    message: "Are you sure?",
    component: undefined,
    props: undefined,
    isFitContent: true,
  });

  if (confirm) {
    const { data, error } = await deleteFile(
      imageData.value.map((image) => image.name),
    );

    if (error) {
      messageStore.push({
        type: "error",
        content: error.message,
      });
    } else {
      messageStore.push({
        type: "success",
        content: `${data.length} ${
          data.length > 1 ? " items were" : " item was"
        } deleted successfully.`,
      });

      imageData.value = [];
    }
  }
};

const confirmDelete = async (id) => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete",
    message: "Are you sure?",
    component: undefined,
    props: undefined,
    isFitContent: true,
  });

  if (confirm) {
    const { data, error } = await deleteFile([id]);

    if (error) {
      messageStore.push({
        type: "error",
        content: error.message,
      });
    } else {
      const index = imageData.value.findIndex((image) => image.id === id);
      imageData.value.splice(index, 1);

      setTimeout(() => {
        messageStore.push({
          type: "success",
          content: `The image was deleted successfully.`,
        });
      }, 100);
    }
  }
};

const onChangeFile = (payload: FileList) => {
  const files = payload;
  if (files) {
    Array.prototype.forEach.call(files, async (file, index) => {
      const filename: string = `${Math.random()
        .toString(36)
        .substring(2, 12)}.${file.name.split(".").pop()}`;

      setTimeout(() => {
        messageStore.push({
          type: "info",
          content: `${filename} is uploading.`,
        });
      }, 100 * index);

      const { data, error } = await uploadFile({
        file,
        filePath: filename,
        allowedContentType: "image/*",
      });

      if (error) {
        messageStore.push({
          type: "error",
          content: error.message,
        });
      } else {
        const imageObject: ImageFile = {
          id: data.path,
          name: filename,
          type: file.type,
          src: getPublicUrl(filename),
          size: file.size,
          createdAt: Date.now(),
          caption: "",
        };

        imageData.value.push(imageObject);

        setTimeout(() => {
          messageStore.push({
            type: "success",
            content: `${filename} was uploaded successfully.`,
          });
        }, 300);
      }
    });
  }
};

const onFetchAllFiles = async () => {
  try {
    const data = (await fetchAllFiles()) as { data: ImageFile[] };
    return data;
  } catch (error) {
    return error;
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = await onFetchAllFiles();
    imageData.value = data as ImageFile[];
  } catch (error) {
    messageStore.push({
      type: "error",
      content: error as string,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
