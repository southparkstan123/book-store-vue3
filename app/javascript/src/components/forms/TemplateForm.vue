<template>
  <div class="mx-auto inline w-full">
    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Choose Programming Language:'">
      <InputField v-for="item in checkboxList" :inputId="item" :className="'my-3 inline'" :inputValue="item"
<<<<<<< HEAD
        :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'language'" :inputType="'radio'"
        :checked="item === selectedValue" @changeValue="onChangeValue">
=======
        :inputFieldClass="'px-1 text-pink-300 border-purple-300 focus:ring-0'" :inputName="'language'"
        :inputType="'radio'" :placeholder="''" :checked="item === selectedValue"
        @changeValue="onChangeValue">
>>>>>>> Frontend
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>

    <InputField :inputId="'visible'" :className="'my-3 block'" :inputValue="visible"
      :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'visible'" :inputType="'checkbox'"
      :checked="visible" @changeValue="onChangeVisible">
      <template #label>
        <label for="visible" class="px-1">isVisible?</label>
      </template>
    </InputField>

    <FieldsetWrapper :wrapperClass="'border border-solid border-info p-3'" :textClass="'text-sm text-info'"
      :title="'Choose districts:'">
      <InputField v-for="item in districts" :inputId="item" :className="'my-1'" :inputValue="item"
        :inputFieldClass="'px-1 text-primary border-secondary focus:ring-0'" :inputName="'districts'"
        :inputType="'checkbox'" :checked="selectedItems ? selectedItems.includes(item) : false"
        @changeValue="onChangeSelectedItems">
        <template #label>
          <label :for="item" class="px-1">{{ item }}</label>
        </template>
      </InputField>
    </FieldsetWrapper>
  </div>

  <div>
    <pre>{{ selectedValue }}</pre>
    <pre>{{ visible }}</pre>
    <pre>{{ selectedItems }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from "@/components/inputs/InputField.vue";
import FieldsetWrapper from '../inputs/FieldsetWrapper.vue';

const checkboxList = ['ruby', 'javascript', 'php', 'go'];
const selectedValue = ref<string>('javascript');

const visible = ref<boolean>(true);

const districts = ref<string[]>(['hk', 'kl', 'nt']);
const selectedItems = ref<string[]>([]);

const onChangeValue = (payload) => {
  selectedValue.value = payload;
}

const onChangeVisible = ({ checked, value }) => {
  visible.value = checked;
}

const onChangeSelectedItems = ({ checked, value }) => {
  let result: Array<string> = selectedItems.value;

  if (checked === true) {
    result.push(value);
  } else {
    const index = result.findIndex(item => item === value)
    result.splice(index, 1)
  }

  selectedItems.value = result;
}

</script>

<style scoped></style>