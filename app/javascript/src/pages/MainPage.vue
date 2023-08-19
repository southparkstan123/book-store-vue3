<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <ButtonComponent
        @buttonClicked="openModal"
        :buttonType="'button'"
        :textClass="'text-sm text-white'"
        :backgroundClass="'bg-green-400 py-2 px-4'"
      >
        <template #text>
          Open Modal
        </template>
      </ButtonComponent>
      <InputField 
        :inputId="'test'"
        :className="''"
        :inputValue="message" 
        :inputFieldClass="'block w-full mt-1'"
        :inputType="'text'" 
        :placeholder="'name'"
        @changeValue="actionWithDebounce"
      ></InputField>
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import debounce from 'lodash.debounce'

import { useModalStore } from '@/store/modal'
import InputField from '@/components/inputs/InputField.vue';
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
const modalStore = useModalStore()

const openModal = () => {
  modalStore.open({
    title: 'Greeting',
    type: 'alert',
    component: '',
    message: 'Welcome to Book-store on Vue3! This is Main Page.'
  })
}

const message = ref('')

const actionWithDebounce = debounce((payload) => {
  message.value = payload
}, 1000)

</script>

<style scoped>

</style>