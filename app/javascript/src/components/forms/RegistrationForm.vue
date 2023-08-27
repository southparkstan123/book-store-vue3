<template>
  <ErrorFeedback :errors="errors" />
  <form class="mt-8 space-y-6" @submit.prevent="onRegistration">
    <InputField
      :inputId="'username'"
      :className="'w-full'"
      :inputType="'text'"
      :placeholder="'Username'"
      :isRequired="true"
      :step="undefined"
      :min="undefined"
      :max="undefined"
      @changeValue="onChangeUsername"
    >
    </InputField>
    <InputField
      :inputId="'email'"
      :className="'w-full'"
      :inputType="'email'"
      :placeholder="'Email'"
      :isRequired="true"
      :step="undefined"
      :min="undefined"
      :max="undefined"
      @changeValue="onChangeEmail"
    >
    </InputField>
    <InputField
      :inputId="'password'"
      :className="'w-full'"
      :inputType="'password'"
      :placeholder="'Password'"
      :isRequired="true"
      :step="undefined"
      :min="undefined"
      :max="undefined"
      @changeValue="onChangePassword"
    >
    </InputField>
    <InputField
      :inputId="'password-confirmation'"
      :className="'w-full'"
      :inputType="'password'"
      :placeholder="'Password Conformation'"
      :isRequired="true"
      :step="undefined"
      :min="undefined"
      :max="undefined"
      @changeValue="onChangePasswordConfirmation"
    >
    </InputField>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <ButtonComponent
          :buttonType="'submit'"
          :textClass="'text-sm font-medium'"
          :backgroundClass="'group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-info focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
        >
          <template #text> Register </template>
        </ButtonComponent>
      </div>
      <div class="flex items-center">
        <ButtonComponent
          @buttonClicked="toLoginPage"
          :buttonType="'button'"
          :textClass="'text-sm bg-success'"
          :backgroundClass="' focus:outline-none'"
        >
          <template #text> Login page </template>
        </ButtonComponent>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import InputField from "@/components/inputs/InputField.vue";
import ButtonComponent from "@/components/inputs/ButtonComponent.vue";
import ErrorFeedback from "@/components/ErrorFeedback.vue";

import { register } from "@/services/AuthServices";
import { useModalStore } from "@/store/modal";
import { useForm } from "@/hooks/useForm";

const router = useRouter();
const modalStore = useModalStore();
const { errors } = useForm();

import type { RegistrationForm } from "@/types/types";

const registrationForm = reactive<RegistrationForm>({
  form: {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
});

const onChangeUsername = (payload: string) => {
  registrationForm.form.username = payload;
};

const onChangeEmail = (payload: string) => {
  registrationForm.form.email = payload;
};

const onChangePassword = (payload: string) => {
  registrationForm.form.password = payload;
};

const onChangePasswordConfirmation = (payload: string) => {
  registrationForm.form.password_confirmation = payload;
};

const toLoginPage = () => {
  router.push("/signin");
};

const onRegistration = async () => {
  try {
    const result = await register(registrationForm);

    modalStore.open({
      title: "Success",
      message: result.data.message,
      type: "alert",
      component: "",
    });

    router.push("/signin");
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
</script>

<style scoped></style>
