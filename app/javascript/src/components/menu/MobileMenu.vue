<template>
  <Transition :duration="1000" :appear="true" name="menu">
    <div class="overlay" @click="clickOutsideMenu" v-if="showMenuContent">
      <div class="inner" :style="{ 'background-color': backgroundColor, width }">
        <MobileMenuBody>
          <template #button>
            <MobileMenuCloseButton @closeMenu="closeMenu" class="close">
              <slot name="close-button"></slot>
            </MobileMenuCloseButton>
          </template>

          <template #body-content>
            <div class="body">
              <slot name="body-content"></slot>
            </div>
          </template>

          <template #footer-content>
            <div class="footer">
              <slot name="footer-content"></slot>
            </div>
          </template>
        </MobileMenuBody>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MobileMenuCloseButton from './MobileMenuCloseButton.vue'
import MobileMenuBody from './MobileMenuBody.vue'
import isValidColorValue from '../../utils/isValidColorValue'

export default defineComponent({
  components: {
    MobileMenuBody,
    MobileMenuCloseButton
  },
  props: {
    backgroundColor: {
      type: String,
      default: '#FFF',
      validator: (value: string) => {
        return isValidColorValue(value) || value === ''
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    showMenuContent: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const closeMenu = () => {
      context.emit('showMenuContent', false)
      context.emit('closeMenu')
    }

    const clickOutsideMenu = (event: any) => {
      if (event.target.className === 'overlay') {
        closeMenu()
      }
    }

    context.emit('showMenuContent', true)

    return {
      clickOutsideMenu,
      closeMenu
    }
  }
})
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 50;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.body {
  clear: both;
  width: 100%;
  overflow: scroll;
  min-height: 70vh;
}

// Outside
.menu-enter-active,
.menu-leave-active {
  transition: all 1s ease-in-out;
}

.menu-leave-active {
  transition-delay: 0.5s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

// Inside
.menu-enter-active .inner,
.menu-leave-active .inner {
  transition: all 1s ease-in-out;
}

.menu-enter-active .inner {
  transition-delay: 0s;
}

.menu-leave-to .inner {
  transform: translateX(-100%);
}

.menu-enter-from .inner {
  transform: translateX(-100%);
}

// Close button
.menu-enter-active .inner .close,
.menu-leave-active .inner .close {
  transition: all 1s ease-in;
}

.menu-enter-active .inner .close {
  transition-delay: 0.8s;
}

.menu-leave-to .inner .close {
  transform: rotateZ(-360deg);
  opacity: 0;
}

.menu-enter-from .inner .close {
  transform: scale(10) rotateZ(-360deg);
  opacity: 0;
}
</style>
