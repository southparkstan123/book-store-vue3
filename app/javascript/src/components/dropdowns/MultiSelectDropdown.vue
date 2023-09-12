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

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { DropdownItem } from "@/types/types";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DropdownItem[]>,
    },
    selectedItems: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
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

    return {
      onChange,
    };
  },
});
</script>

<style scoped></style>
