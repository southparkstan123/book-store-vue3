<template>
  <div>
    <CardItem :wrapperClass="''" :item="item">
      <template
        v-slot="{
          name,
          abstract,
          description,
          price,
          books,
          authors,
          publisher,
          isbn,
          year_published,
          is_published,
        }"
      >
        <div class="grid grid-cols-1">
          <TabContainer
            :data="displayedTabs"
            :wrapperClass="'container'"
            :buttonClass="'p-3'"
            :activeButtonClass="'text-white bg-info'"
            :contentClass="'p-1 border border-info h-72 overflow-scroll'"
            :direction="'horizontal'"
          >
            <template #default>
              <ul class="overflow-scroll">
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
                  {{ is_published ? "Yes" : "No" }}
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
              </ul>
            </template>
            <template #book>
              <div v-if="books && Object.keys(books).length > 0">
                <ul class="overflow-scroll">
                  <li>
                    <ol>
                      <li
                        v-for="item in books"
                        class="odd:bg-table-body-1 even:bg-table-body-2"
                      >
                        <div class="w-full grid grid-cols-8 py-1">
                          <div class="col-span-7">
                            <h1 class="float-left italic">
                              {{ item["name"] }}
                            </h1>
                          </div>
                          <div class="float-right">
                            <b> ${{ item["price"] }} </b>
                          </div>
                        </div>
                        <div class="w-full grid grid-cols-1">
                          <span>Abstract: {{ item["abstract"] }}</span>
                        </div>
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div v-else>No Item</div>
            </template>
            <template #author>
              <div v-if="authors && Object.keys(authors).length > 0">
                <ol>
                  <li
                    v-for="item in authors"
                    class="odd:bg-table-body-1 even:bg-table-body-2 py-1"
                  >
                    <div class="w-full grid grid-cols-1 italic">
                      {{ item["name"] }}
                    </div>
                    <div class="w-full grid grid-cols-1">
                      {{ item["description"] }}
                    </div>
                  </li>
                </ol>
              </div>
              <div v-else>No Item</div>
            </template>
            <template #publisher>
              <div v-if="publisher && Object.keys(publisher).length > 0">
                <ul>
                  <li>
                    <div class="italic">
                      {{ publisher["name"] }}
                    </div>
                  </li>
                  <li>
                    <div class="italic">
                      {{ publisher["description"] }}
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else>No Item</div>
            </template>
          </TabContainer>
        </div>
      </template>
    </CardItem>
  </div>
</template>

<script setup lang="ts">
import CardItem from "./card/CardItem.vue";
import TabContainer from "@/components/tab/TabContainer.vue";
import type { ModuleType, TabObject } from "@/types/types";
import { computed, ref } from "vue";

type ItemProps = {
  [key: string]: unknown;
};

const props = withDefaults(
  defineProps<{
    wrapperClass: string | undefined;
    item: ItemProps;
    module: ModuleType;
  }>(),
  {
    wrapperClass: "",
  },
);

const tabs = ref<TabObject[]>([
  {
    label: "Item",
    id: "default",
  },
]);

const displayedTabs = computed(() => {
  switch (props.module) {
    case "book":
      return [
        ...tabs.value,
        {
          label: "Authors",
          id: "author",
        },
        {
          label: "Publishers",
          id: "publisher",
        },
      ];
    case "author":
      return [
        ...tabs.value,
        {
          label: "Books",
          id: "book",
        },
      ];
    case "publisher":
      return [
        ...tabs.value,
        {
          label: "Books",
          id: "book",
        },
      ];
    default:
      return tabs.value;
  }
});
</script>

<style scoped></style>
