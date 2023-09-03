<template>
  <div v-if="data" class="inline">
    <InputField 
      v-for="item in fields" 
      :inputId="item.key" 
      :className="'my-1'" 
      :inputValue="item.key"
      :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" 
      :inputName="'districts'"
      :checked="item.isVisible"
      @changeValue="({ checked, value }) => onChangeVisible(item, checked)"
      :inputType="'checkbox'">
      <template #label>
        <label :for="item.key" class="px-3">{{ item.key }}</label>
        <span>Label:</span>
        <InputField 
          :className="'my-1 inline'" 
          :inputType="'text'" 
          :placeholder="`Label of ${item.key}`"
          :inputValue="item.label"
          :isDisabled="item.isVisible === false"
          @changeValue="(payload) => onChangeLabel(item, payload)"
        ></InputField>
      </template>
    </InputField>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import type { TableItem, TableField } from "@/types/types";
import InputField from "@/components/inputs/InputField.vue";

type DataProps = {
  data: TableItem[] | undefined;
  presetFields: TableField[] | undefined;
};

type Fields = TableField & { isVisible: boolean }

const props = withDefaults(defineProps<DataProps>(), {
  data: undefined,
  presetFields: undefined
});

const test = computed<Fields[]>(() => {
  return (props.presetFields) ? props.presetFields.map((field) => { 
    return {
      ...field,
      isVisible: true
    }
  }) : []
});

const fields = reactive<Fields[]>(
  (props.data) ? Object.entries(props.data[0]).map(([_key]) => {
    const _test = test.value.find(item => item.key === _key);
    return {
      key: _key, 
      label: _test ? _test.label : _key,
      isVisible: props.presetFields ? _test ? _test.isVisible : false : true
    }
}): []);

const emit = defineEmits<{e; 'onChangeColumn'}>()

const onChangeVisible = (item, checked) => {
  item.isVisible = checked;
  emit('onChangeColumn', displayedFields.value)
}

const onChangeLabel = (item, label) => {
  item.label = label
  emit('onChangeColumn', displayedFields.value)
}

const displayedFields = computed<TableField[]>(() => fields.filter(({ isVisible }) => isVisible).map(({ key, label}) => { return { key,  label} }))

// Init
emit('onChangeColumn', displayedFields.value)
</script>

<style lang="scss" scoped>

</style>