<template>
  <form class="mt-8 space-y-6" @submit.prevent="onLogin">
    <div class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm">
      <input type="text" placeholder="Username"/>
    </div>
    <div class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm">
      <input type="password" placeholder="Password"/>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <button>Login</button>
      </div>
      <div class="flex items-center">
        <button>Register</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const onLogin = () => {
  console.log('login');
}
</script>

<style scoped>

</style>