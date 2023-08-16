import { ref } from 'vue'

export const useNavBar = () => {
  const strokeWidth = ref<string>('')

  const strokeColor = ref<string>('')

  const backgroundColor = ref<string>('white')

  const percentageOfWidthOfMoblieMenu = ref<number>(100)

  return {
    strokeWidth,
    strokeColor,
    backgroundColor,
    footer,
    percentageOfWidthOfMoblieMenu
  }
}
