<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade">
      <component
        class="overflow-scroll p-2 my-12"
        :is="formComponent"
        :id="id"
        @formChanged="formChanged"
      >
        <template #back>
          <router-link
            class="cursor-pointer link text-primary"
            :to="`/${module}/list`"
          >
            Back to Listing page
          </router-link>
        </template>
      </component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import AuthorForm from "@/components/forms/AuthorForm.vue";
import BookForm from "@/components/forms/BookForm.vue";
import PublisherForm from "@/components/forms/PublisherForm.vue";

import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useModalStore } from "@/store/modal";
import { onBeforeRouteLeave } from "vue-router";
import type { ModuleType } from "@/types/types";
import scrollToTop from "@/utils/scrollToTop"

const props = withDefaults(defineProps<{ module: ModuleType; id: number }>(), {
  module: "book",
});

onMounted(() => {
  setTimeout(() => {
    scrollToTop();
  }, 1000)
});

const isFormChanged = ref(false);

const { open } = useModalStore();
const { signout } = useUserStore();

const formComponent = computed(() => {
  switch (props.module) {
    case "book":
      return BookForm;
    case "author":
      return AuthorForm;
    case "publisher":
      return PublisherForm;
    default:
      return BookForm;
  }
});

const formChanged = (payload) => {
  isFormChanged.value = payload;
};

onBeforeRouteLeave(async (to, from, next) => {
  if (
    to.matched.some((record) => record.meta.forVisitorOnly) &&
    isFormChanged.value === true
  ) {
    const isLeave = await open({
      title: "Unsaved changes",
      message: "Do you really want to leave?",
      type: "confirm",
      component: "",
      props: undefined,
      isFitContent: true,
    });

    if (isLeave) {
      const isLogout = await open({
        title: "Logout",
        message: "Are you sure?",
        type: "confirm",
        component: "",
        props: undefined,
        isFitContent: true,
      });

      if (isLogout) {
        await signout();
        next();
      } else {
        next({ path: "/" });
      }
    }
  } else if (isFormChanged.value === true) {
    const isLeave = await open({
      title: "Unsaved changes",
      message: "Do you really want to leave?",
      type: "confirm",
      component: "",
      props: undefined,
      isFitContent: true,
    });

    if (isLeave) {
      next();
    }
  } else if (to.matched.some((record) => record.meta.forVisitorOnly)) {
    const isLogout = await open({
      title: "Logout",
      message: "Are you sure?",
      type: "confirm",
      component: "",
      props: undefined,
      isFitContent: true,
    });

    if (isLogout) {
      await signout();
      next();
    }
  } else {
    next();
  }
});
</script>
<style scoped></style>
