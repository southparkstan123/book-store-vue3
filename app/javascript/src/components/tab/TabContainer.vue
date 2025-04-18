<template>
    <div :class="wrapperClass">
      <div :class="`tab ${direction}`">
        <button v-for="tab in data" :class="(currentTab !== tab.id) ? buttonClass : `${buttonClass} ${activeButtonClass}`" @click="onChangeTab(tab.id)">
          {{ tab.label }}
        </button>
      </div>
      <div v-for="tab in data">
        <div v-if="currentTab === tab.id" :class="contentClass">
          <slot :name="tab.id"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import type { TabObject } from "@/types/types";
  
  const props = withDefaults(defineProps<{
    data: TabObject[],
    wrapperClass: string,
    buttonClass: string,
    activeButtonClass: string,
    contentClass: string,
    direction: "vertical" | "horizontal",
  }>(),
    {
      wrapperClass: "",
      buttonClass: "",
      activeButtonClass: "",
      contentClass: "tabcontent",
      direction: "vertical",
    },
  );
  
  const currentTab = ref<string>(props.data[0].id);
  
  const onChangeTab = (payload: string) => {
    currentTab.value = payload;
  }
  
  </script>
  
  <style lang="scss" scoped>
  .tab {
  
  &.vertical {
    float: left;

     > button {
      display: block;
      width: 100%;
      border: none;
      outline: none;
      text-align: left;
      cursor: pointer;
      transition: 0.3s;
    }
  }

  &.horizontal {
    overflow: scroll;

    > button {
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.3s;
    }
  }
}

.tabcontent {
  animation: fadeEffect 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  overflow: scroll;
  height: 280px;

  &.vertical {
    float: left;
    padding: 0px 12px;
    width:80%;
  }

  &.horizontal {
    border-top: none;
  }
}

@keyframes fadeEffect {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
  </style>