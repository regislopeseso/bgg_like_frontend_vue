<!-- This is the ./src/components/buttons/BtnOutline.vue component file -->
<script setup>
  defineProps({
    variant: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'danger', 'warning', 'success'].includes(value)
    },
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
    class="btn"
    :class="`btn-outline-${variant}`"
    :data-bs-dismiss="dismiss"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<style lang="scss" scoped>
  .btn-outline-info {
  --bs-btn-color: var(--blueish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--blueish-color);
  --bs-btn-hover-color: var(--second-bg-color)
  }

  .btn-outline-danger {
  --bs-btn-color: var(--reddish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--reddish-color);
  --bs-btn-hover-color: var(--second-bg-color)
  }

  .btn-outline-warning {
  --bs-btn-color: var(--yellowish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--yellowish-color);
  --bs-btn-hover-color: var(--second-bg-color)
  }

  .btn-outline-success {
  --bs-btn-color: var(--greenish-color);
  --bs-btn-disabled-color: var(--bg-color);
  --bs-btn-disabled-border-color: var(--bg-color);
  --bs-btn-hover-bg: var(--greenish-color);
  --bs-btn-hover-color: var(--second-bg-color)
  }
</style>
