import { reactive, ref } from "vue";
import { useForm } from "@/hooks/useForm";
import { BookFormState } from "@/types/types";
import { useModalStore } from "@/store/modal";
import { useRouter } from "vue-router";

import {
  fetchRecordById,
  getNameOfAuthors,
  getNameOfPublishers,
} from "@/services/CRUDServices";

export const useBookForm = () => {
  const modalStore = useModalStore();
  const router = useRouter();

  const { errors } = useForm();

  // For Dropdowns
  const authors = ref([]);
  const publishers = ref([]);

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

  const fetchById = async (id: number) => {
    bookForm.isLoading = true;
    try {
      const bookAPI = await fetchRecordById(id, "book");

      bookForm.form.name = bookAPI.data.name;
      bookForm.form.price = bookAPI.data.price;
      bookForm.form.abstract = bookAPI.data.abstract;
      bookForm.form.publisher_id = bookAPI.data.publisher.id;
      bookForm.form.author_ids = bookAPI.data.authors.map((e) => e.id);
    } catch (error: any) {
      errors.value = error.response.data.errors;
      modalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: "alert",
        component: "",
      });
    } finally {
      bookForm.isLoading = false;
    }
  };

  const fetchForDropdowns = async () => {
    try {
      const authorsAPI = await getNameOfAuthors();
      const publishersAPI = await getNameOfPublishers();
      const response = await Promise.all([authorsAPI, publishersAPI]);

      authors.value = response[0].data;
      publishers.value = response[1].data;
    } catch (error: any) {
      errors.value = error.response.data.errors;
      modalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: "alert",
        component: "",
      });
    }
  };

  return {
    errors,
    authors,
    publishers,
    bookForm,
    fetchById,
    fetchForDropdowns,
  };
};
