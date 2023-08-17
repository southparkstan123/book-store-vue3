<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade" mode="out-in">
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
          <template #created_at="{ item }">
            {{ moment(item.created_at).format('lll') }}
          </template>
          <template #updated_at="{ item }">
            {{ moment(item.updated_at).format('lll') }}
          </template>
          <template #books="{ item }">
            {{ item.books.map(book => book.name).join(", ") }}
          </template>
          <template #addition-header>
            <th>Actions</th>
          </template>
          <template #addition-content="{ item }">
            <td>
              <button class="button success" @click="action('edit', item.id)">edit</button>
              <button class="button danger" @click="action('delete', item.id)">delete</button>
            </td>
          </template>
          <template #number="{ numberOfRecords }">
            <span>{{ numberOfRecords }} {{ numberOfRecords > 1 ? 'records' : 'record' }} </span>
          </template>
        </TableComponent>
      </div>
      <div v-else>
        <div v-if="!isLoading && isError">
          <h1 class="text-center text-2xl text-red-500"></h1>Oops! Error occurs!
        </div>
        <div v-else>
          <h1 class="text-center text-2xl text-red-500">Loading...</h1>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
type Module = "book" | "author" | "publisher";
type ActionType = "view" | "edit" | "delete";

import { onMounted, ref, computed, watch } from 'vue'
import TableComponent from '../components/TableComponent.vue'
import type { TableItem, TableField } from '../components/TableComponent.vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useModalStore } from '../store/modal'
import { deleteRecordById } from '../services/CRUDServices';

const props = defineProps<{ category: Module }>()

const router = useRouter()

const caption = computed(() => `Add ${props.category}`)

const data = ref<TableItem[]>([]);
const fields = ref<TableField[]>();

const modalStore = useModalStore()

const fetchRecords = async (module: Module) => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/v1/${module}/list`);
    const result = await response.json();
    data.value = result;



  } catch (error) {
    isError.value = true
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  } finally {
    isLoading.value = false
  }
}

const action = async (type: ActionType, id: number) => {
  try {
    if(type === 'edit') {
      router.push({ path: `/${props.category}/${type}/${id}`, replace: true })
    } else {
      const confirm = await modalStore.open({
        title: 'Delete',
        message: 'Are you sure?',
        type: 'confirm',
        component: ''
      })

      if(confirm) {
        await deleteRecordById(id, props.category)
        router.push(`/${props.category}/list`)
      }
    }
  } catch (error) {
    console.log(error)
    isError.value = true
  }

};

const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)

onMounted(() => {
  fetchRecords(props.category);
})

watch(() => props.category, (newValue) => {
  fetchRecords(newValue);
})

</script>

<style scoped>
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.3s;
}
.fade-leave {
    opacity: 0;
}
.fade-leave-active {
    transition: opacity 0.3s;
    opacity: 0;
}
</style>