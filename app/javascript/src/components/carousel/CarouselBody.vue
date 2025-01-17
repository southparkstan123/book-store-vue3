<template>
  <div class="min-h-screen flex items-center justify-center">
    <ScrollSnapContainer
      :direction="direction"
      :snapType="snapType"
      :height="height"
      :width="width"
      id="inner"
    >
      <template #default>
        <Item
          @selectItem="
            (payload) => {
              selectedItem = payload;
              emit('itemDetail', { ...item, selectedIndex: selectedItem });
            }
          "
          v-for="(item, index) in items"
          v-bind:key="index"
          :url="item.src"
          :caption="item.caption"
          :index="index + 1"
          :id="'item-' + (index + 1)"
          class="mx-1"
        />
      </template>
      <template #selected-item>
        <slot name="selected-item"></slot>
      </template>
      <template #caption>
        <slot name="caption"></slot>
      </template>
      <template #description>
        <slot name="description"></slot>
      </template>
      <template #prev-button>
        <div v-if="selectedItem > 1" class="prev">
          <span
            @click.prevent="
              toSelectItem(() => {
                selectedItem--;
                emit('itemDetail', { ...item, selectedIndex: selectedItem });
              })
            "
          >
            <slot name="prev-button"></slot>
          </span>
        </div>
      </template>
      <template #next-button>
        <div v-if="selectedItem < items.length" class="next">
          <span
            @click.prevent="
              toSelectItem(() => {
                selectedItem++;
                emit('itemDetail', { ...item, selectedIndex: selectedItem });
              })
            "
          >
            <slot name="next-button"></slot>
          </span>
        </div>
      </template>
    </ScrollSnapContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Item from "@/components/carousel/Item.vue";
import ScrollSnapContainer from "@/components/carousel/ScrollSnapContainer.vue";
import type { ImageFile } from "@/types/types";

const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
    items: ImageFile[];
  }>(),
  {
    width: 640,
    height: 480,
    items: [],
  },
);

const emit = defineEmits<{
  (e: "itemDetail", payload: ImageFile): void;
}>();

const direction = ref("x");
const snapType = ref("mandatory");
const selectedItem = ref(1);

const toSelectItem = (callback: void) => {
  callback();
  document.querySelector("#item-" + selectedItem.value).scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
};
</script>

<style lang="scss">
#inner {
  > div.prev,
  div.next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 15%;
    color: #fff;
    text-align: center;
    opacity: 1;
    transition: opacity 0.15s ease;

    > span {
      cursor: pointer;
      padding: 0.5rem;
    }

    &.prev {
      left: 0;

      .icon {
        display: inline-block;
      }
    }

    &.next {
      right: 0;

      .icon {
        display: inline-block;
      }
    }
  }
}

.carousel-container {
  display: flex;
  overflow: auto;
  flex: none;
  scrollbar-width: none;

  > div {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    background-color: transparent;

    span {
      display: block;
    }
  }

  &.y {
    flex-flow: column nowrap;

    > div {
      height: 100%;
    }

    &.mandatory-scroll-snapping {
      scroll-snap-type: y mandatory;
    }

    &.proximity-scroll-snapping {
      scroll-snap-type: y proximity;
    }
  }

  &.x {
    width: 100%;
    flex-flow: row nowrap;

    > div {
      width: 100%;
    }

    &.mandatory-scroll-snapping {
      scroll-snap-type: x mandatory;
    }

    &.proximity-scroll-snapping {
      scroll-snap-type: x proximity;
    }
  }
}
</style>
