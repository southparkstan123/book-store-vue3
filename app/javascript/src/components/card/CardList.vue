<template>
  <Transition :appear="true" name="fade" mode="out-in">
    <div
      v-if="data.length > 0 && data !== undefined"
      class="overflow-scroll h-96 min-w-lg"
    >
      <TransitionGroup name="list" tag="div" :class="wrapperClass">
        <div v-for="(item, index) in data" :key="item[key]">
          <slot v-bind="{ item, index }"></slot>
        </div>
      </TransitionGroup>
      <slot name="information"></slot>
    </div>
    <div v-else>
      <slot name="no-result"></slot>
    </div>
  </Transition>
</template>

<script lang="ts" setup generic="T">
const props = withDefaults(
  defineProps<{ data: T[]; wrapperClass: string; key: string }>(),
  {
    data: [],
    wrapperClass: "",
    key: "name",
  },
);
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter-from {
  transform: translateY(-10%);
  opacity: 0;
}

.list-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
