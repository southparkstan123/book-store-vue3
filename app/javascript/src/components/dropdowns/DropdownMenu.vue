<template>
  <div>
    <select
      v-if="data && data.length > 0"
      :class="fieldClass"
      @change="onChange"
    >
      <slot name="options" v-bind="data">
        <option selected="true" disabled>{{ placeholder }}</option>
        <option
          v-for="[key, value] in data"
          :value="key"
          :key="key"
          :selected="selectedItem ? selectedItem === key : false"
        >
          {{ value }}
        </option>
      </slot>
    </select>
    <slot name="hints"></slot>
    <div class="block">
      <slot name="error-feedback"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "@/types/types";

withDefaults(
  defineProps<{
    data: DropdownItem[];
    selectedItem: number | null;
    placeholder: string;
    fieldClass: string;
  }>(),
  {
    data: () => [],
    selectedItem: null,
    placeholder: "",
    fieldClass: "",
  },
);

const emit = defineEmits<{ e; selectedItem }>();

const onChange = (event: any) => {
  emit("selectedItem", parseInt(event.target.value, 10));
};
</script>

<style scoped></style>
