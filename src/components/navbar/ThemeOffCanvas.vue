<script setup>
  import { useThemeStore } from '@/stores/themeStore'

  const themeStore = useThemeStore()

  const handleThemeToggle = () => {
    themeStore.toggleTheme()
  }
</script>

<template>
    <div class="offcanvas-custom offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight">
        <div class="offcanvas-header pb-5">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            <span>T</span>heme <span>C</span>onfiguration
          </h5>

          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body d-flex flex-column align-items-center">
          <button
            id="theme-toggler"
            class="btn-theme btn btn-outline-info d-flex flex-row align-items-center justify-content-center"
            type="button"
            data-bs-dismiss="offcanvas"
            @click="handleThemeToggle"
          >
            {{ themeStore.buttonText }}
          </button>
        </div>
    </div>
</template>

<style></style>
