<script setup>
  defineProps({
    dismiss: {
      type: String,
      default: null,
      validator: (value) => ['offcanvas', 'modal', 'alert', 'toast'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      required: true
    },
  })

  const emit = defineEmits(['click'])

  const handleClick = () => {
    emit('click')
  }
</script>

<template>
  <button
    class="btn btn-outline-warning"
    :data-bs-dismiss="dismiss"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<style lang="scss" scoped>
  .btn-outline-warning {
  --bs-btn-color: var(--yellowish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--yellowish-color);
  --bs-btn-hover-color: var(--bg-color)
  }
</style>

