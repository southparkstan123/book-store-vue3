<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade">
      <component :is="formComponent" :id="id" @formChanged="formChanged"></component>
    </Transition>
  </div>
</template>

<script lang="ts">
import AuthorForm from '@/components/forms/AuthorForm.vue'
import BookForm from '@/components/forms/BookForm.vue'
import PublisherForm from '@/components/forms/PublisherForm.vue'
import { ref, computed, defineComponent, PropType } from 'vue';
import { useUserStore } from '@/store/user'
import { useModalStore } from '@/store/modal'
import { onBeforeRouteLeave } from 'vue-router'

type Module = "book" | "author" | "publisher"

export default defineComponent({
  props: {
    module: {
      type: String as PropType<Module>,
      default: "book"
    },
    id: {
      type: Number
    }
  },
  components: {
    AuthorForm,
    BookForm,
    PublisherForm
  },
  setup(props) {
    const isFormChanged = ref(false)

    const { open } = useModalStore();
    const { signout } = useUserStore();

    const formComponent = computed(() => {
      switch (props.module) {
        case 'book':
          return 'book-form'
        case 'author':
          return 'author-form'
        case 'publisher':
          return 'publisher-form'
        default:
          return 'book-form'
      }
    })

    const formChanged = (payload) => {
      isFormChanged.value = payload
    }

    onBeforeRouteLeave(async (to, from, next) => {
      if (to.matched.some(record => record.meta.forVisitorOnly) && isFormChanged.value) {
        const isLeave = await open({
          title: 'Unsaved changes',
          message: 'Do you really want to leave?',
          type: 'confirm',
          component: ''
        })

        if (isLeave) {
          const isLogout = await open({
            title: 'Logout',
            message: 'Are you sure?',
            type: 'confirm',
            component: ''
          })

          if (isLogout) {
            await signout()
            next()
          } else {
            next({ path: '/' });
          }
        }

      } else if (isFormChanged.value) {
        const isLeave = await open({
          title: 'Unsaved changes',
          message: 'Do you really want to leave?',
          type: 'confirm',
          component: ''
        })

        if (isLeave) {
          next();
        }
      } else if (to.matched.some(record => record.meta.forVisitorOnly)) {
        const isLogout = await open({
          title: 'Logout',
          message: 'Are you sure?',
          type: 'confirm',
          component: ''
        })

        if (isLogout) {
          await signout()
          next()
        }
      } else {
        next();
      }
    })

    return {
      isFormChanged,
      formComponent,
      formChanged
    }
  }
})

</script>
<style scoped></style>