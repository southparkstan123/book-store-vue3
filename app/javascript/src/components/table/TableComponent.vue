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

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';
import type { TableItem, TableField } from '@/types/types'

export default defineComponent(
  {
    props: {
      data: {
        type: Array as PropType<TableItem[]>,
        default: () => []
      },
      fields: {
        type: Array as PropType<TableField[]>,
      }
    },
    setup(props) {
      const displayedfields = computed(() => {
        const result = (props.fields !== undefined)
          ? Object.entries(props.fields).map(([_key, value]) => value.key)
          : Object.entries(props.data[0]).map(([_key]) => _key);

        return result;
      });

      const displayedRecords = computed(() => {
        const result = props.data.filter((item) =>
          displayedfields.value.map((field) => item.hasOwnProperty(field))
        );

        return result;
      });

      return {
        displayedfields,
        displayedRecords
      };
    }
  }
)
</script>

<style lang="scss" scoped>
table {
  margin-left: auto;
  margin-right: auto;

  th,td {
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