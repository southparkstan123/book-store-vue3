<template>
  <Transition :appear="true" name="fade">
    <div v-if="!publisherForm.isLoading" class="max-w-md w-full space-y-8">
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateAuthorRecord">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <input 
                :value="publisherForm.form.name" 
                class="block w-full mt-1" 
                type="text" 
                name="name" 
                id="name"
                @input="onChangeName"
              />
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <textarea 
                :value="publisherForm.form.description" 
                class="block w-full mt-1" 
                name="description" 
                id="description"
                @input="onChangeDescription"
              ></textarea>
            </label>
          </div>
        </div>
        <div class="block">
          <button>Submit Publisher</button>
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
import { usePublisherForm } from '../../hooks/usePublisherForm'
import { useModalStore } from '../../store/modal'

const props = defineProps<{ id: number }>()
const { publisherForm } = usePublisherForm()
const isError = ref<boolean>(false)
const modalStore = useModalStore()

const fetchRecordById = async (id: number) => {
  publisherForm.isLoading = true
  try {
    const response = await fetch(`/api/v1/publisher/${id}`);
    const result = await response.json();
    publisherForm.form = result;
  } catch (error) {
    isError.value = true
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  } finally {
    publisherForm.isLoading = false
  }
}

const onChangeName = (event: any) => {
  publisherForm.form.name = event.target.value
}

const onChangeDescription = (event: any) => {
  publisherForm.form.description = event.target.value
}

const onUpdateAuthorRecord = () => {
  console.log('submit author with', publisherForm.form)
}

onMounted(() => {
  fetchRecordById(props.id)
})

</script>

<style scoped></style>