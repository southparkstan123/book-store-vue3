import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { HorizontalPosition, VerticalPosition } from "@/types/types";

type ToastMessage = {
  id: number;
  content: string;
  type: "success" | "error" | "warning" | "info" | "default";
};

export const useMessageStore = defineStore("message", () => {
  const state = reactive<{
    massages: ToastMessage[];
    horizontalPosition: HorizontalPosition;
    verticalPosition: VerticalPosition;
  }>({
    messages: [],
    horizontalPosition: "end",
    verticalPosition: "top"
  });

  const getMessages = computed<ToastMessage[]>(() => state.messages);
  const getHorizontalPosition = computed<HorizontalPosition>(() => state.horizontalPosition);
  const getVerticalPosition = computed<VerticalPosition>(() => state.verticalPosition);

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

  const setHorizontalPosition = (payload: HorizontalPosition) => {
    state.horizontalPosition = payload;

    push({
      type: 'default',
      content: "Changed"
    });
  };

  const setVerticalPosition = (payload: VerticalPosition) => {
    state.verticalPosition = payload;

    push({
      type: 'default',
      content: "Changed"
    });
  };

  return {
    state,
    getMessages,
    getHorizontalPosition,
    getVerticalPosition,
    push,
    setHorizontalPosition,
    setVerticalPosition
  };
});
