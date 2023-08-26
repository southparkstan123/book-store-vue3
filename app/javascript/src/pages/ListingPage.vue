<template>
  <div
    v-change-table-view="{ breakpoint: 1024, action: toogleDisplayView }"
    class="min-h-screen flex items-center justify-center"
  >
    <Transition :appear="true" name="fade" mode="out-in">
      <div v-if="!isLoading" class="my-12">
        <div v-if="!isError">
          <component :is="displayComponent" :data="data" :fields="fields" :style="`width: ${windowWidth * 0.9}px`">
            <template #search-bar>
              <InputField
                v-if="category === 'book'"
                :inputId="'test'"
                :className="''"
                :inputValue="keyword"
                :inputFieldClass="'float-right'"
                :inputType="'text'"
                :placeholder="`Search by name`"
                :step="undefined"
                :min="undefined"
                :max="undefined"
                @changeValue="searchKeyword"
              >
              </InputField>
              <ButtonComponent
                @buttonClicked="toAddPage"
                :buttonType="'button'"
                :textClass="'float-left text-sm text-white'"
                :backgroundClass="'bg-pink-500 py-3 px-4'"
              >
                <template #text> Add {{ category }} </template>
              </ButtonComponent>
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
                :position="'top'" 
                :dataTip="moment(item.created_at).format('lll')"
                :content="moment(item.created_at).fromNow()">
              </TooltipComponent>
            </template>
            <template #updated_at="{ item }">
              <TooltipComponent 
                :position="'top'" 
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
                @buttonClicked="action('edit', item.id)"
                :buttonType="'button'"
                :textClass="'text-sm text-white'"
                :backgroundClass="'bg-purple-400 py-2 px-4'"
                :isDisable="false"
              >
                <template #text> Edit </template>
              </ButtonComponent>
              <ButtonComponent
                @buttonClicked="action('delete', item.id)"
                :buttonType="'button'"
                :textClass="'text-sm text-white'"
                :backgroundClass="'bg-pink-400 py-2 px-4 '"
                :isDisable="false"
              >
                <template #text> Delete </template>
              </ButtonComponent>
            </template>
            <template #footer>
              <div class="footer-item">
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
            <h1 class="text-2xl text-purple-500">Oops! Error occurs.</h1>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center text-2xl text-purple-500">Loading...</h1>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {
  ActionType,
  TableItem,
  TableField,
  ModuleType,
  Pagination,
} from "@/types/types";

import debounce from "lodash.debounce";
import moment from "moment";
import { onMounted, ref, computed, watch } from "vue";

// Views
import TableComponent from "@/components/table/TableComponent.vue";
import StackComponent from "@/components/table/StackComponent.vue";
import EllipsisInTable from "@/components/table/EllipsisInTable.vue";

import { useRoute, useRouter } from "vue-router";

import { useModalStore } from "@/store/modal";
import {
  deleteRecordById,
  fetchRecords as _fetchRecords,
} from "@/services/CRUDServices";

import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import InputField from "@/components/inputs/InputField.vue";

import TooltipComponent from "@/components/TooltipComponent.vue";

const router = useRouter();
const route = useRoute();
const modalStore = useModalStore();
const windowWidth = ref<number>(0);

const keyword = ref<string>("");

const isMobileView = ref<boolean>(false);

const props = defineProps<{ category: ModuleType }>();

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

const data = ref<TableItem[]>([]);
const pagination = ref<Pagination>({
  currentPage: 1,
  pages: 1,
  total: 1,
  count: 1,
  perPage: 10,
});
const changeCurrentPage = (payload) => {
  pagination.value.currentPage = payload;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const fields = computed<TableField[] | undefined>(() => {
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
    });
  } finally {
    isLoading.value = false;
  }
};

const action = async (type: ActionType, id: number) => {
  try {
    if (type === "edit") {
      router.push({ path: `/${props.category}/${type}/${id}`, replace: true });
    } else {
      const confirm = await modalStore.open({
        title: "Delete",
        message: "Are you sure?",
        type: "confirm",
        component: "",
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

const toAddPage = () => {
  router.push({ path: `/${props.category}/add`, replace: true });
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

const searchKeyword = debounce((payload) => {
  keyword.value = payload;
}, 2000);

watch(
  [
    () => props.category,
    () => pagination.value.currentPage,
    () => keyword.value,
  ],
  (
    [newCategory, newCurrentPage, newKeyword],
    [oldCategory, oldCurrentPage, oldKeyword],
  ) => {
    if (newKeyword !== oldKeyword || newCategory !== oldCategory) {
      fetchRecords(newCategory, 1, pagination.value.perPage, newKeyword);
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
