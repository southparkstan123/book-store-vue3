<template>
  <div class="mx-auto">
    <MyVueNavBar :backgroundColor="'red'">
      <template #body-content>
        <router-link class="cursor-pointer link" to="/book/list">Book</router-link>
        <router-link class="cursor-pointer link" to="/publisher/list">Publisher</router-link>
        <router-link class="cursor-pointer link" to="/author/list">Author</router-link>
      </template>
    </MyVueNavBar>
    <router-view v-slot="{ Component }">
      <transition name="slide-upward" :duration="1000">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useNavBar } from '../hooks/useNavBar'
import MyVueNavBar from './menu/MyVueNavBar.vue';

</script>

<style lang="scss">
.button {
  background-color: gray;
  border: none;
  color: white;
  padding: 8px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  &.info {
    background-color: blue;
  }

  &.success {
    background-color: green;
  }

  &.danger {
    background-color: red;
  }
}

.slide-upward-enter-active,
.slide-upward-leave-active {
  transition: all 1s ease-in-out 1s;
}

.slide-upward-enter-from {
  transform: translateY(10%);
  opacity: 0;
}

.slide-upward-leave-to {
  transform: translateY(10%);
  opacity: 0;
}
</style>