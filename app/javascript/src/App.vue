<template>
  <div v-body-scroll-lock="true" class="mx-auto">
    <ModalComponent
      :showModalContent="modalState.visible"
      :type="modalState.type"
      @closeMenu="closeModal"
    >
      <template #header>
        <h1 class="modal-title text-primary text-xl font-extrabold">
          {{ modalState.title }}
        </h1>
      </template>

      <template #message-body>
        <p>{{ modalState.message }}</p>
      </template>

      <template #form-body>
        <component :is="modalState.component" v-bind="modalState.props"/>
      </template>

      <template #footer="{ type }">
        <div v-if="type === 'confirm'">
          <ButtonComponent
            @buttonClicked="modalStore.confirm()"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-success py-2 px-4'"
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
            :backgroundClass="'bg-success py-2 px-4'"
          >
            <template #text> {{ (type === 'content') ? 'Close Modal' : 'OK' }} </template>
          </ButtonComponent>
        </div>
      </template>
    </ModalComponent>
    <MyVueNavBar
      v-if="userStore.isAuthenticated"
      :backgroundClass="'bg-navbar'"
      :percentageOfWidthOfMoblieMenu="percentageOfWidthOfMoblieMenu"
    >
      <template #brand>
        <router-link class="cursor-pointer link" :class="route.path === '/' ? 'text-muted' : 'text-menu-brand'" to="/">
          Book Store
        </router-link>
      </template>
      <template #body-content>
        <router-link class="cursor-pointer link" :class="route.path === '/book/list' ? 'text-muted' : 'text-menu-item'" to="/book/list">
          Book
        </router-link>
        <router-link class="cursor-pointer link" to="/publisher/list" :class="route.path === '/publisher/list' ? 'text-muted' : 'text-menu-item'">
          Publisher
        </router-link>
        <router-link class="cursor-pointer link" :class="route.path === '/author/list' ? 'text-muted' : 'text-menu-item'" to="/author/list">
          Author
        </router-link>
      </template>
      <template #footer-content>
        <a class="cursor-pointer link mx-2 text-sm text-menu-item" @click="openTemplateForm">
          Setting
        </a>
        <a class="cursor-pointer link mx-2 text-sm text-menu-item" @click="showUserInfo">
          User info
        </a>
        <a class="cursor-pointer link mx-2 text-sm text-menu-item" @click="onLogout">
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
            class="stroke-menu-button"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="25"
            x2="40"
            y2="25"
            class="stroke-menu-button"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="35"
            x2="40"
            y2="35"
            class="stroke-menu-button"
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
            class="stroke-menu-button"
            stroke-width="3"
          />
          <line
            x1="10"
            y1="10"
            x2="40"
            y2="40"
            class="stroke-menu-button"
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
const modalState = modalStore.getModalObject;

// NavBar
import MyVueNavBar from "@/components/menu/MyVueNavBar.vue";
import { useNavBar } from "@/hooks/useNavBar";
const { percentageOfWidthOfMoblieMenu } = useNavBar();

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
      props: undefined
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
    props: undefined
  });
};

import TemplateForm from "./components/forms/TemplateForm.vue";
const openTemplateForm = () => {
  modalStore.open({
    title: "Setting",
    type: "content",
    component: TemplateForm,
    message: "",
    props: undefined
  });
};

import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();
themeStore.onToggleTheme();
themeStore.changeValuePerPage();

const vBodyScrollLock = (el: HTMLElement, binding) => {
  const isBodyScrollLock: boolean = binding.value as boolean
  document.documentElement.style.overflow = (isBodyScrollLock === true) ? 'hidden' : 'auto';
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

html * {
  @apply transition-colors duration-500;
}
</style>
