import { ref } from "vue";

export const useNavBar = () => {
  const percentageOfWidthOfMoblieMenu = ref<number>(50);

  return {
    percentageOfWidthOfMoblieMenu,
  };
};
