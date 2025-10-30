<!-- This is the ./src/components/alerts/InfoAlert.vue component file -->
<script setup>
import BaseAlert from './BaseAlert.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Info!' },
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
    icon="info"
    :confirmText="props.confirmText"
    :colorMap="{
      confirm: 'var(--blueish-color)',
      icon: 'var(--blueish-color)'
    }"
    @update:show="$emit('update:show', $event)"
    @confirm="$emit('confirm')"
    @closed="$emit('closed')"
  />
</template>

<style lang="scss">
  /* Remove 'scoped' so styles apply to SweetAlert2 modal */
  .swal2-icon.swal2-info {
    border-color: var(--blueish-color) !important;
    color: var(--blueish-color) !important;
  }

  .swal2-icon.swal2-info .swal2-info-line-tip,
  .swal2-icon.swal2-info .swal2-info-line-long {
    background-color: var(--blueish-color) !important;
  }

  .swal2-icon.swal2-info .swal2-info-ring {
    border-color: var(--blueish-color) !important;
  }

</style>
