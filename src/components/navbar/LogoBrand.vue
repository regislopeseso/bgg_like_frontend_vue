<!-- This is the ./src/components/navbar/LogoBrand.vue component file -->
<script setup>
  import { ref } from 'vue'

  const isSwapped = ref(false)

  const toggleColors = () => {
    isSwapped.value = !isSwapped.value
  }
</script>

<template>
  <RouterLink class="navbar-brand logo" to="/" @click="toggleColors">
    <span class="logo-bbg" :class="{ 'swapped': isSwapped }">BBG</span>
    <span class="logo-like" :class="{ 'swapped': isSwapped }">LIKE2.0</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .navbar-brand {
      color: var(--blueish-color);
    }
  .logo {
    font-size: 2rem;
    font-weight: bolder;
  }

  /* BBG default: text-color, swapped: main-color */
  .logo-bbg {
    color: var(--text-color);
    transition: color 0.3s ease;
  }

  .logo-bbg.swapped {
    color: var(--blueish-color);
  }

  /* LIKE default: main-color, swapped: text-color */
  .logo-like {
    color: var(--blueish-color);
    transition: color 0.3s ease;
  }

  .logo-like.swapped {
    color: var(--text-color);
  }

  /* Hover effects - opposite of current state */
  .logo:hover .logo-bbg {
    color: var(--blueish-color);
  }

  .logo:hover .logo-bbg.swapped {
    color: var(--text-color);
  }

  .logo:hover .logo-like {
    color: var(--text-color);
  }

  .logo:hover .logo-like.swapped {
    color: var(--blueish-color);
  }
</style>
