<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="!isLoading && data.length > 0">
      <TableComponent :data="data" :fields="fields">
        <template #caption>
          {{ caption }}
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
          {{ item.authors.map(author => author.name).join(", ") }}
        </template>

        <template #addition-header>
          <th>Actions</th>
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
</template>

<script setup lang="ts">
type module = "book" | "author" | "publisher";

import { onMounted, ref, computed } from 'vue'
import TableComponent from '../components/TableComponent.vue'
import type { TableItem, TableField } from '../components/TableComponent.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{category: module}>()

const router = useRouter()

const caption = computed(() => `Add ${props.category}`)

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
  fetchRecords(props.category);
})

</script>

<style scoped>
</style>