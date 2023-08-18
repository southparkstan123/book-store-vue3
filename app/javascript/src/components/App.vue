<template>
  <div class="mx-auto">
    <ModalComponent :showModalContent="modalState.visible" :type="modalState.type" @closeMenu="closeModal">
      <template #header>
        <h4 class="modal-title">
          {{ modalState.title }}
        </h4>
      </template>

      <template #message-body>
        <p>{{ modalState.message }}</p>
      </template>

      <template #form-body>
        <component :is="modalState.component" />
      </template>
    </ModalComponent>
    <MyVueNavBar v-if="userStore.isAuthenticated" :backgroundColor="backgroundColor"
      :percentageOfWidthOfMoblieMenu="percentageOfWidthOfMoblieMenu">
      <template #body-content>
        <router-link class="cursor-pointer link" to="/">Main</router-link>
        <router-link class="cursor-pointer link" to="/book/list">Book</router-link>
        <router-link class="cursor-pointer link" to="/publisher/list">Publisher</router-link>
        <router-link class="cursor-pointer link" to="/author/list">Author</router-link>
      </template>
      <template #footer-content>
        <a class="cursor-pointer link mx-2" @click="onLogout">
          Logout
        </a>
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
import { storeToRefs } from 'pinia'

// Router
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// Modal
import { useModalStore } from '../store/modal'
import ModalComponent from './modal/ModalComponent.vue';
const modalStore = useModalStore()
const modalState = storeToRefs(modalStore).state

// NavBar
import MyVueNavBar from './menu/MyVueNavBar.vue'
import { useNavBar } from '../hooks/useNavBar'
const { backgroundColor, percentageOfWidthOfMoblieMenu } = useNavBar()

// UserInfo
import { useUserStore } from '../store/user'
const userStore = useUserStore()

const closeModal = () => {
  modalStore.close()
}

const onLogout = async () => {
  if (!route.meta.haveForm) {
    
    const confirm = await modalStore.open({
      type: 'confirm',
      title: 'Logout',
      message: 'Are you sure?',
      component: ''
    });

    if (confirm) {
      userStore.signout().then(() => {

        router.push('/signin')
      });
    }
  } else {
    router.push('/signin');
  }
}

</script>

<style lang="scss">
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