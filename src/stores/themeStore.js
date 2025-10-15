import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const currentTheme = ref(localStorage.getItem('Theme') || 'Dark')

  // Getters
  const isDark = computed(() => currentTheme.value === 'Dark')
  const isLight = computed(() => currentTheme.value === 'Light')
  const buttonText = computed(() => (currentTheme.value === 'Dark' ? 'Light Theme' : 'Dark Theme'))

  // Actions
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'Light' ? 'Dark' : 'Light'
    localStorage.setItem('Theme', currentTheme.value)
    applyTheme()
  }

  function applyTheme() {
    if (currentTheme.value === 'Light') {
      document.documentElement.style.setProperty('--bg-color', 'rgb(200, 200, 210)')
      document.documentElement.style.setProperty('--second-bg-color', 'rgb(190, 190, 200)')
      document.documentElement.style.setProperty('--text-color', 'rgb(25, 25, 30)')
      document.documentElement.style.setProperty('--main-color', 'rgb(0, 90, 100)')
      document.documentElement.style.setProperty('--reddish', 'rgb(200, 50, 30)')
      document.documentElement.style.setProperty('--yellowish', 'rgb(200, 180, 0)')
      document.documentElement.style.setProperty('--greenish', 'rgb(0, 170, 110)')
    } else {
      document.documentElement.style.setProperty('--bg-color', 'rgb(31, 36, 46)')
      document.documentElement.style.setProperty('--second-bg-color', 'rgb(50, 57, 70)')
      document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)')
      document.documentElement.style.setProperty('--main-color', 'rgb(0, 238, 255)')
      document.documentElement.style.setProperty('--reddish', 'rgb(255, 51, 0)')
      document.documentElement.style.setProperty('--yellowish', 'rgb(255, 230, 0)')
      document.documentElement.style.setProperty('--greenish', 'rgb(0, 255, 128)')
    }
  }

  function initTheme() {
    applyTheme()
  }

  return {
    // State
    currentTheme,
    // Getters
    isDark,
    isLight,
    buttonText,
    // Actions
    toggleTheme,
    applyTheme,
    initTheme,
  }
})
