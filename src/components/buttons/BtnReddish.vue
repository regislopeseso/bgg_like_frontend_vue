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
    class="btn btn-outline-danger"
    :data-bs-dismiss="dismiss"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<style lang="scss" scoped>
  .btn-outline-danger {
  --bs-btn-color: var(--reddish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--reddish-color);
  --bs-btn-hover-color: var(--bg-color)
  }
</style>

