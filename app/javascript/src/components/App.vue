<template>
  <div class="mx-auto">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
type module = "book" | "author" | "publisher";

import { onMounted, ref } from 'vue'
import TableComponent from './TableComponent.vue'
import type { TableItem, TableField } from './TableComponent.vue'

const title = ref<string>('Hello! Vite + Vue3 + Tailwindcss on RoR!')

const category = ref<module>('author');

const data = ref<TableItem[]>([]);
const fields = ref<TableField[]>([{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]);

const fetchRecords = async (module: module) => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/v1/${module}/list`);
    const result = await response.json();
    data.value = result;
  } catch {
    isLoading.value = true
  } finally {
    isLoading.value = false
  }
}

const action = (type: "view" | "edit" | "delete", id: number) => {
  alert(`To ${type} ${id}`);
};

const isLoading = ref<boolean>(false)

onMounted(() => {
  fetchRecords(category.value);
})

</script>

<style lang="scss">
#title {
  color: wheat;
}

.button {
  background-color: gray;
  border: none;
  color: white;
  padding: 8px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  &.info {
    background-color: blue;
  }

  &.success {
    background-color: green;
  }

  &.danger {
    background-color: red;
  }
}
</style>