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
        <a class="nav-brand-item">Book Store</a>
      </template>
      <template #body-content="{ isMobileView }">
        <router-link class="nav-main-item" to="/"> 
          <font-awesome-icon icon="fa-regular fa-image" /> Gallery (Beta) 
        </router-link>

        <DropdownSideMenu
          v-if="!isMobileView"
          :isAnimated="true"
          :wrapperClass="'inline-block'"
          :buttonClass="'nav-main-item'"
        >
          <template #button="{ isOpenFooterMenu }">
            <div class="">
              <font-awesome-icon icon="fa-solid fa-book" /> Book
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </div>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <ul
              v-if="isOpenFooterMenu === true"
              class="fixed grid text-gray-700 pt-1 bg-navbar w-40"
            >
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap"
                  to="/book/list"
                >
                  <font-awesome-icon icon="fa-solid fa-list" /> List
                </router-link>
              </li>
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap"
                  to="/book/add"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" /> Add
                </router-link>
              </li>
            </ul>
          </template>
        </DropdownSideMenu>
        <DropdownSideMenu
          v-else
          :isAnimated="true"
          :wrapperClass="'nav-main-item text-xl cursor-pointer'"
          :buttonClass="'block float-left px-4 my-2 w-full'"
        >
          <template #button="{ isOpenFooterMenu }">
            <span class="float-left text-2xl">
              <font-awesome-icon icon="fa-solid fa-book" /> Book
            </span>
            <span class="float-right">
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </span>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <div v-if="isOpenFooterMenu === true" class="mt-1 inline-block">
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/book/list"
              >
                <font-awesome-icon icon="fa-solid fa-list" /> List
              </router-link>
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/book/add"
              >
                <font-awesome-icon icon="fa-solid fa-plus" /> Add
              </router-link>
            </div>
          </template>
        </DropdownSideMenu>

        <DropdownSideMenu
          v-if="!isMobileView"
          :isAnimated="true"
          :wrapperClass="'inline-block'"
          :buttonClass="'nav-main-item'"
        >
          <template #button="{ isOpenFooterMenu }">
            <div class="">
              <font-awesome-icon icon="fa-solid fa-pen-nib" /> Author
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </div>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <ul
              v-if="isOpenFooterMenu === true"
              class="fixed grid text-gray-700 pt-1 bg-navbar w-40"
            >
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap px-2"
                  to="/author/list"
                >
                  <font-awesome-icon icon="fa-solid fa-list" /> List
                </router-link>
              </li>
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap px-2"
                  to="/author/add"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" /> Add
                </router-link>
              </li>
            </ul>
          </template>
        </DropdownSideMenu>
        <DropdownSideMenu
          v-else
          :isAnimated="true"
          :wrapperClass="'nav-main-item text-xl cursor-pointer'"
          :buttonClass="'block float-left px-4 my-2 w-full'"
        >
          <template #button="{ isOpenFooterMenu }">
            <span class="float-left text-2xl">
              <font-awesome-icon icon="fa-solid fa-pen-nib" /> Author
            </span>
            <span class="float-right">
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </span>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <div v-if="isOpenFooterMenu === true" class="mt-1 inline-block">
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/author/list"
              >
                <font-awesome-icon icon="fa-solid fa-list" /> List
              </router-link>
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/author/add"
              >
                <font-awesome-icon icon="fa-solid fa-plus" /> Add
              </router-link>
            </div>
          </template>
        </DropdownSideMenu>

        <DropdownSideMenu
          v-if="!isMobileView"
          :isAnimated="true"
          :wrapperClass="'inline-block'"
          :buttonClass="'nav-main-item'"
        >
          <template #button="{ isOpenFooterMenu }">
            <div class="">
              <font-awesome-icon icon="fa-solid fa-building" /> Publisher
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </div>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <ul
              v-if="isOpenFooterMenu === true"
              class="fixed grid text-gray-700 pt-1 bg-navbar w-40"
            >
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap px-2"
                  to="/publisher/list"
                >
                  <font-awesome-icon icon="fa-solid fa-list" /> List
                </router-link>
              </li>
              <li class="mx-1 my-3">
                <router-link
                  class="nav-main-item whitespace-no-wrap px-2"
                  to="/publisher/add"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" /> Add
                </router-link>
              </li>
            </ul>
          </template>
        </DropdownSideMenu>
        <DropdownSideMenu
          v-else
          :isAnimated="true"
          :wrapperClass="'nav-main-item text-xl cursor-pointer'"
          :buttonClass="'block float-left px-4 my-2 w-full'"
        >
          <template #button="{ isOpenFooterMenu }">
            <span class="float-left text-2xl">
              <font-awesome-icon icon="fa-solid fa-building" /> Publisher
            </span>
            <span class="float-right">
              <font-awesome-icon
                v-if="isOpenFooterMenu"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
            </span>
          </template>
          <template #content="{ isOpenFooterMenu }">
            <div v-if="isOpenFooterMenu === true" class="mt-1 inline-block">
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/publisher/list"
              >
                <font-awesome-icon icon="fa-solid fa-list" /> List
              </router-link>
              <router-link
                class="nav-main-item whitespace-no-wrap px-2"
                to="/publisher/add"
              >
                <font-awesome-icon icon="fa-solid fa-plus" /> Add
              </router-link>
            </div>
          </template>
        </DropdownSideMenu>
      </template>
      <template #footer-content="{ isMobileView }">
        <div v-if="!isMobileView" class="dropdown inline-block relative">
          <DropdownSideMenu
            :isAnimated="true"
            :wrapperClass="'mx-1'"
            :buttonClass="'text-menu-item cursor-pointer'"
          >
            <template #button="{ isOpenFooterMenu }">
              Hi, {{ userStore.getUserInfo.username }}
              <div class="float-right px-2">
                <font-awesome-icon
                  v-if="isOpenFooterMenu"
                  icon="fa-solid fa-caret-up"
                />
                <font-awesome-icon v-else icon="fa-solid fa-caret-down" />
              </div>
            </template>

            <template #content="{ isOpenFooterMenu }">
              <ul
                v-if="isOpenFooterMenu === true"
                class="dropdown-menu absolute text-gray-700 pt-1 right-0 top-9 bg-navbar w-40 text-right"
              >
                <li class="mx-1">
                  <a
                    class="nav-footer-item py-2 px-4 block whitespace-no-wrap"
                    @click="openTemplateForm"
                  >
                    <font-awesome-icon icon="fa-solid fa-palette" /> Theme
                  </a>
                </li>
                <li class="mx-1">
                  <a
                    class="nav-footer-item py-2 px-4 block whitespace-no-wrap"
                    @click="showUserInfo"
                  >
                    <font-awesome-icon icon="fa-solid fa-user-secret" /> User
                    info
                  </a>
                </li>
                <li class="mx-1">
                  <a
                    class="nav-footer-item py-2 px-4 block whitespace-no-wrap"
                    @click="onLogout"
                  >
                    <font-awesome-icon icon="fa-solid fa-door-open" /> Logout
                  </a>
                </li>
              </ul>
            </template>
          </DropdownSideMenu>
        </div>
        <div v-else>
          <a class="nav-footer-item my-1" @click="openTemplateForm">
            <font-awesome-icon icon="fa-solid fa-palette" /> Theme
          </a>
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
const openTemplateForm = () => {
  modalStore.open({
    title: "Theme",
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
