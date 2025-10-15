<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import AppNavbar from './components/AppNavbar.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  // Initialize theme from localStorage
  themeStore.initTheme()

  // Check authentication status
  authStore.checkAuth()
})
</script>

<template>
  <div>
    <AppNavbar />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </div>

  <RouterView />
</template>

<style scoped lang="scss"></style>
