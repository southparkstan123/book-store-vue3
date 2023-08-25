import { ref } from "vue";

export const useNavBar = () => {
  const backgroundColor = ref<string>("purple");
  const percentageOfWidthOfMoblieMenu = ref<number>(50);

  return {
    backgroundColor,
    percentageOfWidthOfMoblieMenu,
  };
};
