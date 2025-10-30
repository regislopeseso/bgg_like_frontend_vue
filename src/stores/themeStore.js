// This is the ./src/stores/themeStore.js store file
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
      // Light Theme Colors
      document.documentElement.style.setProperty('--bg-color', 'rgb(200, 200, 210)')
      document.documentElement.style.setProperty('--second-bg-color', 'rgb(190, 190, 200)')
      document.documentElement.style.setProperty('--text-color', 'rgb(25, 25, 30)')
      document.documentElement.style.setProperty('--reddish-color', 'rgb(200, 50, 30)')
      document.documentElement.style.setProperty('--blueish-color', 'rgb(0, 90, 100)')
      document.documentElement.style.setProperty('--yellowish-color', 'rgb(200, 180, 0)')
      document.documentElement.style.setProperty('--greenish-color', 'rgb(0, 170, 110)')

      // Light Theme Filters
      document.documentElement.style.setProperty('--bg-filter', 'brightness(0) saturate(100%) invert(90%) sepia(6%) saturate(800%) hue-rotate(180deg) brightness(105%) contrast(95%)')
      document.documentElement.style.setProperty('--second-bg-filter', 'brightness(0) saturate(100%) invert(80%) sepia(5%) saturate(900%) hue-rotate(180deg) brightness(100%) contrast(90%)')
      document.documentElement.style.setProperty('--text-filter', 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)')
      document.documentElement.style.setProperty('--blueish-filter', 'brightness(0) saturate(100%) invert(30%) sepia(95%) saturate(1500%) hue-rotate(160deg) brightness(95%) contrast(100%)')
      document.documentElement.style.setProperty('--reddish-filter', 'brightness(0) saturate(100%) invert(60%) sepia(40%) saturate(2500%) hue-rotate(2deg) brightness(90%) contrast(95%)')
      document.documentElement.style.setProperty('--yellowish-filter', 'brightness(0) saturate(100%) invert(45%) sepia(40%) saturate(2300%) hue-rotate(10deg) brightness(95%) contrast(90%)')
      document.documentElement.style.setProperty('--greenish-filter', 'brightness(0) saturate(100%) invert(40%) sepia(60%) saturate(2200%) hue-rotate(100deg) brightness(100%) contrast(95%)')
    } else {
      // Dark Theme Colors
      document.documentElement.style.setProperty('--bg-color', 'rgb(31, 36, 46)')
      document.documentElement.style.setProperty('--second-bg-color', 'rgb(50, 57, 70)')
      document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)')
      document.documentElement.style.setProperty('--blueish-color', 'rgb(0, 238, 255)')
      document.documentElement.style.setProperty('--reddish-color', 'rgb(255, 51, 0)')
      document.documentElement.style.setProperty('--yellowish-color', 'rgb(255, 230, 0)')
      document.documentElement.style.setProperty('--greenish-color', 'rgb(0, 255, 128)')

      // Dark Theme Filters
      document.documentElement.style.setProperty('--bg-filter', 'brightness(0) saturate(100%) invert(14%) sepia(7%) saturate(1200%) hue-rotate(185deg) brightness(95%) contrast(90%)')
      document.documentElement.style.setProperty('--second-bg-filter', 'brightness(0) saturate(100%) invert(25%) sepia(6%) saturate(1100%) hue-rotate(185deg) brightness(90%) contrast(88%)')
      document.documentElement.style.setProperty('--text-filter', 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(104%) contrast(101%)')
      document.documentElement.style.setProperty('--blueish-filter', 'brightness(0) saturate(100%) invert(83%) sepia(91%) saturate(4125%) hue-rotate(153deg) brightness(104%) contrast(101%)')
      document.documentElement.style.setProperty('--reddish-filter', 'brightness(0) saturate(100%) invert(28%) sepia(88%) saturate(6570%) hue-rotate(2deg) brightness(108%) contrast(106%)')
      document.documentElement.style.setProperty('--yellowish-filter', 'brightness(0) saturate(100%) invert(83%) sepia(57%) saturate(3311%) hue-rotate(1deg) brightness(104%) contrast(102%)')
      document.documentElement.style.setProperty('--greenish-filter', 'brightness(0) saturate(100%) invert(84%) sepia(24%) saturate(3525%) hue-rotate(100deg) brightness(101%) contrast(102%)')
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
