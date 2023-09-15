<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Theme'">
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li v-for="item in allThemes">
          <InputField  :inputId="item" :className="'my-3 inline'" :inputValue="item"
            :inputFieldClass="'hidden peer'" :inputName="'language'" :inputType="'radio'"
            :checked="item === selectedTheme" @changeValue="themeStore.onToggleTheme(item)">
            <template #label>
              <label :for="item" class="border border-dark cursor-pointer peer-checked:bg-secondary peer-checked:border-primary inline-flex items-center justify-between w-full p-5 rounded">
                <div class="block">
                  <div class="w-full text-lg font-semibold">{{ item }}</div>
                </div>
              </label>
            </template>
          </InputField>
        </li>
      </ul>
    </FieldsetWrapper>

    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Pagination'">
      <LabelWrapper
        :forAttribute="'per-page'"
        :textClass="''"
        :labelText="'Page size:'"
      >
        <DropdownMenu
          :data="[[10, 10],[20, 20],[50, 50]]"
          :placeholder="'Please select the page size'"
          :selectedItem="themeStore.getPerPage"
          @selectedItem="(payload: number) => themeStore.changeValuePerPage(payload)"
        >
        </DropdownMenu>
      </LabelWrapper>
    </FieldsetWrapper>

    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Choose districts:'">
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li v-for="item in districts">
          <InputField  :inputId="item.value" :className="'my-1 inline'" :inputValue="item.value"
            :inputFieldClass="'hidden peer px-1 disabled:opacity-25'" :inputName="'districts'"
            :inputType="'checkbox'" :checked="selectedItems ? selectedItems.includes(item.value) : false"
            @changeValue="onChangeSelectedItems">
            <template #label>
              <label :for="item.value" class="cursor-pointer peer-checked:bg-secondary peer-checked:border-primary inline-flex items-center justify-between w-full p-5 border border-dark rounded">
                <div class="block">
                  <div class="w-full text-lg font-semibold">{{ item.label }}</div>
                  <div class="w-full">{{ item.value }}</div>
                </div>
              </label>
            </template>
          </InputField>
        </li>
      </ul>
    </FieldsetWrapper>

    <LabelWrapper :forAttribute="'images'" :labelClass="'inline-block my-3 cursor-pointer bg-info py-2 px-4'"
      :textClass="'text-sm text-white'" :labelText="'Upload Images'">
      <InputField :inputId="'images'" :className="''" :inputValue="''" :inputFieldClass="'hidden'" :inputName="'images'"
        :inputType="'file'" :isMultiple="true" @changeValue="onChangeFile" :accept="'image/*'">
      </InputField>
    </LabelWrapper>
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

  <div class="float-right">
    <ButtonComponent @buttonClicked="modalStore.close()" :buttonType="'button'" :textClass="'text-sm text-white'"
      :backgroundClass="'bg-warning py-2 px-4 my-3 mx-1'">
      <template #text> Close Modal </template>
    </ButtonComponent>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '../inputs/FieldsetWrapper.vue';
import LabelWrapper from '../inputs/LabelWrapper.vue';
import ButtonComponent from '../inputs/ButtonComponent.vue';
import DropdownMenu from '../dropdowns/DropdownMenu.vue';
import ToggleSwitch from '../inputs/ToggleSwitch.vue';

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

// Upload Files
import moment from 'moment';
import type { ImageFile } from '@/types/types';
import { useUploadFile } from '@/hooks/useUploadFile';
const { imageData, onChangeFile, deleteImage } = useUploadFile();

// Modal
import { useModalStore } from '@/store/modal';
const modalStore = useModalStore();

// Theme
import { useThemeStore } from "@/store/theme"
const themeStore = useThemeStore();
const selectedTheme = themeStore.getTheme;
const allThemes = themeStore.getAllThemes;

// Districts
type Districts = {
  value: string,
  label: string
}

const districts = ref<Districts[]>([{ label: 'Hong Kong Island', value: 'hk'}, { label: 'Kowloon', value: 'kl'}, { label: 'New Territories', value: 'nt'}]);
const selectedItems = ref<string[]>([]);
  const onChangeSelectedItems = ({ checked, value }) => {
  let result: Array<string> = selectedItems.value;

  if (checked === true) {
    result.push(value);
  } else {
    const index = result.findIndex(item => item === value)
    result.splice(index, 1)
  }

  selectedItems.value = result;
}

</script>

<style scoped></style>