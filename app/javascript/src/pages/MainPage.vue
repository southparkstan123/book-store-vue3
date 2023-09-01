<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="mx-auto">
      <ButtonComponent
        @buttonClicked="openModal"
        :buttonType="'button'"
        :textClass="'text-sm text-white'"
        :backgroundClass="'bg-info py-2 px-4'"
      >
        <template #text> Setting </template>
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/modal";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import TemplateForm from "@/components/forms/TemplateForm.vue";
const modalStore = useModalStore();

const openModal = () => {
  modalStore.open({
    title: "Setting",
    type: "form",
    component: TemplateForm,
    message: "",
  });
};

const toggleMode = () => {
  let htmlElement = document.querySelector('html');
  const mode = localStorage.getItem('mode');

  if(mode !== null && mode === 'shoujyo'){
    htmlElement?.classList.remove('shoujyo');
    localStorage.removeItem('mode');
  } else {
    htmlElement?.classList.add('shoujyo');
    localStorage.setItem('mode', 'shoujyo');
  }
}

</script>

<style scoped></style>
