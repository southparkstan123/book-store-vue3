<template>
  <div :class="className">
    <textarea 
      :class="inputFieldClass"
      :name="inputName" 
      :id="inputId" 
      :cols="cols" 
      :rows="rows"
      :readonly="isReadonly"
      :placeholder="displayedPlaceholder"
      @keyup="changeValue"
      :value="inputValue"
    ></textarea>
    <slot name="hints" />
    <slot name="error-feedback" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


type InputFieldProps = {
  inputId: string,
  className: string,
  inputName: string,
  isRequired: boolean,
  placeholder: string,
  inputValue: string
  inputFieldClass: string
}

type TextareaFieldProps = InputFieldProps & {
  isReadonly: boolean,
  cols: string,
  rows: string
}

const props = withDefaults(defineProps<TextareaFieldProps>(), {
  inputId: '',
  className: '',
  inputName: '',
  isRequired: false,
  placeholder: 'Placeholder',
  inputValue: '',
  inputFieldClass: 'form-control',
  inputType: 'text',
  isReadonly: false,
  cols: '30',
  rows: '10'
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