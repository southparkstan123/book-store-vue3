<template>
  <div class="mx-auto inline w-full">
    <ul class="grid w-full gap-6 grid-cols-1">
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
              class="transition duration-500 border border-menu-item text-menu-item peer-checked:text-primary cursor-pointer peer-checked:border-primary peer-checked:bg-light inline-flex items-center justify-between w-full py-1 px-5 rounded"
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
  </div>
</template>

<script setup lang="ts">
import InputField from "@/components/inputs/InputField.vue";

// Theme
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();
const selectedTheme = themeStore.getTheme;
const allThemes = themeStore.getAllThemes;
</script>

<style scoped></style>
