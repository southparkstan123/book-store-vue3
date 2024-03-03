<template>
  <div
    v-change-table-view="{ breakpoint: 1024, action: toogleDisplayView }"
    class="min-h-screen flex justify-center"
  >
    <Transition :appear="true" name="fade" mode="out-in">
      <div v-if="!isLoading" class="mt-12 p-1">
        <div class="z-10 items-center justify-between w-full">
          <InputField
            v-if="category === 'book'"
            :className="'w-full float-right bg-table-header md:py-1 md:pr-1 p-1'"
            :inputId="'test'"
            :inputValue="keyword"
            :inputFieldClass="'w-full sm:w-1/2 float-right disabled:opacity-25'"
            :inputType="'text'"
            :placeholder="`Search by name`"
            @changeValue="searchKeyword"
          >
          </InputField>
        </div>
        <div v-if="!isError">
          <component
            :is="displayComponent"
            :data="data"
            :fields="listingPageSettingStore.getFields"
            :style="`width: ${windowWidth * 0.9}px;`"
          >
            <template #price="{ item }">
              {{ "$" + item.price }}
            </template>
            <template #creator="{ item }">
              {{ item.creator.username }}
            </template>
            <template #updater="{ item }">
              {{ item.updater.username }}
            </template>
            <template #publisher="{ item }">
              {{ item.publisher.name }}
            </template>
            <template #authors="{ item }">
              <EllipsisInTable :data="item.authors" />
            </template>
            <template #created_at="{ item }">
              <TooltipComponent
                v-if="!isMobileView"
                :position="'top'"
                :dataTip="moment(item.created_at).format('lll')"
                :textClass="'text-sm text-white'"
              >
                {{ moment(item.created_at).fromNow() }}
              </TooltipComponent>
              <div v-else>
                {{ moment(item.created_at).format("lll") }}
              </div>
            </template>
            <template #updated_at="{ item }">
              <TooltipComponent
                v-if="!isMobileView"
                :position="'top'"
                :dataTip="moment(item.updated_at).format('lll')"
                :textClass="'text-sm text-white'"
              >
                {{ moment(item.created_at).fromNow() }}
              </TooltipComponent>
              <div v-else>
                {{ moment(item.updated_at).format("lll") }}
              </div>
            </template>
            <template #books="{ item }">
              <EllipsisInTable :data="item.books" />
            </template>

            <template #addition-content="{ item }">
              <DropdownSideMenu :isAnimated="true" :isFloatRight="true" :showCaret="false">
                <template #button>
                  <TooltipComponent
                    :position="'left'"
                    :dataTip="'Actions'"
                    :textClass="'text-lg text-white'"
                  >
                    <span class="text-table-text px-1">
                      <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
                    </span>
                  </TooltipComponent>
                </template>
                <template #content>
                  <a
                    class="text-dark hover:text-muted text-sm whitespace-no-wrap px-2 my-1 block"
                    @click="action('view', item.id)"
                  >
                    <font-awesome-icon icon="fa-regular fa-eye" /> View
                  </a>
                  <a
                    class="text-dark hover:text-muted text-sm whitespace-no-wrap px-2 my-1 block"
                    @click="action('edit', item.id)"
                  >
                    <font-awesome-icon icon="fa-regular fa-edit" /> Edit
                  </a>
                  <a
                    class="text-danger hover:text-muted text-sm whitespace-no-wrap px-2 my-1 block"
                    @click="action('delete', item.id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-remove" /> Delete
                  </a>
                </template>
              </DropdownSideMenu>
            </template>
            <template #footer>
              <div class="footer-item text-table-footer-text">
                {{ data.length }} of {{ pagination.total }}
                {{ pagination.total > 1 ? "records" : "record" }}
              </div>
            </template>
            <template #pagination>
              <PaginationComponent
                :page="pagination.currentPage"
                :pages="pagination.pages"
                @toPage="(payload) => changeCurrentPage(payload, scrollToTop())"
              >
              </PaginationComponent>
            </template>
          </component>
        </div>
        <div v-else>
          <div class="text-center">
            <h1 class="text-2xl text-primary">Oops! Error occurs.</h1>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center" v-else>
        <LoadingComponent
          class="text-2xl text-primary"
          :text="'Loading...'"
          :animationType="'wavy'"
        />
      </div>
    </Transition>

    <div class="z-10 fixed bottom-10 right-1 p-1">
      <ButtonComponent
        class="block"
        @buttonClicked="$router.push(`/${category}/add`)"
        :buttonType="'button'"
        :textClass="'text-white'"
        :backgroundClass="'bg-secondary py-3 px-4 m-1 rounnded rounded-full'"
      >
        <template #text>
          <TooltipComponent
            :position="'left'"
            :dataTip="'Add ' + category.toUpperCase()"
            :textClass="'text-sm text-white'"
          >
            <font-awesome-icon icon="fa-solid fa-plus" />
          </TooltipComponent>
        </template>
      </ButtonComponent>
      <ButtonComponent
        v-if="data && data.length > 0"
        class="block"
        @buttonClicked="openPageSettingModal"
        :buttonType="'button'"
        :textClass="'text-white'"
        :backgroundClass="'bg-info py-3 px-4 m-1 rounnded rounded-full'"
      >
        <template #text>
          <TooltipComponent
            :position="'left'"
            :dataTip="'Setting'"
            :textClass="'text-sm text-white'"
          >
            <font-awesome-icon icon="fa-solid fa-gear" />
          </TooltipComponent>
        </template>
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import type { ActionType, TableItem, ModuleType } from "@/types/types";

// External imports
import moment from "moment";
import { onMounted, ref, computed, watch } from "vue";
import {
  deleteRecordById,
  fetchRecords as _fetchRecords,
} from "@/services/CRUDServices";

// Views and Components
import TableComponent from "@/components/table/TableComponent.vue";
import StackComponent from "@/components/table/StackComponent.vue";
import EllipsisInTable from "@/components/table/EllipsisInTable.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import InputField from "@/components/inputs/InputField.vue";
import TooltipComponent from "@/components/TooltipComponent.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";
import DropdownSideMenu from "@/components/menu/DropdownSideMenu.vue";

// Props
const props = defineProps<{ category: ModuleType }>();

// Router
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

// Store
import { useModalStore } from "@/store/modal";
const modalStore = useModalStore();

// Search Keyword
import { useSearch } from "@/hooks/useSearch";
const { keyword, searchKeyword } = useSearch();

// Display View control
const windowWidth = ref<number>(0);
const isMobileView = ref<boolean>(false);
const displayComponent = computed(() => {
  switch (isMobileView.value) {
    case false:
      return TableComponent;
    default:
      return StackComponent;
  }
});
const toogleDisplayView = (payload) => {
  windowWidth.value = payload.windowWidth;
  isMobileView.value = payload.isMobileView;
};

// Pagination
import { usePagination } from "@/hooks/usePagination";
const { pagination, changeCurrentPage } = usePagination();

// Scroll to top
import scrollToTop from "@/utils/scrollToTop";

// Theme
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

// Custom fields
import ColumnFilter from "@/components/table/ColumnFilter.vue";
import DetailInfo from "@/components/DetailInfo.vue";

import { useListingPageSettingStore } from "@/store/listingPageSetting";
const listingPageSettingStore = useListingPageSettingStore();
listingPageSettingStore.changeCategory(props.category);

const openPageSettingModal = () => {
  modalStore.open({
    title: `Listing Page Setting`,
    message: "",
    type: "content",
    component: ColumnFilter,
    props: {
      data,
    },
    isFitContent: false,
  });
};

// Data
const data = ref<TableItem[]>([]);
const fetchRecords = async (
  category: ModuleType,
  page: number,
  perPage: number,
  keyword: string,
) => {
  try {
    const response = await _fetchRecords(category, page, perPage, keyword);
    data.value = response.data;

    pagination.value = {
      currentPage: parseInt(response.headers["current-page"], 10),
      pages: parseInt(response.headers["total-pages"], 10),
      count: parseInt(response.headers["page-items"], 10),
      total: parseInt(response.headers["total-count"], 10),
      perPage,
    };
  } catch (error: any) {
    isError.value = true;
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.data.message,
      type: "alert",
      component: "",
      props: undefined,
      isFitContent: true,
    });
  } finally {
    isLoading.value = false;
  }
};

// Actions
const action = async (type: ActionType, id: number) => {
  try {
    if (type === "view") {
      const item = data.value.filter((item) => item.id === id).pop();
      modalStore.open({
        title: `${props.category.toUpperCase()} #${id}`,
        message: "",
        type: "content",
        component: DetailInfo,
        props: {
          item,
        },
        isFitContent: false,
      });
    } else if (type === "edit") {
      router.push({ path: `/${props.category}/${type}/${id}`, replace: true });
    } else {
      const confirm = await modalStore.open({
        title: "Delete",
        message: "Are you sure?",
        type: "confirm",
        component: "",
        props: undefined,
        isFitContent: true,
      });

      if (confirm) {
        const response = await deleteRecordById(id, props.category);

        modalStore.open({
          title: "Success",
          message: response.data.message,
          type: "alert",
          component: "",
          props: undefined,
          isFitContent: true,
        });

        setTimeout(() => {
          fetchRecords(
            props.category,
            pagination.value.currentPage,
            pagination.value.perPage,
            keyword.value,
          );
        }, 1000);
      }
    }
  } catch (error) {
    isError.value = true;
  }
};

const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);

onMounted(() => {
  fetchRecords(
    props.category,
    pagination.value.currentPage,
    pagination.value.perPage,
    keyword.value,
  );
});

watch(
  [
    () => props.category,
    () => pagination.value.currentPage,
    () => themeStore.getPerPage,
    () => keyword.value,
  ],
  (
    [newCategory, newCurrentPage, newPerPage, newKeyword],
    [oldCategory, oldCurrentPage, oldPerPage, oldKeyword],
  ) => {
    listingPageSettingStore.changeCategory(newCategory);
    if (
      newKeyword !== oldKeyword ||
      newCategory !== oldCategory ||
      newPerPage !== oldPerPage
    ) {
      fetchRecords(newCategory, 1, newPerPage, newKeyword);
    } else {
      fetchRecords(
        newCategory,
        newCurrentPage,
        pagination.value.perPage,
        newKeyword,
      );
    }
    scrollToTop("smooth");
  },
);

watch(
  () => route.params,
  () => {
    isLoading.value = true;
    keyword.value = "";
  },
);

const vChangeTableView = (el, binding) => {
  const { action, breakpoint } = binding.value;
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const windowWidth = entry.contentRect.width;
      const isMobileView = entry.contentRect.width < breakpoint;
      action({ isMobileView, windowWidth });
    });
  });
  resizeObserver.observe(document.body);
};
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s ease-in-out;
}

.slide-up-enter-from {
  transform: translateY(20%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(20%);
  opacity: 0;
}

.footer-item {
  display: inline-flex;
  justify-content: center;
  padding: 2px;
  height: 30px;
  margin: 3px 1px;
}
</style>
