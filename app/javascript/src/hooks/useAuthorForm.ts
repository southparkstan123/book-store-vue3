import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import type { AuthorFormState } from "@/types/types";

export const useAuthorForm = () => {
  const { errors } = useForm();
  const authorForm = reactive<AuthorFormState>({
    form: {
      name: "",
      description: "",
    },
    isLoading: false,
    mode: "add",
    isFormChanged: false,
  });

  return {
    errors,
    authorForm,
  };
};
