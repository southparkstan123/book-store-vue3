import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Theme } from "@/types/types";

export const useThemeStore = defineStore("theme", () => {
  const state = reactive<{theme: getTheme; allThemes: Theme[]}>({
    theme: "default",
    allThemes: ["default", "shoujyo"]
  })

  // Getters
  const getTheme = computed<Theme>(() => state.theme);
  const getAllThemes = computed<Theme[]>(() => state.allThemes);

  // Action
  const onToggleTheme = (payload?: Theme) => {
    let htmlElement = document.querySelector('html'); 
    const themeFromLocalStorage = localStorage.getItem('theme') as Theme;
    const mode = payload ? payload : (themeFromLocalStorage ? themeFromLocalStorage : 'default' );
    htmlElement?.classList.remove(themeFromLocalStorage);
    htmlElement?.classList.add(mode);
    localStorage.setItem('theme', mode);
    state.theme = mode;
  }

  return {
    getTheme,
    getAllThemes,
    onToggleTheme
  };
})