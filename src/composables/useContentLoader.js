// This is the useContentLoader.js composable file
import { ref } from 'vue'

export const useContentLoader = (initialState = false) => {
  const isLoading = ref(initialState)

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const withLoading = async (asyncFn) => {
    startLoading()
    try {
      return await asyncFn()
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  }
}
