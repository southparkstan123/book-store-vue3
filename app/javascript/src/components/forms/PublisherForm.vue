<template>
  <Transition :appear="true" name="fade">
    <div v-if="!publisherForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onUpdateRecord">
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
import { fetchRecordById } from '../../services/CRUDServices'
import ErrorFeedback from '../ErrorFeedback.vue';

const props = defineProps<{ id: number }>()
const { errors, publisherForm, onHandleError } = usePublisherForm()
const modalStore = useModalStore()

const fetch = async (id: number) => {
  publisherForm.isLoading = true
  try {
    const response = await fetchRecordById(id, 'publisher')
    publisherForm.form.name = response.data.name;
    publisherForm.form.description = response.data.description;
  } catch (error) {
    onHandleError(error);
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

const onUpdateRecord = () => {
  console.log(`submit with`, publisherForm.form)
}

onMounted(() => {
  if(props.id) {
    publisherForm.mode = 'edit';
    fetch(props.id);
  }
})

</script>

<style scoped></style>