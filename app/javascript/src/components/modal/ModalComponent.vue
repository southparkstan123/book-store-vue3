<template>
  <Transition name="modal">
    <div :class="overlayClass" v-if="showModalContent">
      <slot name="close-button-in-overlay"></slot>
      <div
        :class="`${modalBoxClass} height:${
          modalState.isFitContent === false ? '70%' : 'fit-content'
        }; ${modalState.type === 'content' ? 'min-height:280px' : ''}`"
      >
        <div :class="titleClass">
          <slot name="header"></slot>
          <slot name="close-button-in-content"></slot>
        </div>
        <div
          :class="`${contentClass} ${(type === 'content') ? `overflow-scroll` : ''} height:${
            !modalState.isFitContent ? 'inherit' : 'fit-content'
          }`"
        >
          <slot v-if="type === 'content'" name="form-body"></slot>
          <slot v-else name="message-body"></slot>
        </div>
        <div
          v-if="type !== 'content'"
          :class="footerClass"
        >
          <slot name="footer" :type="type">footer</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ModalType } from "@/types/types";

const props = withDefaults(
  defineProps<{
    type: ModalType;
    showModalContent: boolean;
    modalBoxClass: string;
    overlayClass: string;
    titleClass: string;
    contentClass: string;
    footerClass: string;
  }>(),
  {
    type: "alert",
    showModalContent: false,
    modalBoxClass: "",
    overlayClass: "overlay modal",
    titleClass: "flex",
    contentClass: "",
    footerClass: "flex"
  },
);

// Modal
import { useModalStore } from "@/store/modal";
const modalStore = useModalStore();
const modalState = modalStore.getModalObject;
</script>

<style scoped lang="scss">
.modal {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  height: 100%;
  z-index: 99999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 1s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .dialog,
.modal-leave-active .dialog {
  transition: all 0.5s ease-in-out;
}

.modal-leave-active .dialog {
  transition-delay: 0.5s;
}

.modal-enter-from .dialog,
.modal-leave-to .dialog {
  transform: translateY(-10%);
  opacity: 0;
}
</style>
