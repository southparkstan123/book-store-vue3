import { ref } from 'vue'

export const useForm = () => {
  const errors = ref([])

  return {
    errors
  }
}