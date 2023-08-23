import { computed } from "vue";

export const useList = (props) => {
  const displayedfields = computed(() => {
    const result =
      props.fields !== undefined
        ? Object.entries(props.fields).map(([_key, value]) => value.key)
        : Object.entries(props.data[0]).map(([_key]) => _key);

    return result;
  });

  const displayedRecords = computed(() => {
    const result = props.data.filter((item) =>
      displayedfields.value.map((field) => item.hasOwnProperty(field)),
    );

    return result;
  });

  return {
    displayedfields,
    displayedRecords,
  };
};
