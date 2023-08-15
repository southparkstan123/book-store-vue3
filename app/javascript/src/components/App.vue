<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="relative mx-32 bg-white px-6 pt-10 pb-8 shadow-xl sm:rounded-lg sm:px-10">
      <div class="mx-auto">
        <div v-if="!isLoading && data.length > 0">
          <TableComponent :data="data" :fields="fields">
            <template #addition-header>
              <th>Actions</th>
            </template>

            <template #creator="{ item }">
              {{ item.creator.username }}
            </template>

            <template #updater="{ item }">
              {{ item.updater.username }}
            </template>

            <template #publisher="{ item }">
              {{ item.name }}
            </template>

            <template #authors="{ item }">
              {{ item.authors.map(e => e.name).join(", ") }}
            </template>

            <template #addition-content="{ id }">
              <td>
                <button class="button info" @click="action('view', id)">view</button>
                <button class="button success" @click="action('edit', id)">edit</button>
                <button class="button danger" @click="action('delete', id)">delete</button>
              </td>
            </template>

            <template #number="{ numberOfRecords }">
              <span>{{ numberOfRecords }} {{ numberOfRecords > 1 ? 'records' : 'record' }} </span>
            </template>
          </TableComponent>
        </div>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TableComponent from './TableComponent.vue'
import type { TableItem, TableField } from './TableComponent.vue'

const title = ref<string>('Hello! Vite + Vue3 + Tailwindcss on RoR!')

const data = ref<TableItem[]>([]);
const fields = ref<TableField[]>([{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]);

const fetchRecords = async (module: "book" | "author" | "publisher") => {
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
  fetchRecords('book');
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