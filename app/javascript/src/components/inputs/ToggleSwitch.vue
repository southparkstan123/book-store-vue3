<template>
  <LabelWrapper 
    class="relative inline-flex items-center cursor-pointer"
    :forAttribute="forAttribute"
    :textClass="''"
    :labelText="''"
  >
    <InputField 
      :inputId="forAttribute" 
      :className="'inline-flex'" 
      :inputValue="inputValue"
      :inputFieldClass="'sr-only peer disabled:opacity-25'" 
      :inputName="forAttribute" 
      :inputType="'checkbox'"
      :checked="inputValue" 
      @changeValue="onChangeValue"
    >
      <template #label>
        <div :class="classWithSize" class="bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-muted after:border after:rounded-full after:transition-all peer-checked:bg-primary"></div>
        <span :class="labelClassWithSize" class="ml-3 text-primary">{{ label }}</span>
      </template>
    </InputField>
  </LabelWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LabelWrapper from '@/components/inputs/LabelWrapper.vue';
import InputField from "@/components/inputs/InputField.vue";

const props = withDefaults(defineProps<{ 
  forAttribute: string; 
  label: string; 
  inputValue: boolean; 
  size: 'small' | 'medium' | 'large';
}>(), {
  forAttribute: '',
  label: '',
  inputValue: false,
  size: 'medium'
});

const labelClassWithSize = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-sm';
    case 'large':
      return 'text-lg';
    default:
      return '';
  }
});

const classWithSize = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'w-9 h-5 after:top-[2px] after:left-[2px] after:h-4 after:w-4';
    case 'large':
      return 'w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6';
    default:
      return 'w-11 h-6 after:top-[2px] after:left-[2px] after:h-5 after:w-5';
  }
});

const emit = defineEmits<{e; 'changeValue'}>()

const onChangeValue = (payload) => {
  emit('changeValue', payload)
}

</script>

<style scoped>

</style>