import { ref } from "vue";

export const useForm = () => {
  const errors = ref<any>([]);

  return {
    errors,
  };
};
