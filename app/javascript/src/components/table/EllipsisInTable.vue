<template>
  <div v-if="data.length > numberOfDisplayedItem">
    <div v-for="(item, index) in data">
      <span v-if="index < numberOfDisplayedItem">{{ item[field] }}</span>
    </div>
    + {{ data.length - numberOfDisplayedItem }}
    {{
      data.length - numberOfDisplayedItem > numberOfDisplayedItem - 1
        ? "items"
        : "item"
    }}
  </div>
  <div v-if="data.length <= numberOfDisplayedItem && data.length > 0">
    <div v-for="item in data">
      <span>{{ item[field] }}</span>
    </div>
  </div>
  <div v-if="data.length === 0">
    <span>(No item)</span>
  </div>
</template>

<script lang="ts" setup>
type Item = {
  [key: string]: unknown;
};
type Field = {
  field: string;
};
type Data = {
  data: Item[];
};
type NumberOfDisplayedItem = {
  numberOfDisplayedItem: number;
};

withDefaults(defineProps<Data & Field & NumberOfDisplayedItem>(), {
  numberOfDisplayedItem: 2,
  field: "name",
});
</script>

<style scoped></style>
