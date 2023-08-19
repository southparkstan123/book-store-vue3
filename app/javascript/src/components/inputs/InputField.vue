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
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type InputType = 'text' | 'email' | 'password' | 'number';

type InputFieldProps = {
  inputId: string,
  className: string,
  inputName: string,
  isRequired: boolean,
  placeholder: string,
  inputValue: string
  inputFieldClass: string
  isDisabled: boolean
};

type RangeProps = {
  step: number | undefined
  min: number | undefined
  max: number | undefined
}

const props = withDefaults(defineProps<InputFieldProps & {inputType: InputType} & RangeProps>(), {
  inputId: '',
  className: '',
  inputName: '',
  isRequired: false,
  placeholder: 'Placeholder',
  inputValue: '',
  inputFieldClass: 'form-control',
  inputType: 'text',
  isDisabled: false
})

const displayedPlaceholder = computed<string>(() => {
  return (props.isRequired) ? `${props.placeholder} (Required)` : props.placeholder
})

const emit = defineEmits<{
  (e: 'changeValue', payload: any): void
}>()

const changeValue = (event) => {
  emit('changeValue', event.target.value)
}

</script>

<style scoped>

</style>