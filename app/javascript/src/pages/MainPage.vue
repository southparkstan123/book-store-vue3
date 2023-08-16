<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <button class="button bg-green-400" @click="openModal">Open Modal</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '../store/modal'
const modalStore = useModalStore()

const openModal = () => {
  modalStore.open({
    title: 'Greeting',
    type: 'alert',
    component: '',
    message: 'Welcome to Book-store on Vue3! This is Main Page.'
  })
}

</script>

<style scoped>

</style>