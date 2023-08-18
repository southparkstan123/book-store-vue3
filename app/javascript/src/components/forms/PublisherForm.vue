<template>
  <Transition :appear="true" name="fade">
    <div v-if="!publisherForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <InputField 
                  :inputId="'name'"
                  :className="''"
                  :inputValue="publisherForm.form.name" 
                  :inputFieldClass="'block w-full mt-1'"
                  :inputType="'text'" 
                  :placeholder="'name'"
                  @changeValue="onChangeName"
                ></InputField>
            </label>
            <label class="block" for="description">
              <span class="text-gray-700">Description</span>
              <TextArea
                  :inputId="'description'"
                  :inputName="'description'"
                  :inputFieldClass="'block w-full mt-1'" 
                  :inputValue="publisherForm.form.description" 
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
import { watch, onMounted } from 'vue';
import { usePublisherForm } from '../../hooks/usePublisherForm'
import { useModalStore } from '../../store/modal'
import { fetchRecordById, updateRecordById, createRecord } from '../../services/CRUDServices'
import ErrorFeedback from '../ErrorFeedback.vue';
import { useRouter } from 'vue-router'

// Inputs
import InputField from '../inputs/InputField.vue'
import TextArea from '../inputs/TextArea.vue'
import ButtonComponent from '../inputs/ButtonComponent.vue'

const props = defineProps<{ id: number }>()
const { errors, publisherForm } = usePublisherForm()
const modalStore = useModalStore()

const router = useRouter()

const fetch = async (id: number) => {
  publisherForm.isLoading = true
  try {
    const response = await fetchRecordById(id, 'publisher')
    publisherForm.form.name = response.data.name;
    publisherForm.form.description = response.data.description;
  } catch (error) {
    errors.value = error.response.data.errors
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

const onChangeName = (payload) => {
  publisherForm.form.name = payload
}

const onChangeDescription = (payload) => {
  publisherForm.form.description = payload
}

watch(() => publisherForm.form, (newValue, oldValue) => {
  if(newValue !== oldValue) {
    publisherForm.isFormChanged = true
  }
})

const onSubmit = async () => {
  console.log('submit with', publisherForm.form)

  try {
    publisherForm.isFormChanged = false;
    let response: any = {};

    if (publisherForm.mode === 'edit') {
      response = await updateRecordById(props.id, publisherForm.form, 'publisher')
    } else {
      response = await createRecord(publisherForm.form, 'publisher')
    }

    router.push('/publisher/list')

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
    publisherForm.mode = 'edit';
    fetch(props.id);
  }
})

</script>

<style scoped></style>