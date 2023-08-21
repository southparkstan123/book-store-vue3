<template>
  <div class="mx-auto">
    <ModalComponent
      :showModalContent="modalState.visible"
      :type="modalState.type"
      @closeMenu="closeModal"
    >
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

      <template #footer="{ type }">
        <div v-if="type === 'confirm'">
          <ButtonComponent
            @buttonClicked="modalStore.confirm()"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-red-500 py-2 px-4'"
          >
            <template #text> OK </template>
          </ButtonComponent>
          <ButtonComponent
            @buttonClicked="modalStore.close()"
            :buttonType="'button'"
            :textClass="'text-sm'"
            :backgroundClass="'bg-white py-2 px-4'"
          >
            <template #text> Cancel </template>
          </ButtonComponent>
        </div>
        <div v-else>
          <ButtonComponent
            @buttonClicked="modalStore.close()"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-green-500 py-2 px-4'"
          >
            <template #text> OK </template>
          </ButtonComponent>
        </div>
      </template>
    </ModalComponent>
    <MyVueNavBar
      v-if="userStore.isAuthenticated"
      :backgroundColor="backgroundColor"
      :percentageOfWidthOfMoblieMenu="percentageOfWidthOfMoblieMenu"
    >
      <template #body-content>
        <router-link class="cursor-pointer link text-lime-500" to="/"
          >Main</router-link
        >
        <router-link class="cursor-pointer link text-lime-500" to="/book/list"
          >Book</router-link
        >
        <router-link
          class="cursor-pointer link text-lime-500"
          to="/publisher/list"
          >Publisher</router-link
        >
        <router-link class="cursor-pointer link text-lime-500" to="/author/list"
          >Author</router-link
        >
      </template>
      <template #footer-content>
        <a class="cursor-pointer link mx-2 text-red-400" @click="showUserInfo">
          User info
        </a>
        <a class="cursor-pointer link mx-2 text-red-400" @click="onLogout">
          Logout
        </a>
      </template>
      <template #open-button>
        <svg width="50px" height="50px">
          <line
            x1="10"
            y1="15"
            x2="40"
            y2="15"
            stroke="lime"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="25"
            x2="40"
            y2="25"
            stroke="lime"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="35"
            x2="40"
            y2="35"
            stroke="lime"
            stroke-width="3"
          />
        </svg>
      </template>

      <template #close-button>
        <svg width="50px" height="50px">
          <line
            x1="10"
            y1="40"
            x2="40"
            y2="10"
            stroke="lime"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="10"
            x2="40"
            y2="40"
            stroke="lime"
            stroke-width="3"
          />
        </svg>
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
import { storeToRefs } from "pinia";

// Router
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// Modal
import { useModalStore } from "@/store/modal";
import ModalComponent from "@/components/modal/ModalComponent.vue";
const modalStore = useModalStore();
const modalState = storeToRefs(modalStore).state;

// NavBar
import MyVueNavBar from "@/components/menu/MyVueNavBar.vue";
import { useNavBar } from "@/hooks/useNavBar";
const { backgroundColor, percentageOfWidthOfMoblieMenu } = useNavBar();

// UserInfo
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

import ButtonComponent from "@/components/inputs/ButtonComponent.vue";

const closeModal = () => {
  modalStore.close();
};

const onLogout = async () => {
  if (!route.meta.haveForm) {
    const confirm = await modalStore.open({
      type: "confirm",
      title: "Logout",
      message: "Are you sure?",
      component: "",
    });

    if (confirm) {
      userStore.signout().then(() => {
        router.push("/signin");
      });
    }
  } else {
    router.push("/signin");
  }
};

const showUserInfo = () => {
  modalStore.open({
    title: userStore.getUserInfo.username,
    message: userStore.getUserInfo.email,
    component: "",
    type: "alert",
  });
};
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
