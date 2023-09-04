<template>
  <div
    v-change-table-view="{ breakpoint: 1024, action: toogleDisplayView }"
    class="min-h-screen flex items-center justify-center"
  >
    <Transition :appear="true" name="fade" mode="out-in">
      <div v-if="!isLoading" class="my-12">
        <div v-if="!isError">
          <Transition :appear="false" name="fade">
            <div v-show="isDisplayColumnFilter">
              <ColumnFilter 
                class="block"
                :data="data" 
                :presetFields="presetFields" 
                @onChangeColumn="changeColumn"
              />
            </div>
          </Transition>
          <component :is="displayComponent" :data="data" :fields="fields" :style="`width: ${windowWidth * 0.9}px`">
            <template #search-bar>
              <InputField
                v-if="category === 'book'"
                :inputId="'test'"
                :inputValue="keyword"
                :inputFieldClass="'float-right'"
                :inputType="'text'"
                :placeholder="`Search by name`"
                @changeValue="searchKeyword"
              >
              </InputField>
              <router-link :class="'float-left text-info pr-4 py-3'" :to="`/${category}/add`">
                Add {{ category }}
              </router-link>
              <InputField :inputId="'column-filter'" :className="'float-left my-3'" :inputValue="isDisplayColumnFilter"
                :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'column-filter'" :inputType="'checkbox'"
                :checked="isDisplayColumnFilter" @changeValue="toggleColumnFilter">
                <template #label>
                  <label for="column-filter" class="px-1"> Show column filter </label>
                </template>
              </InputField>
            </template>
            <template #price="{ item }">
              {{ '$' + item.price }}
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
                :position="!isMobileView ? 'top': 'right'" 
                :dataTip="moment(item.created_at).format('lll')"
                :content="moment(item.created_at).fromNow()">
              </TooltipComponent>
            </template>
            <template #updated_at="{ item }">
              <TooltipComponent 
                :position="!isMobileView ? 'top': 'right'" 
                :dataTip="moment(item.updated_at).format('lll')"
                :content="moment(item.updated_at).fromNow()">
              </TooltipComponent>
            </template>
            <template #books="{ item }">
              <EllipsisInTable :data="item.books" />
            </template>

            <template #addition-header>
              <th>Actions</th>
            </template>
            <template #addition-content="{ item }">
              <ButtonComponent
                @buttonClicked="action('view', item.id)"
                :buttonType="'button'"
                :textClass="'text-sm text-white'"
                :backgroundClass="'bg-primary py-2 px-4 my-1'"
                :isDisable="false"
              >
                <template #text> View </template>
              </ButtonComponent>
              <ButtonComponent
                @buttonClicked="action('edit', item.id)"
                :buttonType="'button'"
                :textClass="'text-sm text-white'"
                :backgroundClass="'bg-info py-2 px-4 my-1'"
                :isDisable="false"
              >
                <template #text> Edit </template>
              </ButtonComponent>
              <ButtonComponent
                @buttonClicked="action('delete', item.id)"
                :buttonType="'button'"
                :textClass="'text-sm text-white'"
                :backgroundClass="'bg-danger py-2 px-4 my-1'"
                :isDisable="false"
              >
                <template #text> Delete </template>
              </ButtonComponent>
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
                @toPage="changeCurrentPage"
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
      <div v-else>
        <h1 class="text-center text-2xl text-primary">Loading...</h1>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import type {
  ActionType,
  TableItem,
  TableField,
  ModuleType,
} from "@/types/types";

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

// Theme
import { useThemeStore } from "@/store/theme"
const themeStore = useThemeStore();

// Custom fields
import ColumnFilter from "@/components/table/ColumnFilter.vue";
import DetailInfo from "@/components/DetailInfo.vue";

const fields = ref<TableField[] | undefined>(undefined);
const changeColumn = (payload: TableField[] | undefined) => {
  fields.value = payload
}

const isDisplayColumnFilter = ref<boolean>(false);
const toggleColumnFilter = ({ checked, value }) => isDisplayColumnFilter.value = checked;

const presetFields = computed<TableField[] | undefined>(() => {
  const idField = [{ key: "id", label: "ID" }];
  const defaultFields = [
    { key: "created_at", label: "Created at" },
    { key: "updated_at", label: "Updated at" },
  ];

  switch (props.category) {
    case "book":
      return [
        ...idField,
        { key: "name", label: "Name" },
        { key: "price", label: "Price (USD)" },
        { key: "authors", label: "Authors" },
        ...defaultFields,
      ];
    case "author":
      return [
        ...idField,
        { key: "name", label: "Name" },
        { key: "books", label: "Books" },
        ...defaultFields,
      ];
    case "publisher":
      return [
        ...idField,
        { key: "name", label: "Name" },
        { key: "books", label: "Books" },
        ...defaultFields,
      ];
    default:
      return undefined;
  }
});

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
      props: undefined
    });
  } finally {
    isLoading.value = false;
  }
};

// Actions
const action = async (type: ActionType, id: number) => {
  try {
    if(type === "view") {
      const item = data.value.filter(item => item.id === id).pop();
      modalStore.open({
        title: "Detail",
        message: "",
        type: "form",
        component: DetailInfo,
        props: {
          item
        }
      });
    } else if (type === "edit") {
      router.push({ path: `/${props.category}/${type}/${id}`, replace: true });
    } else {
      const confirm = await modalStore.open({
        title: "Delete",
        message: "Are you sure?",
        type: "confirm",
        component: "",
        props: undefined
      });

      if (confirm) {
        await deleteRecordById(id, props.category);
        router.push(`/${props.category}/list`);
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
    if (newKeyword !== oldKeyword || newCategory !== oldCategory || newPerPage !== oldPerPage) {
      fetchRecords(newCategory, 1, newPerPage, newKeyword);
    } else {
      fetchRecords(
        newCategory,
        newCurrentPage,
        pagination.value.perPage,
        newKeyword,
      );
    }
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
}
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

.footer-item {
  display: inline-flex;
  justify-content: center;
  padding: 2px;
  height: 30px;
  margin: 3px 1px;
}
</style>
