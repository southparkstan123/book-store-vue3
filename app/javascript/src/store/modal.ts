import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { ModalType, ModalState, OpenModalPayload } from "@/types/types";

export const useModalStore = defineStore("modal", () => {
  const state = reactive<ModalState>({
    visible: false,
    type: "alert",
    message: "",
    title: "",
    component: "",
    resolvePromise: undefined,
    props: undefined
  });

  // Getters
  const getModalObject = computed<boolean>(() => state);

  // Actions
  const open = (payload: OpenModalPayload) => {
    state.visible = true;
    state.title = payload.title;
    state.type = payload.type;
    state.component = payload.component;
    state.message = payload.message;
    state.props = payload.props;

    return new Promise((resolve, reject) => {
      state.resolvePromise = resolve;
    });
  };

  const close = () => {
    state.visible = false;
    state.title = "";
    state.type = "alert";
    state.component = "";
    state.message = "";
    state.props = undefined;
  };

  const confirm = () => {
    state.visible = false;
    state.title = "";
    state.type = "alert";
    state.component = "";
    state.message = "";
    state.resolvePromise(true);
    state.props = undefined;
  };

  const reject = () => {
    state.resolvePromise(false);
  };

  return {
    state,
    open,
    close,
    confirm,
    reject,
    getModalObject,
  };
});
