<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <div class="inline">
        <div>
          <ButtonComponent
            @buttonClicked="openModal"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-info py-2 px-4 disabled:opacity-25'"
          >
            <template #text> Open Modal </template>
          </ButtonComponent>
        </div>
        <div>
          <LabelWrapper :forAttribute="'images'" :labelClass="'inline-block my-3 cursor-pointer bg-info py-2 px-4'"
            :textClass="'text-sm text-white'" :labelText="'Upload Images'">
            <InputField :inputId="'images'" :className="''" :inputValue="''" :inputFieldClass="'hidden'" :inputName="'images'"
              :inputType="'file'" :isMultiple="true" @changeValue="onChangeFile" :accept="'image/*'">
            </InputField>
          </LabelWrapper>
        </div>
      </div>

      <div v-if="imageData.length > 0 && imageData !== undefined" :style="'height: 200px'" class="overflow-y-scroll">
        <CardList :data="(imageData as ImageFile[])">
          <template v-slot="{ item, index }">
            <CardItem :wrapperClass="(index % 2 === 0) ? 'bg-table-body-1' : 'bg-table-body-2'" :item="(item as ImageFile)"
              :class="'text-table-text'">
              <template #close-button>
                <div :class="'float-right cursor-pointer p-1'" @click="deleteImage(index)">x</div>
              </template>
              <template v-slot="{ src, type, createdAt, size }">
                <div class="flex justify-center">
                  <img :src="(src as string)" width="150" height="150" />
                </div>
                <ul>
                  <li>Type: {{ type }}</li>
                  <li>Size: {{ (size as number / 1024 / 1024).toPrecision(3) + 'MB' }}</li>
                  <li>Create At: {{ moment(createdAt as number).fromNow() }}</li>
                </ul>
              </template>
            </CardItem>
          </template>
        </CardList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/modal";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
const modalStore = useModalStore();

const openModal = () => {
  modalStore.open({
    title: "Greeting",
    type: "alert",
    component: "",
    message: "Welcome!",
    props: undefined
  });
};

import LabelWrapper from '@/components/inputs/LabelWrapper.vue';
import InputField from "@/components/inputs/InputField.vue";

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

// Upload Files
import moment from 'moment';
import type { ImageFile } from '@/types/types';
import { useUploadFile } from '@/hooks/useUploadFile';
const { imageData, onChangeFile, deleteImage } = useUploadFile();

</script>

<style scoped></style>
