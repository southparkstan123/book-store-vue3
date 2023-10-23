<template>
  <Transition :appear="true" name="fade" mode="out-in">
    <div v-if="!publisherForm.isLoading">
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
                :inputValue="publisherForm.form.name"
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
                :inputFieldClass="'block w-full mt-1 disabled:opacity-25'"
                :inputValue="publisherForm.form.description"
                :placeholder="'Description'"
                :rows="'5'"
                :isRequired="true"
                @changeValue="onChangeDescription"
              ></TextArea>
            </LabelWrapper>
          </div>
        </div>
        <div class="block">
          <ButtonComponent
            :isDisabled="!publisherForm.isFormChanged"
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
      <h1 class="text-center text-2xl text-primary">Loading...</h1>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePublisherForm } from "@/hooks/usePublisherForm";
import { useModalStore } from "@/store/modal";
import { updateRecordById, createRecord } from "@/services/CRUDServices";
import ErrorFeedback from "@/components/ErrorFeedback.vue";
import { useRouter } from "vue-router";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import LabelWrapper from "@/components/inputs/LabelWrapper.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();

const { errors, publisherForm, fetchById } = usePublisherForm();
const modalStore = useModalStore();

const router = useRouter();

const onChangeForm = (payload) => {
  publisherForm.isFormChanged = payload;
  emit("formChanged", payload);
};

const onChangeName = (payload) => {
  publisherForm.form.name = payload;
  onChangeForm(true);
};

const onChangeDescription = (payload) => {
  publisherForm.form.description = payload;
  onChangeForm(true);
};

const onSubmit = async () => {
  try {
    onChangeForm(false);
    let response: any = {};

    if (publisherForm.mode === "edit") {
      response = await updateRecordById(
        props.id,
        publisherForm.form,
        "publisher",
      );
    } else {
      response = await createRecord(publisherForm.form, "publisher");
    }

    router.push("/publisher/list");

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
      title: `${error.response.status} Error - ${error.response.statusText ? error.response.statusText: error.response.data.message}`,
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

onMounted(() => {
  if (props.id) {
    publisherForm.mode = "edit";
    fetchById(props.id);
  }
});
</script>

<style scoped></style>
