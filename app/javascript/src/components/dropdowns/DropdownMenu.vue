<template>
  <div>
    <select
      v-if="data && data.length > 0"
      class="block w-full mt-1"
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
  </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "@/types/types";

withDefaults(defineProps<{data: DropdownItem[]; selectedItem: number | null; placeholder: string}>(), {
  data: () => [],
  selectedItem: null,
  placeholder: '',
})

const emit = defineEmits<{e; "selectedItem"}>()

const onChange = (event: any) => {
  emit("selectedItem", parseInt(event.target.value, 10));
};

</script>

<style scoped></style>
