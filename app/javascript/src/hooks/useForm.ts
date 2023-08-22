import type {
  AuthorFormState,
  BookFormState,
  ModalType,
  PublisherFormState,
} from "@/types/types";
import { ref } from "vue";

export const useForm = () => {
  const errors = ref<any>([]);

  return {
    errors
  };
};
