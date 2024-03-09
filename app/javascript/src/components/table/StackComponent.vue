<template>
  <table v-if="data" :style="'border-collapse: collapse;'">
    <caption>
      <slot name="caption"></slot>
      <slot name="search-bar"></slot>
    </caption>
    <tbody>
      <tr
        :class="rowClass"
        v-for="item in displayedRecords"
      >
        <td
          :class="headerClass"
          v-if="fields"
          v-for="field in fields"
          :data-label="field.label"
        >
          <slot :name="field.key" :item="item">
            {{ item[field.key] }}
          </slot>
        </td>
        <td
          v-else
          v-for="field in displayedfields"
          :data-label="field"
        >
          <slot :name="field" :item="item">
            {{ item[field] }}
          </slot>
        </td>
        <td>
          <div>
            <slot name="addition-content" :item="item"></slot>
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr :class="footerClass">
        <td :colspan="displayedfields.length + 1">
          <div :style="'float: left'">
            <slot name="footer"></slot>
          </div>

          <div :style="'float: right'">
            <slot name="pagination"> </slot>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
import type { DataProps } from "@/types/types";
import { useList } from "@/hooks/useList";

const props = withDefaults(defineProps<DataProps & { headerClass: string; rowClass: string; footerClass: string }>(), {
  data: undefined,
  fields: undefined,
  headerClass: "",
  rowClass: "",
  footerClass: ""
});

const slots = defineSlots<{
  caption: string
}>()

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
