<!-- This is the ./src/components/alerts/SuccessAlert.vue component file -->
<script setup>
import BaseAlert from './BaseAlert.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Success!' },
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
    icon="success"
    :confirmText="props.confirmText"
    :colorMap="{
      confirm: 'var(--greenish-color)',
      icon: 'var(--greenish-color)'
    }"
    @update:show="$emit('update:show', $event)"
    @confirm="$emit('confirm')"
    @closed="$emit('closed')"
  />
</template>

<style lang="scss">
  /* Remove 'scoped' so styles apply to SweetAlert2 modal */
  .swal2-icon.swal2-success {
    border-color: var(--greenish-color) !important;
    color: var(--greenish-color) !important;
  }

  .swal2-icon.swal2-success .swal2-success-line-tip,
  .swal2-icon.swal2-success .swal2-success-line-long {
    background-color: var(--greenish-color) !important;
  }

  .swal2-icon.swal2-success .swal2-success-ring {
    border-color: var(--greenish-color) !important;
  }
</style>
