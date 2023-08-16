<template>
  <Transition :appear="true" name="fade">
    <div v-if="!authorForm.isLoading" class="max-w-md w-full space-y-8">
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateAuthorRecord">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input :value="authorForm.form.name" class="block w-full mt-1" type="text" name="name" id="name" />
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <textarea :value="authorForm.form.description" class="block w-full mt-1" name="description" id="description"></textarea>
            </label>
          </div>
        </div>
        <div class="block">
          <button class="bg-green-500 hover:bg-green-700 text-white rounded p-4">Submit Author</button>
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
import { useAuthorForm } from '../../hooks/useAuthorForm'
import { useModalStore } from '../../store/modal'

const props = defineProps<{ id: number }>()
const { authorForm } = useAuthorForm()
const isError = ref<boolean>(false)
const modalStore = useModalStore()

const fetchRecordById = async (id: number) => {
  authorForm.isLoading = true
  try {
    const response = await fetch(`/api/v1/author/${id}`);
    const result = await response.json();
    authorForm.form = result;
  } catch (error) {
    isError.value = true
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  } finally {
    authorForm.isLoading = false
  }
}

const onUpdateAuthorRecord = () => {
  console.log('submit author with', authorForm.form)
}

onMounted(() => {
  fetchRecordById(props.id)
})

</script>

<style scoped></style>