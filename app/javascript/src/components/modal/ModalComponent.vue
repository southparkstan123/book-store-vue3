<template>
  <Transition :duration="1000" name="modal">
    <div class="overlay flex items-center" v-if="showModalContent">
      <div
        class="dialog inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <slot name="header">
                <h3 id="modal-headline" class="text-lg leading-6 font-medium text-gray-900">
                  Title
                </h3>
              </slot>
              <div class="mt-2">
                <slot v-if="type === 'form'" name="form-body" />
                <slot v-else name="message-body" />
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <div v-show="type !== 'form'" class="modal-footer">
            <slot v-if="type === 'confirm'" name="confirm-footer">
              <button type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                <slot name="confirm">OK</slot>
              </button>
              <button type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="close">
                <slot name="reject">Cancel</slot>
              </button>
            </slot>
            <slot v-else name="footer">
              <button type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="close">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

type ModelType = 'alert' | 'confirm' | 'form';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'alert',
      validator: (type: ModelType): boolean => ['alert', 'confirm', 'form'].includes(type),
    },
    showModalContent: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const close = () => {
      emit('closeMenu')
    }

    return {
      close
    };
  }
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
