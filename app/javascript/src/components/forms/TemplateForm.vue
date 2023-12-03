<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper
      :wrapperClass="'border border-solid border-info p-3'"
      :textClass="'text-sm text-info'"
      :title="'Theme'"
    >
      <ul class="grid w-full gap-6 grid-cols-2">
        <li v-for="item in allThemes">
          <InputField
            :inputId="item"
            :className="'my-3 inline'"
            :inputValue="item"
            :inputFieldClass="'hidden peer'"
            :inputName="'theme'"
            :inputType="'radio'"
            :checked="item === selectedTheme"
            @changeValue="themeStore.onToggleTheme(item)"
          >
            <template #label>
              <label
                :for="item"
                class="transition duration-500 border border-dark cursor-pointer peer-checked:bg-secondary peer-checked:border-primary inline-flex items-center justify-between w-full p-5 rounded"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold">
                    <font-awesome-icon
                      :icon="
                        item === 'default'
                          ? 'fa-solid fa-desktop'
                          : 'fa-solid fa-venus'
                      "
                    />
                    {{ item }}
                  </div>
                </div>
              </label>
            </template>
          </InputField>
        </li>
      </ul>
    </FieldsetWrapper>
  </div>
</template>

<script setup lang="ts">
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from "../inputs/FieldsetWrapper.vue";

// Theme
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();
const selectedTheme = themeStore.getTheme;
const allThemes = themeStore.getAllThemes;
</script>

<style scoped></style>
