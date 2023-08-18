<template>
  <Transition :appear="true" name="fade">
    <div v-if="!authorForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <InputField 
                :inputId="'name'"
                :className="''"
                :inputValue="authorForm.form.name" 
                :inputFieldClass="'block w-full mt-1'"
                :inputType="'text'" 
                :placeholder="'Name'"
                @changeValue="onChangeName"
              ></InputField>
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <TextArea
                :inputId="'description'"
                :inputName="'description'"
                :inputFieldClass="'block w-full mt-1'" 
                :inputValue="authorForm.form.description" 
                @changeValue="onChangeDescription"
              ></TextArea>
            </label>
          </div>
        </div>
        <div class="block">
          <ButtonComponent 
            :buttonType="'submit'" 
            :textClass="'text-sm font-medium justify-center text-white'"
            :backgroundClass="'group relative bg-green-300 w-full flex py-2 px-4 border border-transparent rounded-md'"
          >
            <template #text>
              Submit
            </template>
          </ButtonComponent>
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
import { useAuthorForm } from '../../hooks/useAuthorForm'
import { useModalStore } from '../../store/modal'
import { fetchRecordById, updateRecordById, createRecord } from '../../services/CRUDServices'
import { useRouter } from 'vue-router'

// Inputs
import InputField from '../inputs/InputField.vue'
import TextArea from '../inputs/TextArea.vue'
import ButtonComponent from '../inputs/ButtonComponent.vue'

import ErrorFeedback from '../ErrorFeedback.vue';

const props = defineProps<{ id: number }>()
const { errors, authorForm } = useAuthorForm()
const modalStore = useModalStore()

const router = useRouter()

const fetch = async (id: number) => {
  authorForm.isLoading = true
  try {
    const response = await fetchRecordById(id, 'author')
    authorForm.form.name = response.data.name;
    authorForm.form.description = response.data.description;
  } catch (error) {
    errors.value = error.response.data.errors
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

watch(() => authorForm.form, (newValue, oldValue) => {
  if(newValue !== oldValue) {
    authorForm.isFormChanged = true
  }
})

const onChangeName = (payload) => {
  authorForm.form.name = payload
}

const onChangeDescription = (payload) => {
  authorForm.form.description = payload
}


const onSubmit = async () => {
  console.log('submit with', authorForm.form)

  try {
    authorForm.isFormChanged = false;
    let response: any = {};

    if (authorForm.mode === 'edit') {
      response = await updateRecordById(props.id, authorForm.form, 'author')
    } else {
      response = await createRecord(authorForm.form, 'author')
    }

    router.push('/author/list')

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
  if (props.id) {
    authorForm.mode = 'edit';
    fetch(props.id);
  }
})
</script>

<style scoped></style>