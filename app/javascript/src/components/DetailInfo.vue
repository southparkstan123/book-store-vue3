<template>
  <div :style="'max-height: 500px;'" class="overflow-y-scroll">
    <CardItem :wrapperClass="''" :item="item">
      <template v-slot="{ name, abstract, description, price, books, authors, publisher }">
        <div>
          <ul>
            <li v-if="name"><b>Name: </b>{{ name }}</li>
            <li v-if="abstract"><b>Abstract: </b>{{ abstract }}</li>
            <li v-if="description"><b>Description: </b>{{ description }}</li>
            <li v-if="price"><b>Price (USD): </b>${{ price }}</li>
            <li v-if="books && Object.keys(books).length > 0">
              <b>Books: </b>
              <ol>
                <li v-for="item in books" class="odd:bg-table-body-1 even:bg-table-body-2">
                  <div class="w-full grid grid-cols-8 py-1" >
                    <div class="col-span-7">
                      <h1 class="float-left italic">Title: {{ item['name'] }}</h1>
                    </div>
                    <div class="float-right">
                      <b>
                        ${{ item['price'] }}
                      </b>
                    </div>
                  </div>
                  <div class="w-full grid grid-cols-1">
                    <span>Abstract: {{ item['abstract'] }}</span>
                  </div>
                </li>
              </ol>
            </li>
            <li v-if="authors && Object.keys(authors).length > 0">
              <b>Authors: </b>
              <ol>
                <li v-for="item in authors" class="odd:bg-table-body-1 even:bg-table-body-2 py-1">
                  <div class="w-full grid grid-cols-1 italic">{{ item['name'] }}</div>
                  <div class="w-full grid grid-cols-1">{{ item['description'] }}</div>
                </li>
              </ol>
            </li>
            <li v-if="publisher && Object.keys(publisher).length > 0">
              <b>Publisher: </b>
              <ul>
                <li>
                  <div class="italic">
                    {{ publisher['name'] }}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </template>
    </CardItem>
  </div>
  <div class="float-right">
    <ButtonComponent @buttonClicked="modalStore.close()" :buttonType="'button'" :textClass="'text-sm text-white'"
      :backgroundClass="'bg-warning py-2 px-4 my-3 mx-1'">
      <template #text> Close Modal </template>
    </ButtonComponent>
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

const props = withDefaults(defineProps<{ wrapperClass: string | undefined; item: ItemProps }>(), {
  wrapperClass: ''
})

</script>

<style scoped></style>