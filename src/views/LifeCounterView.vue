<script setup>
import ContentLoader from '@/components/loaders/ContentLoader.vue'
import { useContentLoader } from '@/composables/useContentLoader'
import { onMounted } from 'vue'

const { isLoading, withLoading } = useContentLoader()

// Simulate page load
const loadPageData = async () => {
  await withLoading(async () => {
    await new Promise(resolve => setTimeout(resolve, 1200)) // simulate async work
  })
}

onMounted(() => loadPageData())
</script>

<template>
  <!-- Wrapper for the content area below navbar -->
  <div class="page-wrapper">
    <!-- Loader overlays all page content below navbar -->
    <ContentLoader :show="isLoading" />

    <!-- Page content -->
    <div class="page-content">
      <h1>Life Counter View</h1>
      <p>This content will be blurred while the loader is active.</p>
      <p>Add more content to see the loader cover everything below the navbar.</p>
    </div>
  </div>
</template>

<style scoped>
  /* The wrapper covers all remaining viewport below navbar */
  .page-wrapper {
    position: relative; /* needed for ContentLoader absolute positioning */
    padding: 2rem;
  }
</style>
