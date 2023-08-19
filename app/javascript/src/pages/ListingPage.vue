<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade" mode="out-in">
      <div v-if="!isLoading" class="my-12">
        <div v-if="!isError">
          <div v-if="data.length > 0">
            <TableComponent :data="data" :fields="fields">
              <template #caption>
                <router-link to="add">{{ caption }}</router-link>
              </template>
              <template #creator="{ item }">
                {{ item.creator.username }}
              </template>
              <template #updater="{ item }">
                {{ item.updater.username }}
              </template>
              <template #publisher="{ item }">
                {{ item.publisher.name }}
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
                  <ButtonComponent @buttonClicked="action('edit', item.id)" :buttonType="'button'"
                    :textClass="'text-sm text-white'" :backgroundClass="'bg-green-500 py-2 px-4'">
                    <template #text>
                      Edit
                    </template>
                  </ButtonComponent>
                  <ButtonComponent @buttonClicked="action('delete', item.id)" :buttonType="'button'"
                    :textClass="'text-sm text-white'" :backgroundClass="'bg-red-500 py-2 px-4'">
                    <template #text>
                      Delete
                    </template>
                  </ButtonComponent>
                </td>
              </template>
              <template #footer>
                <span>{{ pagination.from }} - {{ pagination.to }} of {{ pagination.count }} {{ pagination.count > 1 ?
                  'records' : 'record' }}
                </span>
              </template>
              <template #pagination>
                <PaginationComponent :prev="pagination.prev" :next="pagination.next" :items="pagination.items"
                  :last="pagination.last" :page="pagination.page" :pages="pagination.pages" :from="pagination.from"
                  :to="pagination.to" :count="pagination.count" @toPage="changeCurrentPage">
                </PaginationComponent>
              </template>
            </TableComponent>
          </div>
          <div v-else>
            <div class="text-center">
              <h1 class="text-2xl text-red-500">No {{ category }}</h1>
              <router-link to="add">Add {{ category }}</router-link>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-center">
            <h1 class="text-2xl text-red-500">Oops! Error occurs.</h1>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center text-2xl text-red-500">Loading...</h1>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
type Module = "book" | "author" | "publisher";
type ActionType = "view" | "edit" | "delete";

import { onMounted, ref, computed, watch, onUpdated } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import type { TableItem, TableField } from '@/components/TableComponent.vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import moment from 'moment'
import { useModalStore } from '@/store/modal'
import { deleteRecordById } from '@/services/CRUDServices';

import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';

const props = defineProps<{ category: Module }>()
const router = useRouter()
const route = useRoute()
const caption = computed(() => `Add ${props.category}`)
const data = ref<TableItem[]>([]);
const pagination = ref<any>({});
const currentPage = ref<number>(1);
const perPage = ref<number>(5);
const changeCurrentPage = (payload) => {
  currentPage.value = payload
};
const fields = computed<TableField[]>(() => {
  const idField = [{ key: 'id', label: 'ID' }]
  const defaultFields = [{ key: 'created_at', label: 'Created at' }, { key: 'updated_at', label: 'Updated at' }]

  switch (props.category) {
    case 'book':
      return [...idField, { key: 'name', label: 'Name' }, { key: 'price', label: 'Price (USD)' }, ...defaultFields]
    case 'author':
      return [...idField, { key: 'name', label: 'Name' }, ...defaultFields]
    case 'publisher':
      return [...idField, { key: 'name', label: 'Name' }, ...defaultFields]
    default:
      return undefined
  }
});
const modalStore = useModalStore()
const fetchRecords = async (module: Module, page: number, perPage: number) => {
  try {
    const response = await fetch(`/api/v1/${module}/list?page=${page}&per=${perPage}`);
    const result = await response.json();
    data.value = result.data;
    pagination.value = result.pagination;
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
    if (type === 'edit') {
      router.push({ path: `/${props.category}/${type}/${id}`, replace: true })
    } else {
      const confirm = await modalStore.open({
        title: 'Delete',
        message: 'Are you sure?',
        type: 'confirm',
        component: ''
      })

      if (confirm) {
        await deleteRecordById(id, props.category)
        router.push(`/${props.category}/list`)
      }
    }
  } catch (error) {
    isError.value = true
  }
};

const isLoading = ref<boolean>(true)
const isError = ref<boolean>(false)

onMounted(() => {
  fetchRecords(props.category, currentPage.value, perPage.value);
})

watch([() => props.category, () => currentPage.value], ([newCategory, newCurrentPage]) => {
  fetchRecords(newCategory, newCurrentPage, perPage.value);
})

watch(() => route.params, () => {
  isLoading.value = true;
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