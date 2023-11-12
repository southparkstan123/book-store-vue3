<template>
  <table v-if="data">
    <caption>
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <thead>
      <tr>
        <slot name="header" :fields="fields">
          <th
            class="p-1 bg-table-header text-table-title-1"
            v-if="fields"
            v-for="item in fields"
          >
            {{ item.label }}
          </th>
          <th
            class="p-1 bg-table-header text-table-title-1"
            v-else
            v-for="item in displayedfields"
          >
            {{ item }}
          </th>
        </slot>
        <slot name="addition-header"></slot>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-center text-table-text odd:bg-table-body-1 even:bg-table-body-2"
        v-for="item in displayedRecords"
      >
        <td v-for="field in displayedfields">
          <slot :name="field" :item="item">
            {{ item[field] }}
          </slot>
        </td>
        <td>
          <slot name="addition-content" :item="item"></slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="bg-table-footer">
        <td :colspan="displayedfields && displayedfields.length + 1">
          <div :style="'float: left'">
            <slot name="footer"></slot>
          </div>
          <div :style="'float: right'">
            <slot name="pagination"></slot>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
  <div style="text-align: center" v-else>No Data</div>
</template>

<script setup lang="ts">
import type { DataProps } from "@/types/types";
import { useList } from "@/hooks/useList";

const props = withDefaults(defineProps<DataProps>(), {
  data: undefined,
  fields: undefined,
});

const { displayedfields, displayedRecords } = useList(props);
</script>

<style lang="scss" scoped>
table {
  margin-left: auto;
  margin-right: auto;
  overflow-x: scroll;
  min-width: 1024px;

  thead {
    :deep(th) {
      @apply p-1 text-table-title-1 bg-table-header;
    }
  }
}
</style>
