import { defineStore } from "pinia";
import { reactive, computed } from "vue";

type ToastMessage = {
  id: number;
  content: string;
  type: "success" | "error" | "warning" | "info" | "default";
};

export const useMessageStore = defineStore("message", () => {
  const state = reactive<{
    massages: ToastMessage[];
  }>({
    messages: [],
  });

  const getMessages = computed<ToastMessage[]>(() => state.messages);

  const push = (payload: {
    content: string;
    type: "success" | "error" | "warning" | "info" | "default";
  }) => {
    const id = Math.random() * 1000;
    state.messages = [...state.messages, { id, ...payload }];

    setTimeout(() => {
      state.messages.shift();
    }, 5000);
  };

  return {
    state,
    getMessages,
    push,
  };
});
