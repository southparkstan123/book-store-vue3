<template>
  <div class="list">
    <div v-if="prev !== null" class="item" @click="toPage(prev)">
      <slot name="prev">＜</slot>
    </div>
    <div
      v-for="(e, index) in pages"
      :class="index + 1 === page ? 'item active' : 'item'"
      @click="toPage(index + 1)"
    >
      {{ index + 1 }}
    </div>
    <div v-if="next !== null" class="item" @click="toPage(next)">
      <slot name="prev">＞</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PaginationProps } from "@/types/types";

const props = defineProps<PaginationProps>();

const emit = defineEmits<{
  (e: "toPage", payload: number): void;
}>();

const toPage = (payload: number) => {
  if (payload !== props.page) {
    emit("toPage", payload);
  }
};

const prev = computed<number | null>(() =>
  props.page === 1 ? null : props.page - 1,
);
const next = computed<number | null>(() =>
  props.page === props.pages ? null : props.page + 1,
);
</script>

<style scoped lang="scss">
.list {
  .item {
    display: inline-flex;
    padding: 2px;
    width: 30px;
    height: 30px;
    background-color: gray;
    align-items: center;
    justify-content: center;
    margin: 3px 0px;
    cursor: pointer;
    &.active {
      background-color: lime;
    }

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
