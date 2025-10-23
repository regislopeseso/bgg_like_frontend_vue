<!-- BaseForm.vue component -->
<script setup>
  const emit = defineEmits(['submit'])
</script>

<template>
  <form @submit.prevent="emit('submit', $event)">
    <slot></slot>
  </form>
</template>

<style lang="scss">
  form {
    width: 100%;
    padding: 2rem;
    background-color: var(--second-bg-color);
    border: 1px solid var(--bg-color);
    border-radius: 2rem;
    box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.2);
  }
</style>
