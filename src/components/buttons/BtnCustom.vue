<!-- This is the ./src/components/buttons/BtnCustom.vue component file -->
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
    class="btn"
    :data-bs-dismiss="dismiss"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<style lang="scss" scoped>
  .btn:hover {
    color: var(--text-color);
    box-shadow: 0 0 15px 1px var(--text-color);
  }
</style>
