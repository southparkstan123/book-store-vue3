<template>
  <div>
    <CardItem
      :wrapperClass="''"
      :item="item"
    >
      <template v-slot="{ name, abstract, description, price, books, authors, publisher }">
        <div>
          <ul>
            <li v-if="name"><b>Name: </b>{{ name }}</li>
            <li v-if="abstract"><b>Abstract: </b>{{ abstract }}</li>
            <li v-if="description"><b>Description: </b>{{ description }}</li>
            <li v-if="price"><b>Price (USD): </b>{{ price }}</li>
          </ul>
          <div v-if="books">
            <span><b>Books: </b></span>
            <ul>
              <li v-for="item in books">{{ item }}</li>
            </ul>
          </div>
          <div v-if="authors">
            <span><b>Authors: </b></span>
            <ul>
              <li v-for="item in authors">{{ item }}</li>
            </ul>
          </div>
          <div v-if="publisher">
            <span><b>Publisher: </b></span>
            <ul>
              <li>{{ publisher }}</li>
            </ul>
          </div>
        </div>
      </template>
    </CardItem>
    <div class="float-right">
      <ButtonComponent @buttonClicked="modalStore.close()" :buttonType="'button'" :textClass="'text-sm text-white'"
        :backgroundClass="'bg-warning py-2 px-4 my-3 mx-1'">
        <template #text> Close Modal </template>
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/store/modal';
import CardItem from './card/CardItem.vue';
import ButtonComponent from './inputs/ButtonComponent.vue';
const modalStore = useModalStore();

type ItemProps = {
  [key: string]: unknown
}

const props = withDefaults(defineProps<{wrapperClass: string | undefined; item: ItemProps}>(), {
  wrapperClass: ''
})

</script>

<style scoped>

</style>