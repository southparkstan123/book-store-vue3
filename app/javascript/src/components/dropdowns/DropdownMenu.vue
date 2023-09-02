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

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { DropdownItem } from "@/types/types";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DropdownItem[]>,
    },
    selectedItem: {
      type: Object as PropType<number | null>,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    }
  },
  setup(props, { emit }) {
    const onChange = (event: any) => {
      emit("selectedItem", parseInt(event.target.value, 10));
    };

    return {
      onChange,
    };
  },
});
</script>

<style scoped></style>
