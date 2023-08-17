<template>
  <Transition :appear="true" name="fade">
    <div v-if="!bookForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-2 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input :value="bookForm.form.name" class="block w-full mt-1" type="text" name="name" id="name"
                @input="onChangeName" />
            </label>
            <label class="block" for="abtract">
              <span class="text-gray-700">Abstract</span>
              <textarea :value="bookForm.form.abstract" class="block w-full mt-1" name="description" id="description"
                @input="onChangeAbstract"></textarea>
            </label>
            <label class="block" for="price">
              <span class="text-gray-700">Price</span>
              <input class="block w-full mt-1" type="number" name="price" step="0.1" min="0"
                v-model.number="bookForm.form.price" @change="onChangePrice" />
            </label>
          </div>
          <div class="grid grid-cols-2 gap-6">
              <label class="block" for="publisher">
                <span class="text-gray-700">Publisher</span>
                <DropdownMenu 
                  :data="publishers" 
                  :selectedItem="bookForm.form.publisher_id"
                  @selectedItem="onChangePublisher"
                >
                </DropdownMenu>
              </label>
              <label class="block" for="authors">
                <span class="text-gray-700">Authors</span>
                <MultiSelectDropdown 
                  :data="authors" 
                  :selectedItems="bookForm.form.author_ids"
                  @selectedItems="onChangeAuthors"
                >
                </MultiSelectDropdown>
              </label>
            </div>
        </div>
        <div class="block">
          <button type="submit">Submit Book</button>
        </div>
      </form>
    </div>
    <div v-else>
      <h1 class="text-center text-2xl text-red-500">Loading...</h1>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useBookForm, type BookForm } from '../../hooks/useBookForm'
import { useModalStore } from '../../store/modal'

import DropdownMenu from '../dropdown/DropdownMenu.vue'
import ErrorFeedback from '../ErrorFeedback.vue';

import { fetchRecordById, updateRecordById, createRecord, fetchRecords } from '../../services/CRUDServices'
import MultiSelectDropdown from '../dropdown/MultiSelectDropdown.vue';
import { useRouter } from 'vue-router'

const props = defineProps<{ id: number }>()
const { errors, bookForm } = useBookForm()
const isError = ref<boolean>(false)
const modalStore = useModalStore()

// For Dropdowns
const authors = ref([])
const publishers = ref([])

const router = useRouter()

const fetch = async (id: number) => {
  bookForm.isLoading = true
  try {
    const bookAPI = await fetchRecordById(id, 'book')

    bookForm.form.name = bookAPI.data.name;
    bookForm.form.price = bookAPI.data.price;
    bookForm.form.abstract = bookAPI.data.abstract;
    bookForm.form.publisher_id = bookAPI.data.publisher.id;
    bookForm.form.author_ids = bookAPI.data.authors.map(e => e.id);

  } catch (error) {
    isError.value = true
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  } finally {
    bookForm.isLoading = false
  }
}

const fetchForDropdowns = async () => {
  try {
    const authorsAPI = await fetchRecords('author')
    const publishersAPI = await fetchRecords('publisher')

    const response = await Promise.all([authorsAPI, publishersAPI])

    authors.value = response[0].data
    publishers.value = response[1].data

  } catch (error) {
    errors.value = error.response.data.errors
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  }
}

const onChangeName = (event: any) => {
  bookForm.form.name = event.target.value
}

const onChangeAbstract = (event: any) => {
  bookForm.form.abstract = event.target.value
}

const onChangePrice = (event: any) => {
  bookForm.form.price = event.target.value
}

const onChangePublisher = (payload) => {
  bookForm.form.publisher_id = payload
}

const onChangeAuthors = (payload) => {
  bookForm.form.author_ids = payload
}

const onSubmit = async () => {
  console.log('submit with', bookForm)

  try {
    bookForm.isFormChanged = false;
    let response: any = {};

    if (bookForm.mode === 'edit') {
      response = await updateRecordById(props.id, bookForm.form, 'book')
    } else {
      response = await createRecord(bookForm.form, 'book')
    }

    router.push('/book/list')

    modalStore.open({
      title: 'Success',
      message: response.data.message,
      type: 'alert',
      component: ''
    })

  } catch (error) {
    errors.value = error.response.data.errors;
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.statusText,
      type: 'alert',
      component: ''
    })
  }
}

onMounted(() => {
  if(props.id) {
    bookForm.mode = 'edit';
    fetch(props.id);
  }
  fetchForDropdowns();
})

watch(() => bookForm.form, (newValue: BookForm, oldValue: BookForm) => {
  if(newValue !== oldValue) {
    bookForm.isFormChanged = true
  }
})

</script>

<style scoped></style>