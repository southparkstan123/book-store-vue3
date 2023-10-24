<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Theme'">
      <ul class="grid w-full gap-6 grid-cols-2">
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

    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'" :title="'Background image'">
      <LabelWrapper
        :forAttribute="'per-page'"
        :textClass="''"
        :labelText="''"
      >
      <ul class="grid w-full gap-6 grid-cols-2">
        <li v-for="item in backgroundImages">
          <InputField :inputId="item.className" :className="'my-3 inline'" :inputValue="item.className"
            :inputFieldClass="'hidden peer'" :inputName="'backgroundImages'" :inputType="'radio'"
            :checked="item.className === selectedImages" @changeValue="themeStore.changeBackgroundImage">
            <template #label>
              <label 
                :for="item.className" :class="`${item.className} bg-fixed bg-no-repeat bg-cover bg-center`"
                class="border border-primary cursor-pointer inline-flex items-center justify-between w-full p-5 rounded bg-100% hover:bg-110%">
                <div class="block">
                  <div class="w-full text-xs text-primary font-semibold peer-checked:text-white">{{ item.label }}</div>
                </div>
              </label>
            </template>
          </InputField>
        </li>
      </ul>
      </LabelWrapper>
    </FieldsetWrapper>
  </div>
</template>

<script setup lang="ts">
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '../inputs/FieldsetWrapper.vue';
import LabelWrapper from '../inputs/LabelWrapper.vue';
import DropdownMenu from '../dropdowns/DropdownMenu.vue';

// Theme
import { useThemeStore } from "@/store/theme"
const themeStore = useThemeStore();
const selectedTheme = themeStore.getTheme;
const allThemes = themeStore.getAllThemes;

const backgroundImages = themeStore.getAllbackgroundImages;
const selectedImages = themeStore.getBackgroundImageClass;

</script>

<style scoped></style>