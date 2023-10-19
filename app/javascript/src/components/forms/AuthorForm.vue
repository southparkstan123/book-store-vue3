<template>
  <Transition :appear="true" name="fade" mode="out-in">
    <div v-if="!authorForm.isLoading" class="max-w-xl w-full space-y-8 px-2">
      <ErrorFeedback v-if="errors.length > 0" :errors="errors"></ErrorFeedback>
      <slot name="back"></slot>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="mt-8 grid grid-cols-1 gap-6 items-start">
          <div class="grid grid-cols-1 gap-6">
            <LabelWrapper
              :forAttribute="'name'"
              :textClass="'text-gray-700'"
              :labelText="'Name'"
              :isRequired="true"
            >
              <InputField
                :inputId="'name'"
                :inputValue="authorForm.form.name"
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputType="'text'"
                :placeholder="'Name'"
                :isRequired="true"
                @changeValue="onChangeName"
              ></InputField>
            </LabelWrapper>
            <LabelWrapper
              :forAttribute="'description'"
              :textClass="'text-gray-700'"
              :labelText="'Description'"
              :isRequired="true"
            >
              <TextArea
                :inputId="'description'"
                :inputName="'description'"
                :inputFieldClass="'block w-full mt-1'"
                :inputValue="authorForm.form.description"
                :placeholder="'Description'"
                :isRequired="true"
                :rows="'5'"
                @changeValue="onChangeDescription"
              ></TextArea>
            </LabelWrapper>
          </div>
        </div>
        <div class="block">
          <ButtonComponent
            :isDisabled="!authorForm.isFormChanged"
            :buttonType="'submit'"
            :textClass="'text-sm font-medium justify-center text-white'"
            :backgroundClass="'disabled:opacity-25 group relative bg-success w-full flex py-2 px-4 border border-transparent rounded-md'"
          >
            <template #text> Submit </template>
          </ButtonComponent>
        </div>
      </form>
    </div>
    <div v-else>
      <h1 class="text-center text-2xl text-info">Loading...</h1>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthorForm } from "@/hooks/useAuthorForm";
import { useModalStore } from "@/store/modal";
import { updateRecordById, createRecord } from "@/services/CRUDServices";
import { useRouter } from "vue-router";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import LabelWrapper from "@/components/inputs/LabelWrapper.vue";

import ErrorFeedback from "@/components/ErrorFeedback.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();
const { errors, authorForm, fetchById } = useAuthorForm();
const modalStore = useModalStore();

const router = useRouter();

const onChangeName = (payload) => {
  authorForm.form.name = payload;
  onChangeForm(true);
};

const onChangeDescription = (payload) => {
  authorForm.form.description = payload;
  onChangeForm(true);
};

const onChangeForm = (payload) => {
  authorForm.isFormChanged = payload;
  emit("formChanged", payload);
};

const onSubmit = async () => {
  try {
    onChangeForm(false);
    let response: any = {};

    if (authorForm.mode === "edit") {
      response = await updateRecordById(props.id, authorForm.form, "author");
    } else {
      response = await createRecord(authorForm.form, "author");
    }

    router.push("/author/list");

    modalStore.open({
      title: "Success",
      message: response.data.message,
      type: "alert",
      component: "",
      props: undefined
    });
  } catch (error: any) {
    errors.value = error.response.data.errors;

    modalStore.open({
      title: `${error.response.status} Error`,
      message: error.response.statusText,
      type: "alert",
      component: "",
      props: undefined
    });
  }
};

onMounted(() => {
  if (props.id) {
    authorForm.mode = "edit";
    fetchById(props.id);
  }
});
</script>

<style scoped></style>
