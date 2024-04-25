<template>
  <Transition :appear="true" name="fade" mode="out-in">
    <div v-if="!authorForm.isLoading" class="max-w-xl w-full space-y-8 px-2">
      <div class="float-right">
        <slot name="back"></slot>
      </div>
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
                :inputFieldClass="`${
                  errors.name ? 'border border-danger' : ''
                } block w-full mt-1 disabled:opacity-25`"
                :inputType="'text'"
                :placeholder="'Name'"
                :isRequired="true"
                @changeValue="onChangeName"
              >
                <template #error-feedback>
                  <ErrorFeedback v-if="errors.name" :errors="errors.name" />
                </template>
              </InputField>
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
                :inputFieldClass="`${
                  errors.description ? 'border border-danger' : ''
                } block w-full mt-1`"
                :inputValue="authorForm.form.description"
                :placeholder="'Description'"
                :isRequired="true"
                :rows="'5'"
                @changeValue="onChangeDescription"
              >
                <template #hints>
                  <span class="text-sm text-warning">{{ hints }}</span>
                </template>

                <template #error-feedback>
                  <ErrorFeedback
                    v-if="errors.description"
                    :errors="errors.description"
                  />
                </template>
              </TextArea>
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
      <LoadingComponent
        class="text-2xl text-primary"
        :text="'Loading...'"
        :animationType="'fade-in-zoom-in'"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useAuthorForm } from "@/hooks/useAuthorForm";
import { useMessageStore } from "@/store/message";
import { updateRecordById, createRecord } from "@/services/CRUDServices";
import { useRouter } from "vue-router";

// Inputs
import InputField from "@/components/inputs/InputField.vue";
import TextArea from "@/components/inputs/TextArea.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import LabelWrapper from "@/components/inputs/LabelWrapper.vue";

import ErrorFeedback from "@/components/ErrorFeedback.vue";
import LoadingComponent from "@/components/loading/LoadingComponent.vue";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{ e; formChanged }>();
const { errors, authorForm, fetchById, hints, limit } = useAuthorForm();
const messageStore = useMessageStore();

const router = useRouter();

const onChangeName = (payload) => {
  authorForm.form.name = payload;
};

const onChangeDescription = (payload) => {
  authorForm.form.description = payload;
};

const onSubmit = async () => {
  try {
    authorForm.isFormChanged = false;
    emit("formChanged", false);

    let response: any = {};

    if (authorForm.mode === "edit") {
      response = await updateRecordById(props.id, authorForm.form, "author");
    } else {
      response = await createRecord(authorForm.form, "author");
    }

    console.log(response);

    router.push("/author/list");

    messageStore.push({
      content: response.data.message,
      type: "success"
    });
  } catch (error: any) {
    errors.value = error.response.data.errors;

    messageStore.push({
      content: [`${error.response.status} Error`, `${error.response.statusText ? error.response.statusText : error.response.data.message}`].join("\n"),
      type: "error"
    });
  }
};

onMounted(async () => {
  if (props.id) {
    authorForm.mode = "edit";
    await fetchById(props.id);
  }

  authorForm.isFormChanged = false;
  emit("formChanged", false);
});

const isValidated = computed(
  () =>
    authorForm.isFormChanged !== false &&
    authorForm.form.description.length < limit.value,
);

watch(
  authorForm.form,
  () => {
    authorForm.isFormChanged = true;
    emit("formChanged", true);
  },
  {
    deep: true,
  },
);
</script>

<style scoped></style>
