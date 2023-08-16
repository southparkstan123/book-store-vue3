import { defineStore } from 'pinia'
import { reactive } from 'vue';

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
  
  const open = (payload: OpenModalPayload) => {
    state.visible = true;
    state.title = payload.title;
    state.type = payload.type;
    state.component = payload.component;
    state.message = payload.message;
  }

  const close = () => {
    state.visible = false;
    state.title = '';
    state.type = 'alert';
    state.component = '';
    state.message = '';
  }

  return { 
    state, 
    open, 
    close 
  }
})
