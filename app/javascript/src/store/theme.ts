import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Theme, PaginationSetting } from "@/types/types";

export const useThemeStore = defineStore("theme", () => {
  const state = reactive<{
    theme: getTheme;
    allThemes: Theme[];
    pagination: PaginationSetting;
  }>({
    theme: "default",
    allThemes: ["default", "shoujyo"],
    pagination: {
      perPage: 10,
    },
  });

  // Getters
  const getTheme = computed<Theme>(() => state.theme);
  const getAllThemes = computed<Theme[]>(() => state.allThemes);
  const getPerPage = computed<number>(() => state.pagination.perPage);

  // Actions
  const onToggleTheme = (payload?: Theme) => {
    let htmlElement = document.querySelector("html");
    const themeFromLocalStorage = localStorage.getItem("theme") as Theme;
    const mode = payload
      ? payload
      : themeFromLocalStorage
      ? themeFromLocalStorage
      : "default";
    htmlElement?.classList.remove(themeFromLocalStorage);
    htmlElement?.classList.add(mode);
    localStorage.setItem("theme", mode);
    state.theme = mode;
  };

  const changeValuePerPage = (payload?: number) => {
    const perPage: number = parseInt(localStorage.getItem("perPage"), 10);
    const value = payload
      ? payload
      : perPage
      ? perPage
      : state.pagination.perPage;
    localStorage.setItem("perPage", value);
    state.pagination.perPage = value;
  };

  return {
    getTheme,
    getAllThemes,
    getPerPage,
    onToggleTheme,
    changeValuePerPage,
  };
});
