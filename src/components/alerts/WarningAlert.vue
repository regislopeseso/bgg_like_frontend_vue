<script setup>
import BaseAlert from './BaseAlert.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Warning!' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'OK' },
})

defineEmits(['update:show', 'confirm'])
</script>

<template>
  <BaseAlert
    :show="props.show"
    :title="props.title"
    :message="props.message"
    icon="warning"
    :confirmText="props.confirmText"
    :colorMap="{
      confirm: 'var(--yellowish-color)',
      icon: 'var(--yellowish-color)'
    }"
    @update:show="$emit('update:show', $event)"
    @confirm="$emit('confirm')"
  />
</template>

<style lang="scss">
  /* Outer ring of the success icon */
  .swal2-icon.swal2-warning {
    font-size: 1rem !important;
    border: 1px solid rgba(0, 0, 0, 0);
    border-color: transparent !important;
    color: var(--yellowish-color) !important ;
  }
</style>
