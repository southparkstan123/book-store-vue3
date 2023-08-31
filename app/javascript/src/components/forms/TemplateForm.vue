<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-purple-500 p-3'" :textClass="'text-sm text-purple-700'" :title="'Choose Programming Language:'">
      <InputField v-for="item in checkboxList" :inputId="item" :className="'my-3 inline'" :inputValue="item"
        :inputFieldClass="'px-1 text-pink-300 border-purple-300 focus:ring-0'" :inputName="'language'"
        :inputType="'radio'" :placeholder="''" :checked="item === selectedValue"
        @changeValue="onChangeValue">
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>

    <InputField :inputId="'visible'" :className="'my-3 block'" :inputValue="visible"
      :inputFieldClass="'px-1 text-pink-300 border-purple-300 focus:ring-0'" :inputName="'visible'"
      :inputType="'checkbox'" :checked="visible"
      @changeValue="onChangeVisible">
      <template #label>
        <label for="visible" class="px-1">isVisible?</label>
      </template>
    </InputField>

    <FieldsetWrapper :wrapperClass="'border border-solid border-purple-500 p-3'" :textClass="'text-sm text-purple-700'" :title="'Choose districts:'">
      <InputField v-for="item in districts" :inputId="item" :className="'my-1'" :inputValue="item"
        :inputFieldClass="'px-1 text-pink-300 border-purple-300 focus:ring-0'" :inputName="'districts'"
        :inputType="'checkbox'"
        :checked="selectedItems ? selectedItems.includes(item) : false" @changeValue="onChangeSelectedItems">
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>

    <LabelWrapper 
      :forAttribute="'images'" 
      :labelClass="'inline-block my-3 cursor-pointer'" 
      :textClass="'text-sm text-white bg-purple-400 py-2 px-4'" 
      :labelText="'Upload File'"
    >
      <InputField :inputId="'images'" :className="''" :inputValue="''"
        :inputFieldClass="'hidden'" :inputName="'images'"
        :inputType="'file'" :isMultiple="false"
        @changeValue="onChangeFile">
      </InputField>
    </LabelWrapper>

  </div>

  <div>
    <pre>{{ selectedValue }}</pre>
    <pre>{{ visible }}</pre>
    <pre>{{ selectedItems }}</pre>
    <div class="even: bg-gray-300 odd:bg-gray-100" v-for="(image, index) in imageData" v-if="imageData && imageData.length > 0">
      <div :style="'float:right;cursor:pointer'" @click="deleteImage(index)">
        x
      </div>
      <div>
        <img :src="image.src" width="200" height="200"/>
        <ul>
          <li>Name: {{ image.name }}</li>
          <li>Type: {{ image.type }}</li>
          <li>Size: {{ (image.size/1024/1024).toPrecision(3) + 'MB' }}</li>
          <li>{{ moment(image.createdAt).fromNow() }}</li>
        </ul>
      </div>
    </div> 
  </div>
  
</template>

<script setup lang="ts">
type ImageFile = {
  name: string;
  type: string;
  src: string;
  size: number;
  createdAt: number;
}

import { ref } from 'vue';
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '../inputs/FieldsetWrapper.vue';
import LabelWrapper from '../inputs/LabelWrapper.vue';

import moment from 'moment';

const checkboxList = ['ruby', 'javascript', 'php', 'go'];
const selectedValue = ref<string>('javascript');

const visible = ref<boolean>(true);

const districts = ref<string[]>(['hk', 'kl', 'nt']);
const selectedItems = ref<string[]>([]);

const imageData = ref<ImageFile[]>([]);

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

const previewImages = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener('load', () => {
    const imageObject: ImageFile = {
      name: file.name,
      type: file.type,
      src: fileReader.result as string,
      size: file.size,
      createdAt: Date.now()
    }

    imageData.value.push(imageObject);
  });
}

const onChangeFile = (payload) => {
  const files = payload;
  if(files){
    Array.prototype.forEach.call(files, previewImages)
  }
}

const deleteImage = (index) => {
  imageData.value.splice(index,1);
}

</script>

<style scoped></style>