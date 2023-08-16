<template>
  <div class="button" @click="close">
    <slot> Close </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    const close = () => {
      context.emit('closeMenu')
    }

    return {
      close
    }
  }
})
</script>

<style scoped>
.button {
  width: 50px;
  height: 50px;
  cursor: pointer;
  left: 398px;
  float: right;
}
</style>
