import { reactive, ref } from 'vue'
import { useForm } from '@/hooks/useForm'

export type BookForm = {
  name: string,
  abstract: string,
  price: number | null,
  publisher_id: number | null,
  author_ids: Array<number>
}

export type BookFormState = {
  form: BookForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export const useBookForm = () => {
  const { errors } = useForm();
  const bookForm = reactive<BookFormState>({
    form: {
      name: '',
      abstract: '',
      price: null,
      publisher_id: null,
      author_ids: []
    },
    isLoading: false,
    mode: 'add',
    isFormChanged: false
  })

  return {
    errors,
    bookForm
  }
}