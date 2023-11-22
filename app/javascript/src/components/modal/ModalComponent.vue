<template>
  <Transition :duration="1000" name="modal">
    <div class="overlay modal" v-if="showModalContent">
      <div 
        class="dialog inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg max-w-sm"
        :style="`height:${(modalState.isFitContent === false) ? '70%' : 'fit-content'}; ${(modalState.type === 'content') ? 'min-height:280px' : ''}`"
      >
        <div
          class="mt-3 sm:mt-2 px-4 py-6 flex items-center justify-between"
        >
          <slot name="header">
            <span
              id="modal-headline"
              class="float-left text-lg leading-6 font-medium text-gray-900"
            >
              Title
            </span>
          </slot>
          <div class="float-right">
            <slot name="close-button"></slot>
          </div>
        </div>
        <div 
          class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:mb-4"
          :style="`height:${!modalState.isFitContent ? 'inherit' : 'fit-content'}`"
          :class="type === 'content' ? `overflow-scroll` : ''"
        >
          <slot v-if="type === 'content'" name="form-body"></slot>
          <slot v-else name="message-body"></slot>
          <div v-if="type === 'content'" class="w-full fixed right-0 bottom-0 bg-gray-100 mt-1">
            <div class="md:my-2 px-4 my-0 md:py-3 pt-1 pb-1 flex flex-row-reverse">
              <slot name="footer" :type="type"></slot>
            </div>
          </div>
        </div>
        <div v-if="type !== 'content'" class="m-2 px-4 py-3 flex flex-row-reverse">
          <slot name="footer" :type="type"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ModalType } from "@/types/types";

const props = withDefaults(
  defineProps<{ type: ModalType; showModalContent: boolean }>(),
  {
    type: "alert",
    showModalContent: false,
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
