<template>
  <Transition :appear="true" name="fade">
    <div v-if="!bookForm.isLoading" class="max-w-md w-full space-y-8">
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateAuthorRecord">
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
                <DropdownComponent :data="publishers" :isMultiple="false">
                  <template #options="publishers">
                    <option v-for="item in publishers" :value="item.id">{{ item.label }}</option>
                  </template>
                </DropdownComponent>
              </label>
              <label class="block" for="authors">
                <span class="text-gray-700">Authors</span>
                <DropdownComponent :data="authors" :isMultiple="true">
                  <template #options="authors">
                    <option v-for="item in authors" :value="item.id">{{ item.label }}</option>
                  </template>
                </DropdownComponent>
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
import { ref, onMounted } from 'vue';
import { useBookForm } from '../../hooks/useBookForm'
import { useModalStore } from '../../store/modal'

import DropdownComponent from '../dropdown/DropdownComponent.vue'

const props = defineProps<{ id: number }>()
const { bookForm } = useBookForm()
const isError = ref<boolean>(false)
const modalStore = useModalStore()

// For Dropdown
const authors = ref([{id: 1, name: 'author1', label: 'Author 1'}, {id: 2, name: 'author2', label: 'Author 2'}])
const publishers = ref([{id: 1, name: 'publisher1', label: 'Publisher1'}, {id: 2, name: 'publisher2', label: 'Publisher2'}])

const fetchRecordById = async (id: number) => {
  bookForm.isLoading = true
  try {
    const response = await fetch(`/api/v1/book/${id}`);
    const result = await response.json();
    bookForm.form = result;
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

const onChangeName = (event: any) => {
  bookForm.form.name = event.target.value
}

const onChangeAbstract = (event: any) => {
  bookForm.form.abstract = event.target.value
}

const onChangePrice = (event: any) => {
  bookForm.form.price = event.target.value
}

const onUpdateAuthorRecord = () => {
  console.log('submit author with', bookForm)
}

onMounted(() => {
  fetchRecordById(props.id)
})

</script>

<style scoped></style>