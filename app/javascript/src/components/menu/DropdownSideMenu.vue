<template>
  <div>
    <a
      :class="buttonClass"
      @click="toggleFooterMenu"
    >
      <slot name="button" :isOpenFooterMenu="isOpenFooterMenu"></slot>
    </a>
    <slot name="content" :isOpenFooterMenu="isOpenFooterMenu"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(defineProps<{buttonClass: string}>(), {
  buttonClass: ""
})
const isOpenFooterMenu = ref<boolean>(false);

const toggleFooterMenu = () => {
  isOpenFooterMenu.value = !isOpenFooterMenu.value
}
</script>

<style scoped>

</style>