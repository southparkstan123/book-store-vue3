import type { Pagination } from "@/types/types";
import debounce from "lodash.debounce";
import { ref } from "vue";

export const usePagination = () => {

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

  return {
    pagination,
    changeCurrentPage
  }
};