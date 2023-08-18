import { reactive, ref } from 'vue'
import { useForm } from '@/hooks/useForm'

export type AuthorForm = {
  name: string,
  description: string
}

export type AuthorFormState = {
  form: AuthorForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export const useAuthorForm = () => {
  const { errors } = useForm();
  const authorForm = reactive<AuthorFormState>({
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
    authorForm
  }
}