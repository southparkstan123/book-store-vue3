<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Pagination'">
      <LabelWrapper
        :forAttribute="'per-page'"
        :textClass="''"
        :labelText="'Page size:'"
      >
        <DropdownMenu
          :data="[[10, 10],[20, 20],[50, 50]]"
          :placeholder="'Please select the page size'"
          :selectedItem="themeStore.getPerPage"
          @selectedItem="(payload: number) => themeStore.changeValuePerPage(payload)"
        >
        </DropdownMenu>
      </LabelWrapper>
    </FieldsetWrapper>
    <FieldsetWrapper 
      :wrapperClass="'border border-solid border-info p-3'" 
      :textClass="'text-sm text-info'"
      :title="`Labels`"
    >
      <div v-for="item in fields" class="grid sm:grid-cols-7 justify-center items-center">
        <div class="sm:col-span-5">
          <InputField :className="'my-1 inline'" :inputType="'text'" :placeholder="`${item.key}`"
          :inputValue="item.label" :isDisabled="item.isVisible === false" :inputFieldClass="'m-1 text-lg disabled:opacity-25'"
          @changeValue="(payload) => onChangeLabel(item, payload)"></InputField>
        </div>
        <div class="sm:col-span-2 m-2">
          <ToggleSwitch 
            class="float-left"
            :forAttribute="item.key"
            :label="item.isVisible ? 'show' : 'hide'"
            :inputValue="item.isVisible"
            @changeValue="({ checked }) => onChangeVisible(item, checked)"
          />
        </div>
      </div>
    </FieldsetWrapper>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { TableItem, TableField } from "@/types/types";
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '@/components/inputs/FieldsetWrapper.vue';
import LabelWrapper from '@/components/inputs/LabelWrapper.vue';
import ToggleSwitch from "@/components/inputs/ToggleSwitch.vue";
import DropdownMenu from '../dropdowns/DropdownMenu.vue';

// Theme
import { useThemeStore } from "@/store/theme"
const themeStore = useThemeStore();

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