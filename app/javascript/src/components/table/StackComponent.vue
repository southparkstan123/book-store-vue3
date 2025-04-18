<template>
  <table v-if="data && data.length > 0" :style="'border-collapse: collapse;'">
    <caption>
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <tbody>
      <tr :class="rowClass" v-for="item in displayedRecords">
        <td
          :class="headerClass"
          v-if="fields"
          v-for="field in fields"
          :data-label="field.label"
        >
          <slot :name="field.key" :item="item" :isLoading="isLoading">
            <span v-if="!isLoading">{{ item[field.key] }}</span>
            <SkeletonBox
              v-else
              class="my-1 rounded-sm bg-info bg-opacity-20"
            ></SkeletonBox>
          </slot>
        </td>
        <td v-else v-for="field in displayedfields" :data-label="field">
          <slot :name="field" :item="item" :isLoading="isLoading">
            <span v-if="!isLoading">{{ item[field] }}</span>
            <SkeletonBox
              v-else
              class="my-1 rounded-sm bg-info bg-opacity-20"
            ></SkeletonBox>
          </slot>
        </td>
        <td v-if="!isLoading" :data-label="labelOfAdditionContent">
          <slot name="addition-content" :item="item"></slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr :class="footerClass">
        <td :colspan="displayedfields.length + 1">
          <div :style="'float: left'">
            <slot name="footer" :isLoading="isLoading"></slot>
          </div>

          <div :style="'float: right'">
            <slot name="pagination" :isLoading="isLoading"> </slot>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
  <slot name="no-data" v-else-if="data === undefined"></slot>
  <slot name="no-data" v-else></slot>
</template>

<script setup lang="ts" generic="T">
import type { DataProps, TableSlots } from "@/types/types";
import { useList } from "@/hooks/useList";
import SkeletonBox from "./SkeletonBox.vue";

const props = withDefaults(
  defineProps<
    DataProps & {
      data: T[] | undefined;
      headerClass: string;
      rowClass: string;
      footerClass: string;
      isLoading: boolean;
      labelOfAdditionContent: string;
    }
  >(),
  {
    data: undefined,
    fields: undefined,
    headerClass: "",
    rowClass: "",
    footerClass: "",
    isLoading: false,
    labelOfAdditionContent: "",
  },
);

const slots = defineSlots<TableSlots<T>>();

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

        &::before {
          content: attr(data-label);
          display: inline;
          text-align: right;
          overflow-wrap: break-word;
          font-weight: 700;
        }

        *::after,
        *::before {
          box-sizing: border-box;
          display: block;
        }
      }
    }
  }
}
</style>
