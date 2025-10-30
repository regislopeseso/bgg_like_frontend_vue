<!-- This is the ./src/components/buttons/BtnCloseX.vue component file -->
<script setup>
  defineProps({
    dismiss: {
      type: String,
      default: null,
      validator: (value) => ['offcanvas', 'modal', 'alert', 'toast'].includes(value)
    },
  })
</script>

<template>
  <button
    class="btn-close"
    type="button"
    :data-bs-dismiss="dismiss"
  >
  </button>
</template>

<style lang="scss" scoped>
  .btn-close {
  filter: var(--reddish-filter);
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
  }
</style>
