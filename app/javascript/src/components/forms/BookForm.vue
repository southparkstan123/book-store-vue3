<template>
  <Transition :appear="true" name="fade" mode="out-in">
    <div v-if="!bookForm.isLoading" class="max-w-xl w-full space-y-8 px-2">
      <div class="float-right">
        <slot name="back"></slot>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            <LabelWrapper
              :forAttribute="'name'"
              :textClass="'text-gray-700'"
              :labelText="'Name'"
              :isRequired="true"
            >
              <InputField
                :inputId="'name'"
                :inputValue="bookForm.form.name"
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputType="'text'"
                :placeholder="'Name'"
                :isRequired="true"
                @changeValue="onChangeName"
              ></InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'isbn'"
              :textClass="'text-gray-700'"
              :labelText="'ISBN'"
              :isRequired="true"
            >
              <InputField
                :inputId="'isbn'"
                :inputValue="bookForm.form.isbn"
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputType="'text'"
                :placeholder="'ISBN'"
                :isRequired="true"
                @changeValue="onChangeISBN"
              >
                <template #label>
                  <span class="text-red-400">Hint: ISBN10 and ISBN13 supported</span>
                </template>
              </InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'year_published'"
              :textClass="'text-gray-700'"
              :labelText="'Year'"
              :isRequired="true"
            >
              <InputField
                :inputId="'year_published'"
                :inputValue="bookForm.form.year_published"
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputType="'number'"
                :placeholder="'Year'"
                :step="1"
                :min="1900"
                :max="2023"
                @changeValue="onChangeYearPublished"
                :isRequired="true"
              >
                <template #label>
                  <span class="text-red-400">Hint: From 1900 to {{ new Date().getFullYear() }}</span>
                </template>
              </InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'is_published'"
              :textClass="'text-gray-700'"
              :labelText="'Is Published?'"
              :isRequired="false"
            >
              <ToggleSwitch 
                class="block w-full mt-1 disabled:opacity-25"
                :forAttribute="'is_published'"
                :label="''"
                :inputValue="bookForm.form.is_published ? bookForm.form.is_published : false"
                @changeValue="({ checked }) => onChangeIsPublished(checked)"
              />
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'publisher'"
              :textClass="'text-gray-700'"
              :labelText="'Publisher'"
              :isRequired="true"
            >
              <DropdownMenu
                :data="publishers"
                :placeholder="'Please select the publisher'"
                :selectedItem="bookForm.form.publisher_id"
                @selectedItem="onChangePublisher"
              >
              </DropdownMenu>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'price'"
              :textClass="'text-gray-700'"
              :labelText="'Price (USD)'"
              :isRequired="true"
            >
              <InputField
                :inputId="'price'"
                :inputValue="bookForm.form.price"
                :inputFieldClass="'range w-full h-2 mt-1 disabled:opacity-25 accent-primary'"
                :inputType="'range'"
                :placeholder="'Price (USD)'"
                :step="1"
                :min="10"
                :max="100"
                @changeValue="onChangePrice"
                :isRequired="true"
              >
                <template #label>
                  <span class="float-left w-1/5">${{ bookForm.form.price }}</span>
                </template>
              </InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'authors'"
              :textClass="'text-gray-700'"
              :labelText="'Authors'"
              :isRequired="true"
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
              :isRequired="true"
            >
              <TextArea
                :inputId="'abstract'"
                :inputName="'abstract'"
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputValue="bookForm.form.abstract"
                :placeholder="'Abstract'"
                :rows="'5'"
                :isRequired="true"
                @changeValue="onChangeAbstract"
              ></TextArea>
            </LabelWrapper>
          </div>
        </div>
        <div class="block">
          <ButtonComponent
            :isDisabled="isValidated === false"
            :buttonType="'submit'"
            :textClass="'text-sm font-medium justify-center text-white'"
            :backgroundClass="'disabled:opacity-25 group relative bg-success w-full flex py-2 px-4 border border-transparent rounded-md'"
          >
            <template #text> Submit </template>
          </ButtonComponent>
        </div>
      </form>
    </div>
    <div class="flex items-center justify-center" v-else>
      <LoadingComponent class="text-2xl text-primary" :text="'Loading...'" :animationType="'fade-in-zoom-in'"/>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useBookForm } from "@/hooks/useBookForm";
import { useModalStore } from "@/store/modal";
import { useRouter } from "vue-router";

import DropdownMenu from "@/components/dropdowns/DropdownMenu.vue";
import ErrorFeedback from "@/components/ErrorFeedback.vue";

import { updateRecordById, createRecord } from "@/services/CRUDServices";

import MultiSelectDropdown from "@/components/dropdowns/MultiSelectDropdown.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import LabelWrapper from "@/components/inputs/LabelWrapper.vue";
import ToggleSwitch from "@/components/inputs/ToggleSwitch.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();

const modalStore = useModalStore();
const router = useRouter();

const { errors, bookForm, fetchById, authors, publishers, fetchForDropdowns } =
  useBookForm();

const onChangeName = (payload) => {
  bookForm.form.name = payload;
};

const onChangeAbstract = (payload) => {
  bookForm.form.abstract = payload;
};

const onChangePrice = (payload) => {
  bookForm.form.price = payload;
};

const onChangePublisher = (payload) => {
  bookForm.form.publisher_id = payload;
};

const onChangeAuthors = (payload) => {
  bookForm.form.author_ids = payload;
};

const onChangeYearPublished = (payload) => {
  bookForm.form.year_published = payload;
}

const onChangeISBN = (payload) => {
  bookForm.form.isbn = payload;
}

const onChangeIsPublished = (payload) => {
  bookForm.form.is_published = payload;
}

const onSubmit = async () => {
  try {
    bookForm.isFormChanged = false;
    emit("formChanged", false);
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
      props: undefined,
      isFitContent: true
    });
  } catch (error: any) {
    errors.value = error.response.data.errors;
    modalStore.open({
      title: `${error.response.status} Error - ${error.response.statusText ? error.response.statusText: error.response.message}`,
      message: "",
      type: "content",
      component: ErrorFeedback,
      props: {
        errors
      },
      isFitContent: true
    });
  }
};

const isValidated = computed(() => bookForm.isFormChanged !== false)

onMounted(async () => {
  if (props.id) {
    bookForm.mode = "edit";
    await fetchById(props.id);
  }
  await fetchForDropdowns();

  bookForm.isFormChanged = false;
  emit("formChanged", false);
});

watch(bookForm.form, () => {
  bookForm.isFormChanged = true;
  emit("formChanged", true);
}, { 
  deep: true 
})
</script>

<style scoped></style>
