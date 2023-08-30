<template>
  <div :class="className">
    <input
      :id="inputId"
      :type="inputType"
      :class="inputFieldClass"
      :name="inputName"
      :placeholder="displayedPlaceholder"
      :value="inputValue"
      @keyup="changeValue"
      @change="changeValue"
      :disabled="isDisabled"
      :step="step"
      :min="min"
      :max="max"
      :checked="checked"
    />
    <slot name="label"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { InputType, InputFieldProps, RangeProps, CheckboxProps, RadioButtonProps } from "@/types/types";

const props = withDefaults(
  defineProps<InputFieldProps & { inputType: InputType } & RangeProps & CheckboxProps & RadioButtonProps>(),
  {
    inputId: "",
    className: "",
    inputName: "",
    isRequired: false,
    placeholder: "Placeholder",
    inputValue: "",
    inputFieldClass: "form-control",
    inputType: "text",
    isDisabled: false,
    checked: false
  },
);

const displayedPlaceholder = computed<string>(() => {
  return props.isRequired
    ? `${props.placeholder} (Required)`
    : props.placeholder;
});

const emit = defineEmits<{
  (e: "changeValue", payload: any): void;
}>();

const changeValue = (event) => {
  if(props.inputType === 'checkbox'){
    const { checked, value } = event.target;
    emit("changeValue", { checked, value });
  } else {
    emit("changeValue", event.target.value);
  }
};
</script>

<style scoped></style>
