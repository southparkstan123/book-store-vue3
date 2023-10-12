<template>
  <Transition :duration="1000" name="modal">
    <div class="overlay flex items-center" v-if="showModalContent">
      <div
        class="dialog inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div :class="(type !== 'content') ? 'sm:flex sm:items-start': ''">
            <div class="mt-3 sm:mt-0" :class="(type !== 'content') ? 'sm:ml-4 ': ''">
              <slot name="header">
                <h3
                  id="modal-headline"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Title
                </h3>
              </slot>
              <div :class="(type === 'content') ? 'overflow-scroll sm:h-48 h-96 ': ''">
                <slot v-if="type === 'content'" name="form-body" />
                <slot v-else name="message-body" />
              </div>
            </div>
          </div>
        </div>
        <div class="m-2 px-4 py-3 flex flex-row-reverse">
          <div class="modal-footer">
            <slot name="footer" :type="type"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ModalType } from "@/types/types";

const props = withDefaults(defineProps<{type: ModalType, showModalContent: boolean}>(), {
  type: "alert",
  showModalContent: false
})
</script>

<style scoped lang="scss">
.modal {
  overflow-x: auto;
  display: flex;
  flex-direction: column;

  &.modal-content {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    border-radius: 0.3rem;
    outline: 0;
  }
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

.btn-close {
  border: none 0;
  font-size: 20px;
  padding: 0px;
  cursor: pointer;
  font-weight: bold;
  color: gray;
  background-color: transparent;
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
