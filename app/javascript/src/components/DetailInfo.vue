<template>
  <div>
    <CardItem
      :wrapperClass="''"
      :item="item"
    >
      <template v-slot="{ name, abstract, description, price, books, authors, publisher }">
        <div>
          <ul>
            <li v-if="name">Name: {{ name }}</li>
            <li v-if="abstract">Abstract: {{ abstract }}</li>
            <li v-if="description">Description: {{ description }}</li>
            <li v-if="price">Price (USD): {{ price }}</li>
          </ul>
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