import { ref } from 'vue'

export const useForm = () => {
  const errors = ref([])
  const onHandleError = (error: any) => {
    const { status }  = error.response;
    const { message, errors } = error.response.data;

    if(errors){
      errors.value = errors;
    }
  }

  return {
    errors,
    onHandleError
  }
}