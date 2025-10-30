<!-- This is the ./src/App.vue file -->
<script setup>
  import { onMounted } from 'vue'
  import { useThemeStore } from '@/stores/themeStore'
  import { useAuthenticationStore } from '@/stores/authenticationStore'
  import AppNavbar from './components/navbar/AppNavbar.vue'
  import ContentLoader from './components/loaders/ContentLoader.vue'
  import { useRouteLoader } from './composables/useRouteLoader'

  const { isRouteLoading } = useRouteLoader()

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
  <div class="app-container">
    <AppNavbar />

    <main class="main-content">
      <ContentLoader :show="isRouteLoading" fixed />

      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  }

  .main-content {
    flex: 1;
    position: relative;
  }
</style>
