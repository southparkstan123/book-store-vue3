<template>
  <div class="min-h-screen flex justify-center">
    <div v-if="isLoading === false" class="mt-16 w-full mx-2">
      <h1 class="text-3xl my-2 text-primary text-center">
        <font-awesome-icon icon="fa-solid fa-gauge" class="mr-3"/>Dashboard
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:flex md:justify-center">
        <div v-for="(num, key) in totalNumbers" class="bg-dark p-6 rounded-xl m-1 w-full md:w-64">
          <span class="block text-info text-lg">
            <font-awesome-icon :icon="`fa-solid fa-${icon(key)}`" /> {{ key.toUpperCase() }} :
          </span>
          <span class="block text-light text-5xl m-4">
            {{ num }}
          </span>
          <div class="block mt-3">
            <router-link class="block text-light bg-warning w-fit rounded p-2 float-left" :to="`/${key}/add`">
              Add +
            </router-link>
            <router-link class="block text-light bg-success w-fit rounded p-2 float-right" :to="`/${key}/list`">
              More →
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center" v-else>
      <LoadingComponent
        class="text-2xl text-primary"
        :text="'Loading...'"
        :animationType="'fade-in-zoom-in'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSummary } from '@/services/CRUDServices';
import { useMessageStore } from '@/store/message';
import { onMounted, ref } from 'vue';
import LoadingComponent from '@/components/loading/LoadingComponent.vue';
import type { ModuleType } from '@/types/types';

const messageStore = useMessageStore();

const totalNumbers = ref<{
  book: number,
  author: number,
  publisher: number
}>({
  book: 0,
  author: 0,
  publisher: 0,
});

const isLoading = ref<boolean>(true);

const icon = (moduleType: ModuleType) => {
  switch (moduleType) {
    case 'book':
      return 'book';
    case 'author':
      return 'at';
    case 'publisher':
      return 'building';
  }
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const list = {};
    for await (const response of getSummary()) {
      Object.assign(list, response);
    }
    totalNumbers.value = list;
  } catch (error) {
    messageStore.push({
      type: "error",
      content: error
    });
  } finally {
    isLoading.value = false;
  }
})
</script>

<style scoped></style>