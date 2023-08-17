import { defineStore } from 'pinia'
import { reactive, computed } from 'vue';

type ModelType ='alert' | 'confirm' | 'form';

type ModalState = {
  visible: boolean;
  type: ModelType;
  message: string;
  title: string;
  component: string;
  resolvePromise: any
}

type OpenModalPayload = {
  type: ModelType;
  message: string;
  title: string;
  component: string | "";
}

export const useModalStore = defineStore('modal', () => {
  const state = reactive<ModalState>({
    visible: false,
    type: 'alert',
    message: '',
    title: '',
    component: '',
    resolvePromise: undefined
  })

  // Getters
  const getModalObject = computed<boolean>(() => state)
  
  // Actions
  const open = (payload: OpenModalPayload) => {
    state.visible = true;
    state.title = payload.title;
    state.type = payload.type;
    state.component = payload.component;
    state.message = payload.message;

    return new Promise((resolve, reject) => {
      state.resolvePromise = resolve
    });
  }

  const close = () => {
    state.visible = false;
    state.title = '';
    state.type = 'alert';
    state.component = '';
    state.message = '';
  }

  const confirm = () => {
    state.visible = false;
    state.title = '';
    state.type = 'alert';
    state.component = '';
    state.message = '';
    state.resolvePromise(true);
  }

  const reject = () => {
    state.resolvePromise(false);
  }

  return { 
    state, 
    open, 
    close,
    confirm,
    reject,
    getModalObject
  }
})
