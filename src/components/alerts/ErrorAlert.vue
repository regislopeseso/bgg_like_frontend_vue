<!-- This is the ./src/components/alerts/ErrorAlert.vue component file -->
<script setup>
import BaseAlert from './BaseAlert.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Error!' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'OK' },
})

defineEmits(['update:show', 'confirm', 'closed'])
</script>

<template>
  <BaseAlert
    :show="props.show"
    :title="props.title"
    :message="props.message"
    icon="error"
    :confirmText="props.confirmText"
    :colorMap="{
      confirm: 'var(--reddish-color)',
      icon: 'var(--reddish-color)'
    }"
    @update:show="$emit('update:show', $event)"
    @confirm="$emit('confirm')"
    @closed="$emit('closed')"
  />
</template>

<style lang="scss">
   /* Outer ring of the error icon */
  .swal2-icon.swal2-error {
    border-color: var(--reddish-color) !important;
    color: var(--reddish-color) !important;
  }
  /* Checkmark lines specifically */
  .swal2-icon.swal2-error .swal2-reddish-line-tip,
  .swal2-icon.swal2-error .swal2-reddish-line-long {
    background-color: var(--reddish-color) !important;
  }
  /* Error ring animation fix (optional but safe) */
  .swal2-icon.swal2-error .swal2-error-ring {
    border: 4px solid var(--reddish-color) !important; /* you can also use `var(--blueish-color)` with alpha if needed */
  }
  .swal2-x-mark-line-left,
  .swal2-x-mark-line-right {
    background-color: var(--reddish-color) !important;
  }
</style>
