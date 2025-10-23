<!-- EmailInput.vue component -->
<script setup>
  import BaseInput from './BaseInput.vue'

   const props = defineProps({
    placeholderText: { type: String, default: '' },
    modelValue: String,
    name: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
    showWarning: { type: Boolean, default: false }
  })

  const emit = defineEmits(['update:modelValue', 'validation-error'])

  const normalizeEmail = () => {
    if (props.modelValue) {
      emit('update:modelValue', props.modelValue.trim().toLowerCase())
    }
  }
</script>

<template>
  <BaseInput
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :type="'email'"
    :name="name"
    :placeholder="placeholderText"
    :isRequired="isRequired"
    :showWarning="showWarning"
    warningMessage="This field is mandatory!"
    @validation-error="emit('validation-error', $event)"
    @blur="normalizeEmail"
  />
</template>
