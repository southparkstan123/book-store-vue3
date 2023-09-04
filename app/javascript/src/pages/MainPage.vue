<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <ButtonComponent
        @buttonClicked="openModal"
        :buttonType="'button'"
        :textClass="'text-sm text-white'"
        :backgroundClass="'bg-info py-2 px-4 disabled:opacity-25'"
      >
        <template #text> Open Modal </template>
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/modal";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
const modalStore = useModalStore();

const openModal = () => {
  modalStore.open({
    title: "Greeting",
    type: "alert",
    component: "",
    message: "Welcome!",
    props: undefined
  });
};

</script>

<style scoped></style>
