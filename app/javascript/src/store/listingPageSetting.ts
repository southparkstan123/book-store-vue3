import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { TableField, ModuleType, Fields } from "@/types/types";
import { getColumnsFromAPI, setColumnsInLocalStorage, getColumnsFromLocalStorage } from "@/services/CRUDServices";

export const useListingPageSettingStore = defineStore(
  "listingPageSetting",
  () => {
    const state = reactive<{
      fields: Fields | undefined;
      category: ModuleType | undefined;
    }>({
      fields: undefined,
      category: undefined,
    });

    // Getters
    const getFields = computed<TableField[] | undefined>(() =>
      state.category ? state.fields?.[state.category] ?? undefined : undefined,
    );
    const getCategory = computed<ModuleType | undefined>(() => state.category);

    // Actions
    const changeCategory = (payload?: ModuleType) => {
      state.category = payload;
    };

    const changeColumn = (payload?: TableField[]) => {
      if (state.category) {
        if (payload) {
          if (state.fields) {
            state.fields[state.category] = payload;

            setColumnsInLocalStorage(state.fields);
          }
        }
      }
    };

    const loadColumnNames = async (types: ModuleType[]) => {
      const presetFields = getColumnsFromLocalStorage();

      if (presetFields) {
        const parsedFields: Fields = JSON.parse(presetFields);
        state.fields = parsedFields;
      } else {
        let list = {
          book: [],
          author: [],
          publisher: [],
        };

        for await (const response of getColumnsFromAPI(types)) {
          Object.assign(list, response);
        }

        setColumnsInLocalStorage(list);

        state.fields = list;
      }
    }

    return {
      getFields,
      getCategory,
      changeCategory,
      changeColumn,
      loadColumnNames
    };
  },
);
