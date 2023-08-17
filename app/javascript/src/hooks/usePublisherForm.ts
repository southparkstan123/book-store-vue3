import { reactive, ref } from 'vue'
import { useForm } from './useForm'

export type PublisherForm = {
  name: string,
  description: string
}

export type PublisherFormState = {
  form: PublisherForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export const usePublisherForm = () => {
  const { errors, onHandleError } = useForm();
  const publisherForm = reactive<PublisherFormState>({
    form: {
      name: '',
      description: ''
    },
    isLoading: false,
    mode: 'add',
    isFormChanged: false
  })

  return {
    errors,
    onHandleError,
    publisherForm
  }
}