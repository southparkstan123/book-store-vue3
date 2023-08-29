import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import type { AuthorFormState } from "@/types/types";
import { useModalStore } from "@/store/modal";
import { useRouter } from "vue-router";
import { fetchRecordById } from "@/services/CRUDServices";

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

  const fetchById = async (id: number) => {
    authorForm.isLoading = true;
    try {
      const response = await fetchRecordById(id, "author");
      authorForm.form.name = response.data.name;
      authorForm.form.description = response.data.description;
    } catch (error: any) {
      errors.value = error.response.data.errors;
      modalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: "alert",
        component: "",
      });
    } finally {
      authorForm.isLoading = false;
    }
  };

  return {
    errors,
    authorForm,
    fetchById,
  };
};
