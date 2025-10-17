<script setup>
  import { useThemeStore } from '@/stores/themeStore'
  import BtnCloseX from '../buttons/BtnCloseX.vue'
  import BtnBlueish from '../buttons/BtnBlueish.vue'
 


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

          <BtnCloseX
            :dismiss="'offcanvas'"
            aria-label="Closing theme panel"/>
        </div>


        <div class="offcanvas-body d-flex flex-column align-items-center">
          <BtnBlueish
            id="theme-toggler"
            class="btn-theme"
            aria-label="Toggle Theme"
            :dismiss="'offcanvas'"
            :buttonText="themeStore.buttonText"
             @click="handleThemeToggle"
          />
        </div>
    </div>
</template>

<style lang="scss" scoped>
  span{
    color: var(--blueish-color)
  }

  .offcanvas-custom {
    background-color: var(--second-bg-color) !important;
    color: var(--text-color) !important;
  }

  .btn-theme {
    height: 3rem;
    width: 10rem;
    color: var(--text-color) !important;
    border: none !important;
    border-radius: 2rem !important;
    box-shadow: 0px 0px 10px 10px var(--bg-color) !important;

      &:hover {
        color: var(--blueish-color) !important;
        background-color: var(--bg-color) !important;
        box-shadow: 0px 0px 10px 5px var(--text-color) !important;
      }
  }

</style>
