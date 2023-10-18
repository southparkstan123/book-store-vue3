<template>
  <div class="right-0 bottom-0 z-10 m-1">
    <div class="odd:bg-table-body-1 even:bg-table-body-2" v-for="item in fields">
      <div class="grid sm:grid-cols-5 grid-cols-1 justify-center">
        <div class="sm:col-span-5 md:col-span-3">
          <LabelWrapper
            :forAttribute="''"
            :textClass="'text-primary block'"
            :labelText="`Label for ${item.key}: `"
          >
            <InputField :className="'my-1 inline'" :inputType="'text'" :placeholder="`Label of ${item.key}`"
            :inputValue="item.label" :isDisabled="item.isVisible === false" :inputFieldClass="'text-sm disabled:opacity-25'"
            @changeValue="(payload) => onChangeLabel(item, payload)"></InputField>
          </LabelWrapper>
        </div>
        <div class="sm:col-span-5 md:col-span-2 m-2">
          <ToggleSwitch 
            class="float-left"
            :forAttribute="item.key"
            :label="item.isVisible ? 'show' : 'hide'"
            :inputValue="item.isVisible"
            @changeValue="({ checked }) => onChangeVisible(item, checked)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { TableItem, TableField } from "@/types/types";
import InputField from "@/components/inputs/InputField.vue";
import LabelWrapper from '@/components/inputs/LabelWrapper.vue';
import ToggleSwitch from "@/components/inputs/ToggleSwitch.vue";

import { useListingPageSettingStore } from "@/store/listingPageSetting";
const { getFields, changeColumn } = useListingPageSettingStore();

type Fields = TableField & { isVisible: boolean }

const props = withDefaults(defineProps<{
  data: TableItem[] | undefined;
}>(), {
  data: undefined
});

const test = computed<Fields[]>(() => {
  return (getFields) ? getFields.map((field) => {
    return {
      ...field,
      isVisible: true
    }
  }) : []
});

const fields = reactive<Fields[]>(
  (props.data && props.data.length > 0) ? Object.entries(props.data[0]).map(([_key]) => {
    const _test = test.value.find(item => item.key === _key);
    return {
      key: _key,
      label: _test ? _test.label : _key,
      isVisible: getFields ? _test ? _test.isVisible : false : true
    }
  }) : []);

const onChangeVisible = (item, checked) => {
  item.isVisible = checked;
  changeColumn(displayedFields.value)
}

const onChangeLabel = (item, label) => {
  item.label = label
  changeColumn(displayedFields.value)
}

const displayedFields = computed<TableField[]>(() => fields.filter(({ isVisible }) => isVisible).map(({ key, label }) => { return { key, label } }))

</script>

<style lang="scss" scoped></style>