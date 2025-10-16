<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthenticationStore } from '@/stores/authenticationStore'
import AppNavbar from './components/navbar/AppNavbar.vue'


const themeStore = useThemeStore()
const authenticationStore = useAuthenticationStore()

onMounted(() => {
  // Initialize theme from localStorage
  themeStore.initTheme()

  // Check authentication status
  authenticationStore.checkAuthentication()
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
