import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import { PublisherFormState } from "@/types/types";

export const usePublisherForm = () => {
  const { errors } = useForm();
  const publisherForm = reactive<PublisherFormState>({
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
    publisherForm,
  };
};
