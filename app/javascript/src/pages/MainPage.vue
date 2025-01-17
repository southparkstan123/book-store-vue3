<template>
  <div v-body-scroll-lock="isShowCarousel">
    <CarouselWrapper :isShowCarousel="isShowCarousel" :imagesInCarousel="imagesInCarousel"
      :title="descriptionOfGallery">
      <template #close-button>
        <div class="cursor-pointer text-muted text-3xl absolute right-2 top-2 z-50" @click="closeCarousel">
          <font-awesome-icon icon="fa-solid fa-remove" />
        </div>
      </template>
      <template #sub-menu-content-mobile="{ title, infoInCarousel }">
        <div class="lg:hidden absolute left-0 bottom-0 bold bg-navbar-submenu p-3 bg-opacity-35 w-48 h-48">
          <span class="block text-sm text-menu-item py-2">{{ (infoInCarousel.name) ? infoInCarousel.name : '' }}</span>
          <span class="block text-sm text-menu-item py-2">{{ (infoInCarousel.type) ? `Type: ${infoInCarousel.type}` : ''
            }}</span>
          <span class="block text-sm text-menu-item py-2">{{ (infoInCarousel.size) ? `Size:
            ${displaySize(infoInCarousel.size as number) }` : '' }}</span>
          <span class="block text-sm text-menu-item py-2">{{ (infoInCarousel.createdAt) ? `Create At:
            ${moment(infoInCarousel.createdAt as number).fromNow() }` : '' }}</span>
        </div>
      </template>

      <template #sub-menu-header-mobile="{ title, infoInCarousel }">
        <div class="lg:hidden absolute left-0 top-0 bold bg-navbar-submenu p-3 bg-opacity-35">
          <span class="block text-sm text-menu-item py-2">{{ infoInCarousel.selectedIndex }} of {{
            imagesInCarousel.length }}</span>
          <a :href="infoInCarousel.src" class="block font-bold text-menu-button text-sm" target="_blank">
            View Image
          </a>
        </div>
      </template>

      <template #sub-menu-header-desktop="{ title, infoInCarousel }">
        <div class="text-menu-item text-lg">
          {{ infoInCarousel.selectedIndex }} of
          {{ imagesInCarousel.length }}
        </div>
      </template>
      <template #sub-menu-content-desktop="{ title, infoInCarousel }">
        <span class="block text-lg text-menu-item py-2 font-bold">{{
          title
          }}</span>
        <span class="block text-sm text-menu-item py-2">{{
          infoInCarousel.name
          }}</span>
        <span class="block text-sm text-menu-item py-2">{{
          infoInCarousel.type
          }}</span>
        <span class="block text-sm text-menu-item py-2">
          {{ infoInCarousel.name ? `Size: ${displaySize(infoInCarousel.size)}` : '' }}
        </span>
        <span class="block text-sm text-menu-item py-2">
          {{ infoInCarousel.name ? `Created At: ${moment(infoInCarousel.createdAt).fromNow()}` : '' }}
        </span>
      </template>
      <template #sub-menu-footer-desktop="{ title, infoInCarousel }">
        <a :href="infoInCarousel.url" class="float-right text-menu-item text-sm" target="_blank">
          View Image
        </a>
      </template>
    </CarouselWrapper>
    <div class="mx-auto" :class="`${isShowCarousel ? 'blur' : ''} ${isLoading !== false ? '' : 'py-20'}`">
      <div class="min-h-screen flex items-center justify-center">
        <div class="mx-auto" v-if="isLoading === false">
          <div class="flex items-center justify-around">
            <LabelWrapper :forAttribute="'images'" :labelClass="'inline-block m-1 cursor-pointer bg-info py-2 px-4'"
              :textClass="'text-sm text-white'" :labelText="'Upload Images (For Testing)'">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-upload" />
              </template>
              <InputField :inputId="'images'" :className="''" :inputValue="''" :inputFieldClass="'hidden'"
                :inputName="'images'" :inputType="'file'" :isMultiple="true" @changeValue="onChangeFile"
                :accept="'image/*'">
              </InputField>
            </LabelWrapper>
            <ButtonComponent v-if="imageData.length > 0" @buttonClicked="confirmDeleteAll" :buttonType="'button'"
              :textClass="'text-sm text-white'" :backgroundClass="'bg-danger py-2 px-4'">
              <template #icon>
                <font-awesome-icon icon="fa-regular fa-trash-can" />
              </template>
              <template #text> Delete All </template>
            </ButtonComponent>
          </div>

          <CardList :data="imageData" :wrapperClass="'p-3 grid w-full gap-3 lg:grid-cols-4 md:grid-cols-2'">
            <template v-slot="{ item, index }">
              <CardItem :wrapperClass="''" :item="item" class="text-white text-sm">
                <template #close-button>
                  <div :class="'float-right cursor-pointer p-3 text-lg'" @click="confirmDelete(item.name)">
                    <font-awesome-icon icon="fa-solid fa-remove" />
                  </div>
                </template>
                <template v-slot="{ id, name, src, type, createdAt, size, width, height }">
                  <ImageCard :id="id" :name="name" :src="src" :type="type" :createdAt="createdAt" :size="size" />
                </template>
              </CardItem>
            </template>

            <template #no-result>
              <div class="flex items-center justify-center" :style="'height: 400px;min-width:320px;'">
                <div class="w-full">
                  <h1 class="text-2xl text-center text-primary">
                    No Preview Images
                  </h1>
                </div>
              </div>
            </template>
          </CardList>
          <div v-if="imageData.length > 1">
            <span class="float-right text-primary">{{ displaySize(totalFileSize as number) }} for
              {{ information }}</span>
          </div>
          <ButtonComponent v-if="imageData.length > 0" @buttonClicked="openCarousel(imageData, '')"
            :buttonType="'button'" :textClass="'text-sm text-white'" :backgroundClass="'bg-info py-2 px-4'">
            <template #text> View Images </template>
          </ButtonComponent>
        </div>
        <div class="flex items-center justify-center" v-else>
          <LoadingComponent class="text-2xl text-primary" :text="'Loading...'" :animationType="'fade-in-zoom-in'" />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts" generic="T extends ImageFile">
import moment from "moment";
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
const modalStore = useModalStore();

import { useMessageStore } from "@/store/message";
const messageStore = useMessageStore();

// import { useCarouselStore } from "@/store/carousel";
// const carouselStore = useCarouselStore();

// Upload Files
import { useUploadFile } from "@/hooks/useUploadFile";
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

import CarouselWrapper from "@/components/carousel/CarouselWrapper.vue";

const descriptionOfGallery = ref<string>("");
const imagesInCarousel = ref<ImageFile[]>([]);
const isShowCarousel = ref<boolean>(false);

const openCarousel = (images: ImageFile[], description: string) => {
  if (images.length > 0) {
    isShowCarousel.value = true;
    descriptionOfGallery.value = description;
    imagesInCarousel.value = images;


    // imagesInCarousel.value = images.map((image) => {
    //   return {
    //     id: image.id,
    //     url: image.src,
    //     caption: image.name,
    //   };
    // });
  }
};

const closeCarousel = () => {
  isShowCarousel.value = false;
  imagesInCarousel.value = [];
};

const onDownload = (filename: string) => {
  const file = download(filename);
  return file.data;
};

const confirmDeleteAll = async () => {
  const confirm = await modalStore.open({
    type: "confirm",
    title: "Delete All files",
    message: "Are you sure?",
    component: "",
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
        content: `${data.length} ${data.length > 1 ? " items were" : " item was"
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
    component: "",
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
      const index = imageData.value.findIndex(
        (image) => image.id === data[0].id,
      );
      imageData.value.splice(index, 1);

      setTimeout(() => {
        messageStore.push({
          type: "success",
          content: `${data[0].name} was deleted successfully.`,
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

      const { data, error } = await uploadFile(file, filename, "image/*");

      if (error) {
        messageStore.push({
          type: "error",
          content: error.message,
        });
      } else {
        const imageObject: ImageFile = {
          id: data.id,
          name: filename,
          type: file.type,
          src: getPublicUrl(filename),
          size: file.size,
          createdAt: Date.now(),
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
    const { data } = await fetchAllFiles();

    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        type: item.metadata.mimetype,
        src: getPublicUrl(item.name),
        size: item.metadata.size,
        createdAt: item.created_at,
      };
    });
  } catch (error) {
    return error;
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = await onFetchAllFiles();
    imageData.value = data;
  } catch (error) {
    messageStore.push({
      type: "error",
      content: error,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
