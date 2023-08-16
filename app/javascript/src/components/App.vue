<template>
  <div class="mx-auto">
    <ModalComponent :showModalContent="modal.visible" :type="modal.type" @closeMenu="closeModal">
      <template #header>
        <h4 class="modal-title">
          {{ modal.title }}
        </h4>
      </template>

      <template #message-body>
        <p>{{ modal.message }}</p>
      </template>

      <template #form-body>
        <component :is="modal.component" />
      </template>
    </ModalComponent>
    <MyVueNavBar :backgroundColor="'red'">
      <template #body-content>
        <router-link class="cursor-pointer link" to="/book/list">Book</router-link>
        <router-link class="cursor-pointer link" to="/publisher/list">Publisher</router-link>
        <router-link class="cursor-pointer link" to="/author/list">Author</router-link>
        <button class="button bg-green-400" @click="openModal">Open Modal</button>
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
import { reactive, onMounted } from 'vue';
// import { useNavBar } from '../hooks/useNavBar'
import MyVueNavBar from './menu/MyVueNavBar.vue';
import ModalComponent from './modal/ModalComponent.vue';

type ModelType ='alert' | 'confirm' | 'form';

type Modal = {
  visible: boolean;
  type: ModelType;
  message: string;
  title: string;
  component: string;
  resolvePromise: any
}

const modal = reactive<Modal>({
  visible: false,
  type: 'alert',
  message: '',
  title: '',
  component: '',
  resolvePromise: undefined
})

const openModal = () => {
  modal.visible = true;
  modal.title = 'Greeting';
  modal.type = 'alert';
  modal.component = '';
  modal.message = 'Welcome to Book-store on Vue3!';
}

const closeModal = () => {
  modal.visible = false;
  modal.title = '';
  modal.type = 'alert';
  modal.component = '';
  modal.message = '';
}

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