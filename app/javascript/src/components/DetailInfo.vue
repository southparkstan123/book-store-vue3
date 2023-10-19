<template>
  <div>
    <CardItem :wrapperClass="''" :item="item">
      <template v-slot="{ name, abstract, description, price, books, authors, publisher, isbn, year_published, is_published }">
        <div>
          <ul>
            <li v-if="name">
              <h1><b>Name: </b></h1>
              {{ name }}
            </li>
            <li v-if="isbn">
              <h1><b>ISBN: </b></h1>
              {{ isbn }}
            </li>
            <li v-if="is_published">
              <h1><b>Is published? </b></h1>
              {{ is_published ? 'Yes' : 'No' }}
            </li>
            <li v-if="year_published">
              <h1><b>Year: </b></h1>
              {{ year_published }}
            </li>
            <li v-if="abstract">
              <h1><b>Abstract: </b></h1>
              {{ abstract }}
            </li>
            <li v-if="description">
              <h1><b>Description: </b></h1>
              {{ description }}
            </li>
            <li v-if="price">
              <h1><b>Price (USD): </b></h1>
              ${{ price }}
            </li>
            <li v-if="books && Object.keys(books).length > 0">
              <h1><b>Books: </b></h1>
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
</template>

<script setup lang="ts">
import CardItem from './card/CardItem.vue';

type ItemProps = {
  [key: string]: unknown
}

const props = withDefaults(defineProps<{ wrapperClass: string | undefined; item: ItemProps }>(), {
  wrapperClass: ''
})

</script>

<style scoped></style>