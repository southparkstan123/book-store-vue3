<template>
  <table v-if="data" class="table-auto">
    <caption>
      <slot name="caption">
        Defalut Cation
      </slot>
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
          <slot name="number" :numberOfRecords="numberOfRecords"></slot>
        </td>
      </tr>
    </tfoot>
  </table>
  <div style="text-align: center" v-else>No Data</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';

export type TableItem =  {
  [key: string]: unknown
}

export type TableField =  {
  label: string,
  key: string
}

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
      const caption = ref("Default caption");
      const numberOfRecords = computed(() => props.data.length);
      const displayedfields = computed(() => {
        const result = (props.fields !== undefined)
          ? Object.entries(props.fields).map(([_key, value]) => value.key)
          : Object.entries(props.data[0]).map(([_key, value]) => _key);

        return result;
      });

      const displayedRecords = computed(() => {
        const result = props.data.filter((item) =>
          displayedfields.value.map((field) => item.hasOwnProperty(field))
        );

        return result;
      });

      return {
        caption,
        numberOfRecords,
        displayedfields,
        displayedRecords
      };
    }
  }
)
</script>

<style lang="scss" scoped>
table {
  border: 1px solid green;
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
    text-align: right;
  }

}
</style>