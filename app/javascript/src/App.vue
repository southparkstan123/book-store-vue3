<template>
  <div v-body-scroll-lock="modalState.visible || isOpenMenu" class="mx-auto">
    <ModalComponent
      :showModalContent="modalState.visible"
      :type="modalState.type"
      @closeMenu="closeModal"
    >
      <template #header>
        <span
          class="float-left modal-title text-primary text-xl font-extrabold"
        >
          {{ modalState.title }}
        </span>
      </template>

      <template #close-button>
        <div class="cursor-pointer" @click="closeModal">
          <font-awesome-icon icon="fa-solid fa-remove" />
        </div>
      </template>

      <template #message-body>
        <p>{{ modalState.message }}</p>
      </template>

      <template #form-body>
        <component :is="modalState.component" v-bind="modalState.props" />
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
            @buttonClicked="closeModal"
            :buttonType="'button'"
            :textClass="'text-sm'"
            :backgroundClass="'bg-white py-2 px-4'"
          >
            <template #text> Cancel </template>
          </ButtonComponent>
        </div>
        <div v-else>
          <ButtonComponent
            @buttonClicked="closeModal"
            :buttonType="'button'"
            :textClass="'text-sm text-white'"
            :backgroundClass="'bg-success py-2 px-4'"
          >
            <template #text> Close </template>
          </ButtonComponent>
        </div>
      </template>
    </ModalComponent>
    <MyVueNavBar
      v-if="userStore.isAuthenticated"
      :backgroundClass="'bg-navbar'"
      @bodyScrollLock="onBodyScrollLock"
    >
      <template #brand>
        <router-link class="nav-brand-item" to="/"> Book Store </router-link>
      </template>
      <template #body-content>
        <router-link class="nav-main-item" to="/book/list">
          <font-awesome-icon icon="fa-solid fa-book" /> Book
        </router-link>
        <router-link class="nav-main-item" to="/publisher/list">
          <font-awesome-icon icon="fa-solid fa-building" /> Publisher
        </router-link>
        <router-link class="nav-main-item" to="/author/list">
          <font-awesome-icon icon="fa-solid fa-pen-nib" /> Author
        </router-link>
      </template>
      <template #footer-content>
        <a class="nav-footer-item" @click="openTemplateForm">
          <font-awesome-icon icon="fa-solid fa-palette" /> Setting
        </a>
        <a class="nav-footer-item" @click="showUserInfo">
          <font-awesome-icon icon="fa-solid fa-user-secret" /> User info
        </a>
        <a class="nav-footer-item" @click="onLogout">
          <font-awesome-icon icon="fa-solid fa-door-open" /> Logout
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
        <svg width="25px" height="25px">
          <line
            x1="5"
            y1="20"
            x2="20"
            y2="5"
            class="stroke-menu-button"
            stroke-width="2"
          />
          <line
            x1="5"
            y1="5"
            x2="20"
            y2="20"
            class="stroke-menu-button"
            stroke-width="2"
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
      props: undefined,
      isFitContent: true,
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
    props: undefined,
    isFitContent: true,
  });
};

import TemplateForm from "./components/forms/TemplateForm.vue";
const openTemplateForm = () => {
  modalStore.open({
    title: "Setting",
    type: "content",
    component: TemplateForm,
    message: "",
    props: undefined,
    isFitContent: true,
  });
};

import { useThemeStore } from "@/store/theme";
import { ref } from "vue";
const themeStore = useThemeStore();
themeStore.onToggleTheme();
themeStore.changeValuePerPage();

const isOpenMenu = ref<boolean>(false);
const onBodyScrollLock = (payload: boolean) => (isOpenMenu.value = payload);

const vBodyScrollLock = (el: HTMLElement, binding) => {
  const isBodyScrollLock: boolean = binding.value as boolean;
  document.documentElement.style.overflow =
    isBodyScrollLock === true ? "hidden" : "auto";
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
