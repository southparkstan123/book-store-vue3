<template>
  <Transition :appear="true" name="fade">
    <div v-if="!bookForm.isLoading" class="max-w-md w-full space-y-8">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-2 gap-6">
            <LabelWrapper
              :forAttribute="'name'"
              :textClass="'text-gray-700'"
              :labelText="'Name'"
            >
              <InputField
                :inputId="'name'"
                :className="''"
                :inputValue="bookForm.form.name"
                :inputFieldClass="'block w-full mt-1'"
                :inputType="'text'"
                :placeholder="'Name'"
                @changeValue="onChangeName"
                :step="undefined"
                :min="undefined"
                :max="undefined"
              ></InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'publisher'"
              :textClass="'text-gray-700'"
              :labelText="'Publisher'"
            >
              <DropdownMenu
                :data="publishers"
                :selectedItem="bookForm.form.publisher_id"
                @selectedItem="onChangePublisher"
              >
              </DropdownMenu>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'price'"
              :textClass="'text-gray-700'"
              :labelText="'Price'"
            >
              <InputField
                :inputId="'price'"
                :className="''"
                :inputValue="bookForm.form.price"
                :inputFieldClass="'block w-full mt-1'"
                :inputType="'number'"
                :placeholder="'Price (USD)'"
                :step="0.1"
                :min="0"
                :max="1000"
                @changeValue="onChangePrice"
              ></InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'authors'"
              :textClass="'text-gray-700'"
              :labelText="'Authors'"
            >
              <MultiSelectDropdown
                :data="authors"
                :selectedItems="bookForm.form.author_ids"
                @selectedItems="onChangeAuthors"
              >
              </MultiSelectDropdown>
            </LabelWrapper>
          </div>
          <div class="grid grid-cols-1 gap-6">
            <LabelWrapper
              :forAttribute="'abstract'"
              :textClass="'text-gray-700'"
              :labelText="'Abstract'"
            >
              <TextArea
                :inputId="'abstract'"
                :inputName="'abstract'"
                :inputFieldClass="'block w-full mt-1'"
                :inputValue="bookForm.form.abstract"
                :placeholder="'Abstract'"
                :rows="'5'"
                @changeValue="onChangeAbstract"
              ></TextArea>
            </LabelWrapper>
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
import { onMounted } from "vue";
import { useBookForm } from "@/hooks/useBookForm";
import { useModalStore } from "@/store/modal";
import { useRouter } from "vue-router";

import DropdownMenu from "@/components/dropdowns/DropdownMenu.vue";
import ErrorFeedback from "@/components/ErrorFeedback.vue";

import { updateRecordById, createRecord } from "@/services/CRUDServices";

import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown.vue";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import LabelWrapper from "@/components/inputs/LabelWrapper.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();

const modalStore = useModalStore();
const router = useRouter();

const { errors, bookForm, fetchById, authors, publishers, fetchForDropdowns } =
  useBookForm();

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

const onChangeForm = (payload) => {
  bookForm.isFormChanged = payload;
  emit("formChanged", payload);
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
