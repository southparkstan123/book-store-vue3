import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import type { PublisherFormState } from "@/types/types";
import { useModalStore } from "@/store/modal";
import { useRouter } from "vue-router";
import { fetchRecordById } from "@/services/CRUDServices";

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

  const fetchById = async (id: number) => {
    publisherForm.isLoading = true;
    try {
      const response = await fetchRecordById(id, "publisher");
      publisherForm.form.name = response.data.name;
      publisherForm.form.description = response.data.description;
    } catch (error: any) {
      errors.value = error.response.data.errors;
      modalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: "alert",
        component: "",
      });
    } finally {
      publisherForm.isLoading = false;
    }
  };

  return {
    errors,
    publisherForm,
    fetchById,
  };
};
