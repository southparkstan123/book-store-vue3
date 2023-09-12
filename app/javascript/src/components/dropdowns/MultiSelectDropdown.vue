<template>
  <div>
    <select
      v-if="data && data.length > 0"
      class="block w-full mt-1"
      multiple
      @change="onChange"
    >
      <slot name="options" v-bind="data">
        <option
          v-for="[key, value] in data"
          :value="key"
          :key="key"
          :selected="selectedItems ? selectedItems.includes(key as number) : false"
        >
          {{ value }}
        </option>
      </slot>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "@/types/types";

withDefaults(defineProps<{data: DropdownItem[]; selectedItems: number[]}>(), {
  data: () => [],
  selectedItems: () => [],
})

const emit = defineEmits<{e: number[]; "selectedItems"}>()

const onChange = (event: any) => {
  let ids: Array<number> = [];
  const options: any = event.target.options;

  for (let index = 0; index < options.length; index++) {
    if (options[index].selected === true) {
      ids.push(parseInt(options[index].value, 10));
    }
  }
  emit("selectedItems", ids);
};

</script>

<style scoped></style>
