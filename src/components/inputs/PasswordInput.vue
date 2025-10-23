<!-- PasswordInput.vue component -->
<script setup>
  import BaseInput from './BaseInput.vue'

  defineProps({
    placeholderText: { type: String, default: '' },
    modelValue: String,
    name: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
    showError: { type: Boolean, default: false }
  })

  const emit = defineEmits(['update:modelValue', 'validation-error'])
</script>

<template>
  <BaseInput
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :type="'password'"
    :name="name"
    :placeholder="placeholderText"
    :isRequired="isRequired"
    :showError="showError"
    warningMessage="This field is mandatory!"
    @validation-error="emit('validation-error', $event)"
  />
</template>
