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
        <div class="cursor-pointer text-muted text-3xl" @click="closeModal">
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
        <a class="nav-brand-item">Book Store</a>
      </template>
      <template #body-content>
        <router-link class="mx-2 my-3 nav-main-item" to="/">
          <font-awesome-icon icon="fa-regular fa-image" /> Gallery (Beta)
        </router-link>

        <DropdownSideMenu :isAnimated="true">
          <template #button>
            <font-awesome-icon icon="fa-solid fa-book" /> Book
          </template>
          <template #content>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/book/list"
            >
              <font-awesome-icon class="mx-2" icon="fa-solid fa-list" /> List
            </router-link>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/book/add"
            >
              <font-awesome-icon class="mx-2" icon="fa-solid fa-plus" /> Add
            </router-link>
          </template>
        </DropdownSideMenu>

        <DropdownSideMenu :isAnimated="true">
          <template #button>
            <font-awesome-icon icon="fa-solid fa-at" /> Author
          </template>
          <template #content>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/author/list"
            >
              <font-awesome-icon class="mx-2" icon="fa-solid fa-list" /> List
            </router-link>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/author/add"
            >
              <font-awesome-icon class="mx-2" icon="fa-solid fa-plus" /> Add
            </router-link>
          </template>
        </DropdownSideMenu>

        <DropdownSideMenu :isAnimated="true">
          <template #button>
            <font-awesome-icon icon="fa-solid fa-building" /> Publisher
          </template>
          <template #content>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/publisher/list"
            >
              <font-awesome-icon icon="fa-solid fa-list" /> List
            </router-link>
            <router-link
              class="mx-2 my-3 nav-main-item whitespace-no-wrap"
              to="/publisher/add"
            >
              <font-awesome-icon icon="fa-solid fa-plus" /> Add
            </router-link>
          </template>
        </DropdownSideMenu>
      </template>
      <template #footer-content="{ isMobileView }">
        <DropdownSideMenu :isAnimated="true" :isFloatRight="true" :backgroundClassForContent="'lg:absolute lg:grid lg:mt-3 lg:pt-1 lg:w-max bg-primary block float-left px-4 my-2 w-full z-50'">
          <template #button>
            <font-awesome-icon icon="fa-solid fa-palette" /> Theme
          </template>

          <template #content>
            <div class="my-2">
              <TemplateForm />
            </div>
          </template>
        </DropdownSideMenu>

        <DropdownSideMenu
          v-if="!isMobileView"
          :isAnimated="true"
          :wrapperClass="'px-1 inline-block relative'"
          :buttonClass="'text-menu-item cursor-pointer'"
          :isFloatRight="true"
          :backgroundClassForContent="'lg:absolute lg:grid lg:mt-3 lg:pt-1 lg:w-max bg-danger block float-left px-4 my-2 w-full z-50'"
        >
          <template #button>
            Hi, {{ userStore.getUserInfo.username }}
          </template>

          <template #content>
            <a class="mx-2 my-3 nav-footer-item" @click="showUserInfo">
              <font-awesome-icon icon="fa-solid fa-user-secret" /> User info
            </a>
            <a class="mx-2 my-3 nav-footer-item" @click="onLogout">
              <font-awesome-icon icon="fa-solid fa-door-open" /> Logout
            </a>
          </template>
        </DropdownSideMenu>
        <div v-else>
          <a class="nav-footer-item my-1" @click="showUserInfo">
            <font-awesome-icon icon="fa-solid fa-user-secret" /> User info
          </a>
          <a class="nav-footer-item my-1" @click="onLogout">
            <font-awesome-icon icon="fa-solid fa-door-open" /> Logout
          </a>
        </div>
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
      <component :is="Component" />
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
import DropdownSideMenu from "@/components/menu/DropdownSideMenu.vue";

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

<style lang="scss"></style>
