<template>
  <TransitionGroup tag="div" name="fade" :appear="true" :class="className">
    <ToastItem
      v-for="(message,index) in messageStore.getMessages"
      :key="message.id"
      :message="message.content"
      :type="message.type"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ToastItem from "@/components/toast/ToastItem.vue";

import { useMessageStore } from "@/store/message";
const messageStore = useMessageStore();

const props = withDefaults(defineProps<{
  horizontalPosition: "start" | "end";
  verticalPosition: "top" | "bottom";
  wrapperClass: string;
}>(), {
  horizontalPosition: "start",
  verticalPosition: "bottom"
});

const className = computed(() => {
  return `${props.wrapperClass} ${props.verticalPosition }-4 ${props.horizontalPosition}-4`;
});

</script>

<style scoped>
.fade-move,
.fade-leave-active,
.fade-enter-active {
  transition: all 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}
</style>
