import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import { BookFormState } from "@/types/types";

export const useBookForm = () => {
  const { errors } = useForm();
  const bookForm = reactive<BookFormState>({
    form: {
      name: "",
      abstract: "",
      price: 0,
      publisher_id: null,
      author_ids: [],
    },
    isLoading: false,
    mode: "add",
    isFormChanged: false,
  });

  return {
    errors,
    bookForm,
  };
};
