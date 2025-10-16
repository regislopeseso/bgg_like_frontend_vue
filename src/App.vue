<script setup>
  import { onMounted } from 'vue'
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
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
