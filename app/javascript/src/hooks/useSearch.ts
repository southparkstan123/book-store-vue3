import debounce from "lodash.debounce";
import { ref } from "vue";

export const useSearch = () => {

  const keyword = ref<string>("");

  const searchKeyword = debounce((payload) => {
    keyword.value = payload;
  }, 2000);

  return {
    keyword,
    searchKeyword
  }
};