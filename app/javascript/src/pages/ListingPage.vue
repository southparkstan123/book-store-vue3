<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade" mode="out-in">
      <div v-if="!isLoading" class="overflow-x-auto my-12">
        <div v-if="!isError">
          <div >
            <TableComponent :data="data" :fields="fields" :style="`width: 960px;`">
              <template #search-bar>
                <InputField 
                  v-if="category === 'book'"
                  :inputId="'test'"
                  :className="''"
                  :inputValue="keyword" 
                  :inputFieldClass="'float-right'"
                  :inputType="'text'" 
                  :placeholder="`Search by name`"
                  @changeValue="searchKeyword"
                >
                </InputField>
                <ButtonComponent @buttonClicked="toAddPage" :buttonType="'button'"
                  :textClass="'float-left text-sm text-white'" :backgroundClass="'bg-blue-700 py-2 px-4'">
                  <template #text>
                    Add {{ category }}
                  </template>
                </ButtonComponent>
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
                <div class="footer-item">
                  {{ pagination.from }} - {{ pagination.to }} of {{ pagination.count }} {{ pagination.count > 1 ? 'records' : 'record' }}
                </div>
              </template>
              <template #pagination>
                <PaginationComponent :prev="pagination.prev" :next="pagination.next" :items="pagination.items"
                  :last="pagination.last" :page="pagination.page" :pages="pagination.pages" :from="pagination.from"
                  :to="pagination.to" :count="pagination.count" @toPage="changeCurrentPage">
                </PaginationComponent>
              </template>
            </TableComponent>
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
import debounce from 'lodash.debounce'

import { onMounted, ref, computed, watch } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import type { TableItem, TableField } from '@/components/TableComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import { useModalStore } from '@/store/modal'
import { deleteRecordById, fetchRecords as _fetchRecords } from '@/services/CRUDServices';

import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import InputField from '@/components/inputs/InputField.vue';

const keyword = ref<string>('')
const props = defineProps<{ category: Module }>()
const router = useRouter()
const route = useRoute()
const data = ref<TableItem[]>([]);
const pagination = ref<any>({});
const currentPage = ref<number>(1);
const perPage = ref<number>(10);
const changeCurrentPage = (payload) => {
  currentPage.value = payload
};
const fields = computed<TableField[] | undefined>(() => {
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
const fetchRecords = async (category: Module, page: number, perPage: number, keyword: string) => {
  try {
    const response = await _fetchRecords(category, page, perPage, keyword);
    data.value = response.data.data;
    pagination.value = response.data.pagination;
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

const toAddPage = (type: ActionType) => {
  router.push({ path: `/${props.category}/add`, replace: true })
}

const isLoading = ref<boolean>(true)
const isError = ref<boolean>(false)

onMounted(() => {
  fetchRecords(props.category, currentPage.value, perPage.value, keyword.value);
})

const searchKeyword = debounce((payload) => {
  keyword.value = payload
}, 2000)

watch([
  () => props.category, 
  () => currentPage.value,
  () => keyword.value
], ([newCategory, newCurrentPage, newKeyword], [oldCategory, oldCurrentPage, oldKeyword]) => {
  if(newKeyword !== oldKeyword) {
    fetchRecords(newCategory, 1, perPage.value, newKeyword);
  } else {
    fetchRecords(newCategory, newCurrentPage, perPage.value, newKeyword);
  }
})

watch(() => route.params, () => {
  isLoading.value = true;
})

</script>

<style lang="scss" scoped>
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

.footer-item {
  display: inline-flex;
  justify-content: center;
  padding: 2px;
  height: 30px;
  margin: 3px 1px;
}
</style>