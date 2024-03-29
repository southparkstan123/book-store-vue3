import type { Pagination } from "@/types/types";
import debounce from "lodash.debounce";
import { ref } from "vue";
import { useThemeStore } from "@/store/theme";

export const usePagination = () => {
  const themeStore = useThemeStore();
  const pagination = ref<Pagination>({
    currentPage: 1,
    pages: 1,
    total: 1,
    count: 1,
    perPage: themeStore.getPerPage,
  });

  const changeCurrentPage = (payload: number, callback: void) => {
    pagination.value.currentPage = payload;
    callback;
  };

  return {
    pagination,
    changeCurrentPage,
  };
};
