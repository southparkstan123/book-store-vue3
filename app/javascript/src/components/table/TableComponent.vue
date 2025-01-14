<template>
  <table v-if="data">
    <caption v-if="!isLoading">
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <thead v-if="!isLoading">
      <tr>
        <slot name="header" :fields="fields" :isLoading="isLoading">
          <th :class="headerClass" v-if="fields" v-for="item in fields">
            <span>{{ item.label }}</span>
          </th>
          <th :class="headerClass" v-else v-for="item in displayedfields">
            <span>{{ item }}</span>
          </th>
        </slot>
        <th :class="headerClass" v-if="!isLoading">
          <slot name="addition-header"></slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :class="rowClass" v-for="item in displayedRecords">
        <td v-for="field in displayedfields">
          <slot :name="field" :item="item" :isLoading="isLoading">
            <span v-if="!isLoading">{{ item[field] }}</span>
            <SkeletonBox
              v-else
              class="my-1 rounded-sm bg-info bg-opacity-20"
            ></SkeletonBox>
          </slot>
        </td>
        <td v-if="!isLoading">
          <slot name="addition-content" :item="item"></slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr :class="footerClass" v-if="!isLoading">
        <td :colspan="displayedfields && displayedfields.length + 1">
          <div :style="'float: left'">
            <slot name="footer" :isLoading="isLoading"></slot>
          </div>
          <div :style="'float: right'">
            <slot name="pagination" :isLoading="isLoading"></slot>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
  <!-- <div v-else-if="isLoading"></div> -->
  <div style="text-align: center" v-else>No Data</div>
</template>

<script setup lang="ts">
import type { DataProps } from "@/types/types";
import { useList } from "@/hooks/useList";
import SkeletonBox from "./SkeletonBox.vue";

const props = withDefaults(
  defineProps<
    DataProps & {
      headerClass: string;
      rowClass: string;
      footerClass: string;
      isLoading: boolean;
    }
  >(),
  {
    data: undefined,
    fields: undefined,
    headerClass: "",
    rowClass: "",
    footerClass: "",
    isLoading: false,
  },
);

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
