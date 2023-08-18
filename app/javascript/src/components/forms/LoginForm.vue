<template>
  <form class="mt-8 space-y-6" @submit.prevent="onLogin">
    <InputField 
      :inputId="'username'"
      :inputType="'text'" 
      :placeholder="'Username'"
      @changeValue="onChangeUsername"
      :isDisabled="disableInputs"
    ></InputField>
    <InputField 
      :inputId="'password'"
      :inputType="'password'" 
      :placeholder="'Password'"
      @changeValue="onChangePassword"
      :isDisabled="disableInputs"
    ></InputField>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <ButtonComponent
          :isDisabled="disableInputs" 
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
          :isDisabled="disableInputs" 
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
import { ref, reactive } from 'vue'

// From Router
import { useRouter } from 'vue-router'
const router = useRouter()

// Components
import InputField from '@/components/inputs/InputField.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

// From stores
import { useModalStore } from '@/store/modal'
import { useUserStore } from '@/store/user'
const { signin, state }  = useUserStore()
const modalStore = useModalStore()

import { type LoginForm } from '@/services/AuthServices'

const disableInputs = ref<boolean>(false)

const onLogin = async () => {
  try {
    disableInputs.value = true;
    await signin(loginForm.form)
    if(state.token) {
      router.replace('/')
    }
  } catch (error) {
    modalStore.open({
      type: 'alert',
      title: 'Error',
      component: '',
      message: 'Invalid username or password.'
    })
  } finally {
    disableInputs.value = false;
  }
}

const loginForm = reactive<LoginForm>({
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