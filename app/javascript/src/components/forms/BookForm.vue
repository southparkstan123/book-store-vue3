<template>
  <Transition :appear="true" name="fade">
    <div v-if="!bookForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <label class="block" for="name">
              <span class="text-gray-700">Name</span>
              <InputField
                :inputId="'name'"
                :className="''"
                :inputValue="bookForm.form.name"
                :inputFieldClass="'block w-full mt-1'"
                :inputType="'text'"
                :placeholder="'name'"
                @changeValue="onChangeName"
                :step="undefined"
                :min="undefined"
                :max="undefined"
              ></InputField>
            </label>
            <label class="block" for="abtract">
              <span class="text-gray-700">Abstract</span>
              <TextArea
                :inputId="'description'"
                :inputName="'description'"
                :inputFieldClass="'block w-full mt-1'"
                :inputValue="bookForm.form.abstract"
                @changeValue="onChangeAbstract"
              ></TextArea>
            </label>
            <label class="block" for="price">
              <span class="text-gray-700">Price</span>
              <InputField
                :inputId="'price'"
                :className="''"
                :inputValue="bookForm.form.price"
                :inputFieldClass="'block w-full mt-1'"
                :inputType="'number'"
                :step="0.1"
                :min="0"
                :max="1000"
                @changeValue="onChangePrice"
              ></InputField>
            </label>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <label class="block" for="publisher">
              <span class="text-gray-700">Publisher</span>
              <DropdownMenu
                :data="publishers"
                :selectedItem="bookForm.form.publisher_id"
                @selectedItem="onChangePublisher"
              >
              </DropdownMenu>
            </label>
            <label class="block" for="authors">
              <span class="text-gray-700">Authors</span>
              <MultiSelectDropdown
                :data="authors"
                :selectedItems="bookForm.form.author_ids"
                @selectedItems="onChangeAuthors"
              >
              </MultiSelectDropdown>
            </label>
          </div>
        </div>
        <div class="block">
          <ButtonComponent
            :isDisabled="!bookForm.isFormChanged"
            :buttonType="'submit'"
            :textClass="'text-sm font-medium justify-center text-white'"
            :backgroundClass="'group relative bg-green-300 w-full flex py-2 px-4 border border-transparent rounded-md'"
          >
            <template #text> Submit </template>
          </ButtonComponent>
        </div>
      </form>
    </div>
    <div v-else>
      <h1 class="text-center text-2xl text-red-500">Loading...</h1>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBookForm } from "@/hooks/useBookForm";
import { useModalStore } from "@/store/modal";

import DropdownMenu from "@/components/dropdowns/DropdownMenu.vue";
import ErrorFeedback from "@/components/ErrorFeedback.vue";

import {
  fetchRecordById,
  updateRecordById,
  createRecord,
  getNameOfAuthors,
  getNameOfPublishers,
} from "@/services/CRUDServices";
import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown.vue";
import { useRouter } from "vue-router";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();

const { errors, bookForm } = useBookForm();
const modalStore = useModalStore();

// For Dropdowns
const authors = ref([]);
const publishers = ref([]);

const router = useRouter();

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

const onChangeForm = (payload) => {
  bookForm.isFormChanged = payload;
  emit("formChanged", payload);
};

const onChangeName = (payload) => {
  bookForm.form.name = payload;
  onChangeForm(true);
};

const onChangeAbstract = (payload) => {
  bookForm.form.abstract = payload;
  onChangeForm(true);
};

const onChangePrice = (payload) => {
  bookForm.form.price = payload;
  onChangeForm(true);
};

const onChangePublisher = (payload) => {
  bookForm.form.publisher_id = payload;
  onChangeForm(true);
};

const onChangeAuthors = (payload) => {
  bookForm.form.author_ids = payload;
  onChangeForm(true);
};

const onSubmit = async () => {
  try {
    onChangeForm(false);
    let response: any = {};

    if (bookForm.mode === "edit") {
      response = await updateRecordById(props.id, bookForm.form, "book");
    } else {
      response = await createRecord(bookForm.form, "book");
    }

    router.push("/book/list");

    modalStore.open({
      title: "Success",
      message: response.data.message,
      type: "alert",
      component: "",
    });
  } catch (error: any) {
    errors.value = error.response.data.errors;
    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.statusText,
      type: "alert",
      component: "",
    });
  }
};

onMounted(() => {
  if (props.id) {
    bookForm.mode = "edit";
    fetchById(props.id);
  }
  fetchForDropdowns();
});
</script>

<style scoped></style>
