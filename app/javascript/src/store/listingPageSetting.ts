import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { TableField, TableItem, ModuleType } from "@/types/types";

type Fields = { [key: ModuleType]: TableField[] };

const presetFields: Fields = {
  book: [
    { 
      key: "id", 
      label: "ID" 
    },
    { 
      key: "name", 
      label: "Name" 
    },
    { 
      key: "price", 
      label: "Price (USD)" 
    },
    { 
      key: "isbn", 
      label: "ISBN" 
    },
    { 
      key: "year_published", 
      label: "Year" 
    },
    { 
      key: "is_published", 
      label: "Is published?" 
    },
    { 
      key: "authors", 
      label: "Authors" 
    },
    { 
      key: "created_at", 
      label: "Created at" 
    },
    { 
      key: "updated_at",
      label: "Updated at" 
    },
  ],
  author: [
    { 
      key: "id", 
      label: "ID" 
    },
    { 
      key: "name", 
      label: "Name" 
    },
    { 
      key: "books", 
      label: "Books" 
    },
    { 
      key: "created_at", 
      label: "Created at" 
    },
    { 
      key: "updated_at",
      label: "Updated at" 
    },
  ],
  publisher: [
    { 
      key: "id", 
      label: "ID" 
    },
    { 
      key: "name", 
      label: "Name" 
    },
    { 
      key: "created_at", 
      label: "Created at" 
    },
    { 
      key: "updated_at",
      label: "Updated at" 
    },
  ],
}

export const useListingPageSettingStore = defineStore("listingPageSetting", () => {
  const state = reactive<{ fields: Fields; category: ModuleType | undefined }>({
    fields: presetFields,
    category: undefined
  })

  // Getters
  const getFields = computed<TableField[] | undefined>(() => state.fields[state.category]);
  const getCategory = computed<ModuleType | undefined>(() => state.category);

  // Actions
  const changeCategory = (payload?: ModuleType) => {
    state.category = payload;
  }

  const changeColumn = (payload?: TableField[]) => {
    state.fields[state.category] = payload;
  }

  return {
    getFields,
    getCategory,
    changeCategory,
    changeColumn
  };
})