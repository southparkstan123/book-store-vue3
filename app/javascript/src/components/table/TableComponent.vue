<template>
  <table v-if="data">
    <caption>
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <thead>
      <tr>
        <slot name="header" :fields="fields">
          <th v-if="fields" v-for="item in fields">{{ item.label }}</th>
          <th v-else v-for="item in displayedfields">{{ item }}</th>
        </slot>
        <slot name="addition-header"></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in displayedRecords">
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
      <tr>
        <td :colspan="displayedfields.length + 1">
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
import type { TableItem, TableField } from "@/types/types";
import { useList } from "@/hooks/useList";

type DataProps = {
  data: TableItem[] | undefined;
  fields: TableField[] | undefined;
};

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

  th,
  td {
    padding: 5px;
    color: #303030;
  }

  thead {
    tr {
      background-color: #ddd;
      text-align: center;
    }

    :deep(th) {
      background-color: #aaa;
      color: green;
    }
  }

  tbody {
    tr {
      background-color: #ddd;
      text-align: center;

      &:nth-child(2n + 1) {
        background-color: #eee;
      }

      &:hover {
        background-color: #fff;
      }
    }
  }

  tfoot tr {
    background-color: #bbb;
    // text-align: right;
  }
}
</style>
