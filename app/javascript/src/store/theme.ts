import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Theme, PaginationSetting } from "@/types/types";

export const useThemeStore = defineStore("theme", () => {
  const state = reactive<{
    theme: getTheme;
    allThemes: Theme[];
    pagination: PaginationSetting;
    backgroundImages: { className: string; label: string }[];
    selectedBackgroundImageClass: string;
  }>({
    theme: "default",
    allThemes: ["default", "shoujyo"],
    pagination: {
      perPage: 10,
    },
    backgroundImages: [
      {
        className: "bg-none",
        label: "None",
      },
      {
        className: "bg-hero-image-1",
        label: "Lake Kussharo",
      },
      {
        className: "bg-hero-image-2",
        label: "Ishikari lighthouse",
      },
      {
        className: "bg-hero-image-3",
        label: "Lake Mashu",
      },
    ],
    selectedBackgroundImageClass: "bg-none",
  });

  // Getters
  const getTheme = computed<Theme>(() => state.theme);
  const getAllThemes = computed<Theme[]>(() => state.allThemes);
  const getPerPage = computed<number>(() => state.pagination.perPage);
  const getAllbackgroundImages = computed<
    { className: string; label: string }[]
  >(() => state.backgroundImages);
  const getBackgroundImageClass = computed<string>(
    () => state.selectedBackgroundImageClass,
  );

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

  const changeBackgroundImage = (payload?: string) => {
    const backgroundImageClass: string = localStorage.getItem("background");
    const value = payload
      ? payload
      : backgroundImageClass
      ? backgroundImageClass
      : state.selectedBackgroundImageClass;
    localStorage.setItem("background", value);
    state.selectedBackgroundImageClass = value;
  };

  return {
    getTheme,
    getAllThemes,
    getPerPage,
    getAllbackgroundImages,
    getBackgroundImageClass,
    onToggleTheme,
    changeValuePerPage,
    changeBackgroundImage,
  };
});
