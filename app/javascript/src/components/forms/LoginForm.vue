<template>
  <form class="mt-8 space-y-6" @submit.prevent="onLogin">
    <InputField 
      :inputId="'username'"
      :inputType="'text'" 
      :placeholder="'Username'"
      @changeValue="onChangeUsername"
    ></InputField>
    <InputField 
      :inputId="'password'"
      :inputType="'password'" 
      :placeholder="'Password'"
      @changeValue="onChangePassword"
    ></InputField>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <ButtonComponent
          :buttonType="'submit'"
          :textClass="'text-sm font-medium'"
          :backgroundClass="'group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
        >
          <template #text>
            Login
          </template>
        </ButtonComponent>
        
      </div>
      <div class="flex items-center">
        <ButtonComponent 
          @buttonClicked="toRegisterPage"
          :buttonType="'button'"
          :textClass="'text-sm text-blue-500'"
          :backgroundClass="' focus:outline-none'"
        >
          <template #text>
            Register
          </template>
        </ButtonComponent>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import InputField from '../inputs/InputField.vue'
import ButtonComponent from '../inputs/ButtonComponent.vue'
import { signin } from '../../services/AuthServices'
import { useModalStore } from '../../store/modal'

const router = useRouter()
const modalStore = useModalStore()

type LoginForm = {
  form: {
    username: string;
    password: string;
  }
}

const onLogin = async () => {
  try {
    const result = await signin(loginForm)
    if(result.data.token) {
      router.push('/')
    }
  } catch (error) {
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: 'alert',
      component: ''
    })
  }
}

const loginForm = reactive({
  form: {
    username: '',
    password: ''
  }
})

const onChangeUsername = (value: string) => {
  loginForm.form.username = value;
}

const onChangePassword = (value: string) => {
  loginForm.form.password = value;
}

const toRegisterPage = () => {
  router.push('/signup');
}
</script>

<style scoped>

</style>