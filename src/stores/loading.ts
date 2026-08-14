import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const message = ref('Cargando...')

  const show = (loadingMessage = 'Cargando...') => {
    message.value = loadingMessage
    isLoading.value = true
  }

  const hide = () => {
    isLoading.value = false
  }

  return {
    isLoading,
    message,
    show,
    hide
  }
})
