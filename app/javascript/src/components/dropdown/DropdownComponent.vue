<template>
  <div>
    <select v-if="data && data.length > 0" :multiple="isMultiple" @change="onChange">
      <slot name="options" v-bind="data"></slot>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type DropdownItem = {
  id: number,
  [key: string]: unknown
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DropdownItem[]>
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { emit }) {
    const onChange = (event: any) => {
      if (!props.isMultiple) {
        emit('selectedItem', parseInt(event.target.value, 10));
      } else {
        let ids: Array<number> = [];
        const options: any = event.target.options;

        for (let index = 0; index < options.length; index++) {
          if (options[index].selected === true) {
            ids.push(parseInt(options[index].value, 10));
          }
        }
        emit('selectedItems', ids);
      }
    }

    return {
      onChange
    }
  }
})


</script>

<style scoped></style>