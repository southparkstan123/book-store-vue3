<template>
  <table v-if="data" :style="'border-collapse: collapse;'">
    <caption>
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <tbody>
      <tr v-for="item in displayedRecords">
        <td v-if="fields" v-for="field in fields" :data-label="field.label">
          <slot :name="field.key" :item="item">
            {{ item[field.key] }}
          </slot>
        </td>
        <td v-else v-for="field in displayedfields" :data-label="field">
          <slot :name="field" :item="item">
            {{ item[field] }}
          </slot>
        </td>

        <td>
          <div>
            <slot name="addition-header"></slot>
            <slot name="addition-content" :item="item"></slot>
          </div>
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
  min-width: 320px;

  tbody {
    tr {
      td {
        display: grid;
        grid-template-columns: 30% auto;
        grid-gap: 0.25rem 1rem;
        border-bottom: dotted 1px #303030;

        &::before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          overflow-wrap: break-word;
          font-weight: 700;
          color: purple;
        }

        *::after,
        *::before {
          box-sizing: border-box;
          display: block;
        }
      }

      &:nth-child(2n) {
        background-color: #eee;
      }

      &:nth-child(2n + 1) {
        background-color: #ddd;
      }

      td {
        padding: 5px;
      }
    }
  }
}
</style>
