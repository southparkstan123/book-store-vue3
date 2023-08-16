<template>
  <div class="min-h-screen flex items-center justify-center">
    <Transition :appear="true" name="fade">
      <component :is="formComponent" :id="id"></component>
    </Transition>
  </div>
</template>

<script lang="ts">
import AuthorForm from '../components/forms/AuthorForm.vue'
import BookForm from '../components/forms/BookForm.vue'
import PublisherForm from '../components/forms/PublisherForm.vue'

export default {
  components: {
    AuthorForm,
    BookForm,
    PublisherForm
  }
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

type Module = "book" | "author" | "publisher"
const props = defineProps<{ module: Module, id: number }>()

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

console.log(formComponent.value);


</script>

<style scoped></style>