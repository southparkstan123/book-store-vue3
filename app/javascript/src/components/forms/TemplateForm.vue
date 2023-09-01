<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Choose Programming Language:'">
      <InputField v-for="item in checkboxList" :inputId="item" :className="'my-3 inline'" :inputValue="item"
        :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'language'" :inputType="'radio'"
        :checked="item === selectedValue" @changeValue="onChangeValue">
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>

    <InputField :inputId="'visible'" :className="'my-3 block'" :inputValue="visible"
      :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'visible'" :inputType="'checkbox'"
      :checked="visible" @changeValue="onChangeVisible">
      <template #label>
        <label for="visible" class="px-1">isVisible?</label>
      </template>
    </InputField>

    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Choose districts:'">
      <InputField v-for="item in districts" :inputId="item" :className="'my-1 inline'" :inputValue="item"
        :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'districts'"
        :inputType="'checkbox'" :checked="selectedItems ? selectedItems.includes(item) : false"
        @changeValue="onChangeSelectedItems">
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>

    <LabelWrapper :forAttribute="'images'" :labelClass="'inline-block my-3 cursor-pointer bg-info py-2 px-4'"
      :textClass="'text-sm text-white'" :labelText="'Upload Files'">
      <InputField :inputId="'images'" :className="''" :inputValue="''" :inputFieldClass="'hidden'" :inputName="'images'"
        :inputType="'file'" :isMultiple="true" @changeValue="onChangeFile">
      </InputField>
    </LabelWrapper>
  </div>

  <div class="flex px-1">
    <span class="mr-1">{{ selectedValue }}</span>
    <span class="mx-1">{{ visible }}</span>
    <span class="mx-1">{{ selectedItems.join(',') }}</span>
  </div>

  <div :style="'height: 200px'" class="overflow-y-scroll">
    
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

  <ButtonComponent @buttonClicked="toggleMode" :buttonType="'button'" :textClass="'text-sm text-white'"
    :backgroundClass="'bg-success py-2 px-4 my-3'">
    <template #text> Change Theme </template>
  </ButtonComponent>

  <ButtonComponent @buttonClicked="modalStore.close()" :buttonType="'button'" :textClass="'text-sm text-white'"
    :backgroundClass="'bg-warning py-2 px-4 my-3'">
    <template #text> Close Modal </template>
  </ButtonComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '../inputs/FieldsetWrapper.vue';
import LabelWrapper from '../inputs/LabelWrapper.vue';
import ButtonComponent from '../inputs/ButtonComponent.vue';

import CardList from "@/components/card/CardList.vue";
import CardItem from "@/components/card/CardItem.vue";

const checkboxList = ['ruby', 'javascript', 'php', 'go'];
const selectedValue = ref<string>('javascript');

const visible = ref<boolean>(true);

const districts = ref<string[]>(['hk', 'kl', 'nt']);
const selectedItems = ref<string[]>([]);

import moment from 'moment';
import type { ImageFile } from '@/types/types';
import { useUploadFile } from '@/hooks/useUploadFile';

import { useModalStore } from '@/store/modal';
const modalStore = useModalStore();

const { imageData, onChangeFile, deleteImage } = useUploadFile();

const onChangeValue = (payload) => {
  selectedValue.value = payload;
}

const onChangeVisible = ({ checked, value }) => {
  visible.value = checked;
}

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

const toggleMode = () => {
  let htmlElement = document.querySelector('html');
  const mode = localStorage.getItem('mode');

  if (mode !== null && mode === 'shoujyo') {
    htmlElement?.classList.remove('shoujyo');
    localStorage.removeItem('mode');
  } else {
    htmlElement?.classList.add('shoujyo');
    localStorage.setItem('mode', 'shoujyo');
  }
}

</script>

<style scoped></style>