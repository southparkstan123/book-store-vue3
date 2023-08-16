<template>
  <div class="button" @click="open">
    <slot> Open </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    const open = () => {
      context.emit('openMenu')
    }

    return {
      open
    }
  }
})
</script>

<style scoped>
.button {
  position: fixed;
  cursor: pointer;
  z-index: 10;
}
</style>
