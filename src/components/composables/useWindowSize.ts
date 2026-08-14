import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)

  const iconWidth = computed(() => {
    return windowWidth.value >= 768 ? 36 : 24
  })

  const listItemIconWidth = computed(() => {
    return windowWidth.value >= 768 ? 44 : 36
  })


  const logoutIconWidth = computed(() => {
    return windowWidth.value >= 768 ? 44 : 30
  })
  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return {
    windowWidth,
    windowHeight,
    iconWidth,
    listItemIconWidth,
    logoutIconWidth

  }
}
