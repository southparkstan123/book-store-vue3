import { computed } from "vue";
import type { DataProps } from "@/types/types";

export const useList = (props: DataProps) => {
  const displayedfields = computed(() => {
    const result =
      props.fields !== undefined
        ? Object.entries(props.fields).map(([_key, value]) => value.key)
        : Object.entries(props.data ? props.data[0] : {}).map(([_key]) => _key);

    return result;
  });

  const displayedRecords = computed(() => {
    const result = props.data
      ? props.data.filter((item) =>
          displayedfields.value.map((field) => item.hasOwnProperty(field)),
        )
      : {};

    return result;
  });

  return {
    displayedfields,
    displayedRecords,
  };
};
